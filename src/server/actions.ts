"use server";
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
