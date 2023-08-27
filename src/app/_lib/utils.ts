import { env } from "@/env.mjs";

export const domain = () =>
  env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://sillymovie.vercel.app";
