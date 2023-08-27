import { env } from "@/env.mjs";
import { TMDBWebAPI } from "tmdb-js-web";

export const tmdb = new TMDBWebAPI(env.TMDB_API_KEY);
