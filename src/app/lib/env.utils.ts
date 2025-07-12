import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const loadEnv = (env?: string) => {
  const resolvedEnv = env || process.env.NODE_ENV || "development";
  const envPath = path.resolve(process.cwd(), `.env.${resolvedEnv}`);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    console.log(`✅ Loaded environment from ${envPath}`);
  } else {
    dotenv.config();
    console.log(`📄 Loaded default .env`);
  }
}

loadEnv();

export { loadEnv };
