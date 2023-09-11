import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    TMDB_API_KEY: z.string().length(32),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    POSTGRES_URL: z.string(),
    POSTGRES_PRISMA_URL: z.string(),
    POSTGRES_URL_NON_POOLING: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
  },
  client: {},
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {},
});
