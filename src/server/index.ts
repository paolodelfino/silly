import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { tmdb } from "@/app/_lib/tmdb/client";

export const appRouter = router({
  tmdb: router({
    trending: publicProcedure.query(
      async () => await tmdb.v3.trending.getTrending("all", "week")
    ),
    popular: router({
      movie: publicProcedure.query(
        async () => await tmdb.v3.movies.getPopular()
      ),
    }),
    topRated: router({
      tvShow: publicProcedure.query(async () => await tmdb.v3.tv.getTopRated()),
    }),
  }),
});

export type AppRouter = typeof appRouter;
