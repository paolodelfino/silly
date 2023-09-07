import { tmdb } from "@/app/_lib/tmdb/client";
import { get_playlist, search_movie } from "sc-wrapper";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  tmdb: router({
    trending: publicProcedure.query(
      async () => await tmdb.v3.trending.getTrending("all", "week")
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
        .query(
          async ({ input: { id } }) =>
            await tmdb.v3.movies.getDetails(id, {
              append_to_response: ["credits", "videos"],
              language: "It",
            })
        ),
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
              language: "It",
            })
        ),
    }),
  }),
  playlist: router({
    movie: publicProcedure
      .input(z.object({ title: z.string() }))
      .query(async ({ input: { title } }) => {
        const movie = (
          await search_movie(title, {
            match_estimate: true,
            match_exact: true,
          })
        )[0];
        if (!movie) return undefined;

        return await get_playlist({ movie_id: movie.id });
      }),
  }),
});

export type AppRouter = typeof appRouter;
