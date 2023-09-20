"use server";
import { currentUser } from "@/app/_lib/auth";
import { trpcServer } from "@/app/_trpc/serverClient";
import { UserContinueWatchingCheckpointGetInput } from "@/app/_trpc/types";

export async function getMovieDetails(type: "movie" | "tv", id: number) {
  return type == "movie"
    ? await trpcServer.tmdb.details.movie({ id })
    : await trpcServer.tmdb.details.tvShow({ id });
}

export async function getMoviePlaylist(
  title: string,
  seasonNumber?: number,
  episodeNumber?: number,
) {
  return await trpcServer.playlist({
    title,
    seasonNumber,
    episodeNumber,
  });
}

export async function getSeason(id: number, season: number) {
  return await trpcServer.tmdb.details.season({ id, season });
}

export async function fetchMylist(userId: string, page: number) {
  const user = await currentUser(userId);

  const elPerPage = 20;
  const toFetch = user.mylist.slice((page - 1) * elPerPage, page * elPerPage);

  const results = await Promise.all(
    toFetch.map(async ({ id, type }) => await getMovieDetails(type, id)),
  );

  return {
    page,
    results,
    total_pages: Math.ceil(user.mylist.length / elPerPage),
    total_results: user.mylist.length,
  };
}

export async function mylistSearch({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const data = await trpcServer.user.mylist.search({ page, query });
  const results = await Promise.all(
    data.results.map(async ({ id, type }) => await getMovieDetails(type, id)),
  );

  return {
    page: data.page,
    results,
    total_pages: data.total_pages,
    total_results: data.total_results,
  };
}

export async function existsInMylist(input: {
  id: number;
  type: "movie" | "tv";
}) {
  return await trpcServer.user.mylist.exists(input);
}

export async function getMylistCount() {
  return (await trpcServer.user.mylist.get()).length;
}

export async function searchMovies({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  return await trpcServer.search.movies({ query, page });
}

export async function getCheckpoint(
  params: UserContinueWatchingCheckpointGetInput,
) {
  return await trpcServer.user.continueWatching.checkpoint.get(params);
}
