import { appRouter } from "@/server";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

type RouterInput = inferRouterInputs<typeof appRouter>;
type RouterOutput = inferRouterOutputs<typeof appRouter>;

export type UserContinueWatchingCheckpointGetInput =
  RouterInput["user"]["continueWatching"]["checkpoint"]["get"];

export type TmdbDetailsMovieOutput = RouterOutput["tmdb"]["details"]["movie"];
export type TmdbDetailsTvShowOutput = RouterOutput["tmdb"]["details"]["tvShow"];
export type TmdbDetailsSeasonOutput = RouterOutput["tmdb"]["details"]["season"];
export type PlaylistOutput = RouterOutput["playlist"];
