import { watch } from "fs";
import { execSync } from "child_process";

let timeout: Timer | null = null;
let isRunning = false;
let lastRun = 0;
const DEBOUNCE = 500;

const run = (filename?: string | null) => {
  const now = Date.now();
  if (isRunning || now - lastRun < DEBOUNCE) return;

  isRunning = true;
  lastRun = now;

  if (filename) process.stdout.write(`\x1b[34m[gen-route]\x1b[0m ${filename} changed, regenerating...`);

  try {
    execSync("tsx --experimental-specifier-resolution=node scripts/generate-router.ts", {
      stdio: "inherit",
    });
    if (filename) console.log(` \x1b[32m✓ done\x1b[0m`);
  } catch (e) {
    console.log(` \x1b[31m✗ failed\x1b[0m`);
  } finally {
    isRunning = false;
  }
};

console.log("\x1b[34m[gen-route]\x1b[0m watching src/http/controller...");
run();

watch("src/http/controller", { recursive: true }, (event, filename) => {
  if (!filename?.endsWith(".ts")) return;
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => run(filename), DEBOUNCE);
});