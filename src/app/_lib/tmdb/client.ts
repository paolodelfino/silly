import { env } from "@/env.mjs";
import { TMDBWebAPI } from "./index";

export const tmdb = new TMDBWebAPI(env.TMDB_API_KEY);
