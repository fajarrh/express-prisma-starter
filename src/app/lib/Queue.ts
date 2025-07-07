import { redis } from "@config/redis";

interface Job {
  id: string;
  task: string;
  data: any;
  retries?: number;
  priority?: number;
}

interface ProcessOptions {
  retryCount?: number;
  delay?: number;
}

export default class Queue {
  private queueName: string;
  private db: number;
  private retryCount: number;
  private delay: number;
  private isRunning: boolean;
  private channel: string;

  constructor(queueName: string, db: number = 0) {
    this.queueName = queueName;
    this.channel = `channel:${queueName}`;
    this.db = db;
    this.retryCount = 3;
    this.delay = 0;
    this.isRunning = false;
  }

  async add(job: Job, priority: number = 0): Promise<void> {
    try {
      const jobData = { ...job, retries: job.retries ?? 0, priority };
      const serialized = JSON.stringify(jobData);
      await redis.select(this.db);
      await redis.zadd(this.queueName, priority, serialized);
      await redis.publish(this.channel, "new_job");
      console.log(`🟢 Added job: ${job.id}`);
    } catch (err) {
      console.error("❌ Failed to add job:", err);
    }
  }

  async process(
    processCallback: (job: Job) => Promise<void>,
    options: ProcessOptions = {}
  ) {
    if (this.isRunning) {
      console.warn("⚠️ Processor already running.");
      return;
    }

    this.retryCount = options.retryCount ?? 3;
    this.delay = options.delay ?? 0;
    this.isRunning = true;

    const subscriber = redis.duplicate({ lazyConnect: true });
    await subscriber.connect();
    await subscriber.subscribe(this.channel);

    subscriber.on("message", async (channel, message) => {
      if (!this.isRunning || channel !== this.channel || message !== "new_job")
        return;

      while (this.isRunning) {
        const job = await this.popJob();
        if (!job) break;

        const lockKey = `lock:${this.queueName}:${job.id}`;
        const locked = await redis.set(lockKey, "1", "PX", 30000, "NX");

        if (!locked) {
          console.log(`⏳ Job ${job.id} is already being processed.`);
          continue;
        }

        try {
          await processCallback(job);
          console.log(`✅ Job completed: ${job.id}`);
        } catch (err) {
          job.retries = (job.retries || 0) + 1;
          if (job.retries <= this.retryCount) {
            console.warn(`🔁 Retrying job ${job.id}, attempt ${job.retries}`);
            await this.add(job, job.priority ?? 0);
          } else {
            console.error(`❌ Job ${job.id} failed permanently`);
          }
        } finally {
          if (this.delay > 0) {
            await new Promise((res) => setTimeout(res, this.delay));
          }
          await redis.del(lockKey);
        }
      }
    });

    console.log(`📣 Queue processor is listening on channel: ${this.channel}`);
  }

  async popJob(): Promise<Job | null> {
    try {
      await redis.select(this.db);
      const job = await redis.zrange(this.queueName, 0, 0);
      if (job.length === 0) return null;

      const removed = await redis.zrem(this.queueName, job[0]);
      if (removed) {
        return JSON.parse(job[0]) as Job;
      }

      return null;
    } catch (err) {
      console.error("❌ Failed to pop job:", err);
      return null;
    }
  }

  public async stop(): Promise<void> {
    this.isRunning = false;
    await redis.quit();
    console.log("🛑 Queue stopped.");
  }
}
