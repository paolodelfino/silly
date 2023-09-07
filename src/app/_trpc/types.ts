import { appRouter } from "@/server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

type RouterInput = inferRouterInputs<typeof appRouter>;
type RouterOutput = inferRouterOutputs<typeof appRouter>;

export type MovieDetailsOutput = RouterOutput["tmdb"]["details"]["movie"];
export type TvShowDetailsOutput = RouterOutput["tmdb"]["details"]["tvShow"];
export type SeasonDetailsOutput = RouterOutput["tmdb"]["details"]["season"];
