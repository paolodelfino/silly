"use server";
import { trpcServer } from "@/app/_trpc/serverClient";
import { UserMylistGetOutput } from "@/server";

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

export async function fetchMylist(mylist: UserMylistGetOutput, page: number) {
  const elPerPage = 20;
  const toFetch = mylist.slice((page - 1) * elPerPage, page * elPerPage);

  const results = await Promise.all(
    toFetch.map(async ({ id, type }) => await getMovieDetails(type, id))
  );

  const data = {
    page,
    results,
    total_pages:
      Math.floor(mylist.length / elPerPage) + (mylist.length % elPerPage),
    total_results: mylist.length,
  };
  return data;
}
