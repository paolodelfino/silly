import { env } from "@/env.mjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const domain = () =>
  env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://sillymovie.vercel.app";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
