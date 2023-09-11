import { config } from "dotenv";
import { expand } from "dotenv-expand";
import type { Config } from "drizzle-kit";

expand(config());

export default {
  schema: "./src/db/schema.ts",
  driver: "pg",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  },
} satisfies Config;
