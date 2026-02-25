import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@generated/prisma/client";
import { TransactionIsolationLevel } from "@generated/prisma/internal/prismaNamespace";
import { ENV } from "./env";

const connectionString = ENV.DB.URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({
  adapter,
  log: ["query", "error",'warn', 'info'],
  transactionOptions: {
    isolationLevel: TransactionIsolationLevel.Serializable,
  },
});

export default prisma;
