"use server";
import { currentUser } from "@/app/_lib/auth";
import { trpcServer } from "@/app/_trpc/serverClient";

export async function getMovieDetails(type: "movie" | "tv", id: number) {
  return type == "movie"
    ? await trpcServer.tmdb.details.movie({ id })
    : await trpcServer.tmdb.details.tvShow({ id });
}

export async function getMoviePlaylist(
  title: string,
  seasonNumber?: number,
  episodeNumber?: number
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

  const elPerPage = 3;
  const toFetch = user.mylist.slice((page - 1) * elPerPage, page * elPerPage);

  const results = await Promise.all(
    toFetch.map(async ({ id, type }) => await getMovieDetails(type, id))
  );

  const data = {
    page,
    results,
    total_pages: Math.ceil(user.mylist.length / elPerPage),
    total_results: user.mylist.length,
  };
  return data;
}
