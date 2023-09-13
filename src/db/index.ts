import { users } from "@/db/schema";
import { sql } from "@vercel/postgres";
import { InferSelectModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const db = drizzle(sql);

export type SelectUser = InferSelectModel<typeof users>;
