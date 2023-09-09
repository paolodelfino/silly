import { tmdb } from "@/app/_lib/tmdb/client";
import { get_playlist, search_movie } from "sc-wrapper";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  tmdb: router({
    trending: publicProcedure.query(
      async () => await tmdb.v3.trending.getTrending("all", "week", "it")
    ),
    popular: router({
      movie: publicProcedure.query(
        async () => await tmdb.v3.movies.getPopular({ language: "it" })
      ),
    }),
    topRated: router({
      tvShow: publicProcedure.query(
        async () => await tmdb.v3.tv.getTopRated({ language: "it" })
      ),
    }),
    details: router({
      movie: publicProcedure
        .input(
          z.object({
            id: z.number(),
          })
        )
        .query(async ({ input: { id } }) => {
          const movie = await tmdb.v3.movies.getDetails(id, {
            append_to_response: ["credits", "videos"],
            language: "it",
          });

          let collection;
          if (movie.belongs_to_collection) {
            collection = await tmdb.v3.collections.getDetails(
              movie.belongs_to_collection.id,
              { language: "it" }
            );
          }

          return { ...movie, collection };
        }),
      tvShow: publicProcedure
        .input(
          z.object({
            id: z.number(),
          })
        )
        .query(
          async ({ input: { id } }) =>
            await tmdb.v3.tv.getDetails(id, {
              append_to_response: ["credits", "videos"],
              language: "it",
            })
        ),
      season: publicProcedure
        .input(
          z.object({
            id: z.number(),
            season: z.number(),
          })
        )
        .query(
          async ({ input: { id, season } }) =>
            await tmdb.v3.tvSeasons.getDetails(id, season, { language: "it" })
        ),
    }),
  }),
  playlist: publicProcedure
    .input(
      z.object({
        title: z.string(),
        seasonNumber: z.number().optional(),
        episodeNumber: z.number().optional(),
      })
    )
    .query(async ({ input: { title, seasonNumber, episodeNumber } }) => {
      const movie = (
        await search_movie(title, {
          match_estimate: true,
          match_exact: true,
        })
      )[0];
      if (!movie) return undefined;

      let episodeId;
      if (movie.is_series && seasonNumber && episodeNumber) {
        episodeId =
          movie.seasons[seasonNumber - 1].episodes[episodeNumber - 1].id;
      }

      return await get_playlist({
        movie_id: movie.id,
        episode_id: episodeId,
      });
    }),
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
      })
    )
    .query(async ({ input: { query } }) => {
      return await tmdb.v3.search.searchMulti({
        query,
        include_adult: true,
        language: "it",
      });
    }),
});

export type AppRouter = typeof appRouter;
