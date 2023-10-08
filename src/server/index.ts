import { auth, currentUser } from "@/app/_lib/auth";
import {
  CollectionsGetDetailsResponse,
  MoviesGetDetailsResponse,
  MoviesGetPopularResponse,
  SearchMultiSearchResponse,
  SearchPeopleResponse,
  TVGetDetailsResponse,
  TVGetTopRatedResponse,
  TVSeasonsGetDetailsResponse,
  TrendingGetTrendingResponse,
} from "@/app/_lib/tmdb";
import { formulateSearchInPage } from "@/app/_lib/utils";
import { users } from "@/db/schema";
import { env } from "@/env.mjs";
import {
  TRPCError,
  type inferRouterInputs,
  type inferRouterOutputs,
} from "@trpc/server";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { get_playlist, search_movie } from "sc-wrapper";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "./trpc";

export const db = drizzle(sql);

export const appRouter = router({
  tmdb: router({
    trending: publicProcedure.query(
      async () =>
        (await (
          await fetch(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${env.TMDB_API_KEY}&language=it-IT`,
            {
              next: { revalidate: 60 * 60 * 24, tags: ["tmdb-trending"] },
            },
          )
        ).json()) as TrendingGetTrendingResponse,
    ),
    popular: router({
      movie: publicProcedure.query(
        async () =>
          (await (
            await fetch(
              `https://api.themoviedb.org/3/movie/popular?api_key=${env.TMDB_API_KEY}&language=it-IT`,
              {
                next: {
                  revalidate: 60 * 60 * 24,
                  tags: ["tmdb-popular-movie"],
                },
              },
            )
          ).json()) as MoviesGetPopularResponse,
      ),
    }),
    topRated: router({
      tvShow: publicProcedure.query(
        async () =>
          (await (
            await fetch(
              `https://api.themoviedb.org/3/tv/top_rated?api_key=${env.TMDB_API_KEY}&language=it-IT`,
              {
                next: {
                  revalidate: 60 * 60 * 24 * 7,
                  tags: ["tmdb-topRated-tvShow"],
                },
              },
            )
          ).json()) as TVGetTopRatedResponse,
      ),
    }),
    details: router({
      movie: publicProcedure
        .input(
          z.object({
            id: z.number(),
          }),
        )
        .query(async ({ input: { id } }) => {
          const movie = (await (
            await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${env.TMDB_API_KEY}&language=it-IT`,
              {
                next: {
                  revalidate: 60 * 60 * 24 * 2,
                  tags: ["tmdb-details-movie"],
                },
              },
            )
          ).json()) as MoviesGetDetailsResponse<["videos", "credits"]>;

          let collection;
          if (movie.belongs_to_collection) {
            collection = (await (
              await fetch(
                `https://api.themoviedb.org/3/collection/${movie.belongs_to_collection.id}?api_key=${env.TMDB_API_KEY}&language=it-IT`,
                {
                  next: {
                    revalidate: 60 * 60 * 24 * 4,
                    tags: ["tmdb-details-movie-collection"],
                  },
                },
              )
            ).json()) as CollectionsGetDetailsResponse;
          }

          return { ...movie, collection };
        }),
      tvShow: publicProcedure
        .input(
          z.object({
            id: z.number(),
          }),
        )
        .query(
          async ({ input: { id } }) =>
            (await (
              await fetch(
                `https://api.themoviedb.org/3/tv/${id}?api_key=${env.TMDB_API_KEY}&language=it-IT`,
                {
                  next: {
                    revalidate: 60 * 60 * 24 * 1,
                    tags: ["tmdb-details-tvShow"],
                  },
                },
              )
            ).json()) as TVGetDetailsResponse<["videos", "credits"]>,
        ),
      season: publicProcedure
        .input(
          z.object({
            id: z.number(),
            season: z.number(),
          }),
        )
        .query(
          async ({ input: { id, season } }) =>
            (await (
              await fetch(
                `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${env.TMDB_API_KEY}&language=it-IT`,
                {
                  next: {
                    revalidate: 60 * 60 * 24 * 1,
                    tags: ["tmdb-details-season"],
                  },
                },
              )
            ).json()) as TVSeasonsGetDetailsResponse<["videos"]>,
        ),
    }),
  }),
  playlist: publicProcedure
    .input(
      z.object({
        title: z.string(),
        seasonNumber: z.number().optional(),
        episodeNumber: z.number().optional(),
      }),
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

      try {
        return await get_playlist({
          movie_id: movie.id,
          episode_id: episodeId,
        });
      } catch (error) {
        return undefined;
      }
    }),
  search: router({
    movies: publicProcedure
      .input(
        z.object({
          query: z.string(),
          page: z.number(),
        }),
      )
      .query(async ({ input: { query, page } }) => {
        const data = (await (
          await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${env.TMDB_API_KEY}&language=it-IT&query=${query}&page=${page}&include_adult=true`,
            {
              next: {
                revalidate: 60 * 60 * 24 * 1,
                tags: ["tmdb-search-movies"],
              },
            },
          )
        ).json()) as SearchMultiSearchResponse;

        data.total_results -= data.results.length;
        data.results = data.results.filter(
          (entry) => entry.media_type != "person",
        );
        data.total_results += data.results.length;

        return data;
      }),
    people: publicProcedure
      .input(
        z.object({
          query: z.string(),
        }),
      )
      .query(
        async ({ input: { query } }) =>
          (await (
            await fetch(
              `https://api.themoviedb.org/3/search/person?api_key=${env.TMDB_API_KEY}&language=it-IT&query=${query}&include_adult=true`,
              {
                next: {
                  revalidate: 60 * 60 * 24 * 1,
                  tags: ["tmdb-search-people"],
                },
              },
            )
          ).json()) as SearchPeopleResponse,
      ),
  }),
  user: router({
    mylist: router({
      get: protectedProcedure.query(async () => {
        const session = await auth();
        const user = await currentUser(session?.user.id!);
        return user.mylist;
      }),
      add: protectedProcedure
        .input(
          z.object({
            id: z.number(),
            type: z.union([z.literal("movie"), z.literal("tv")]),
            title: z.string(),
          }),
        )
        .mutation(async ({ input: { id, type, title } }) => {
          const session = await auth();
          const user = await currentUser(session?.user.id!);

          await db
            .update(users)
            .set({
              mylist: [
                ...user.mylist,
                {
                  id,
                  type,
                  title,
                },
              ],
            })
            .where(eq(users.id, user.id));
        }),
      remove: protectedProcedure
        .input(
          z.object({
            id: z.number(),
            type: z.union([z.literal("movie"), z.literal("tv")]),
          }),
        )
        .mutation(async ({ input: { id, type } }) => {
          const session = await auth();
          const user = await currentUser(session?.user.id!);

          user.mylist = user.mylist.filter((entry) => {
            if (entry.type == type && entry.id == id) {
              return false;
            }
            return true;
          });

          await db
            .update(users)
            .set({
              mylist: user.mylist,
            })
            .where(eq(users.id, user.id));
        }),
      exists: protectedProcedure
        .input(
          z.object({
            id: z.number(),
            type: z.union([z.literal("movie"), z.literal("tv")]),
          }),
        )
        .query(async ({ input: { id, type } }) => {
          const session = await auth();
          const user = await currentUser(session?.user.id!);

          return (
            user.mylist.find((entry) => entry.id == id && entry.type == type) !=
            undefined
          );
        }),
      search: protectedProcedure
        .input(
          z.object({
            query: z.string(),
            page: z.number(),
          }),
        )
        .query(async ({ input: { query, page } }) => {
          const session = await auth();
          const user = await currentUser(session?.user.id!);

          return formulateSearchInPage(user.mylist, query, page);
        }),
    }),
    continueWatching: router({
      get: protectedProcedure.query(async () => {
        const session = await auth();
        const user = await currentUser(session?.user.id!);

        return user.continueWatching.sort(
          (a, b) => b.lastUpdated - a.lastUpdated,
        );
      }),
      update: protectedProcedure
        .input(
          z.object({
            id: z.number(),
            type: z.union([z.literal("movie"), z.literal("tv")]),
            time: z.number(),
            title: z.string(),
            season: z.number().optional(),
            episode: z.number().optional(),
          }),
        )
        .mutation(
          async ({ input: { id, type, time, title, season, episode } }) => {
            const session = await auth();
            const user = await currentUser(session?.user.id!);

            if (type == "tv" && (!season || !episode)) {
              throw new TRPCError({
                message: "Type is 'tv', but season or episode is missing",
                code: "BAD_REQUEST",
              });
            }

            let found = false;
            for (let i = 0; i < user.continueWatching.length; i++) {
              if (
                user.continueWatching[i].id == id &&
                user.continueWatching[i].type == type
              ) {
                user.continueWatching[i].time = time;

                if (user.continueWatching[i].type == "tv") {
                  user.continueWatching[i].season = season;
                  user.continueWatching[i].episode = episode;
                }

                user.continueWatching[i].lastUpdated = new Date().getTime();

                found = true;
              }
            }
            if (!found)
              user.continueWatching.push({
                id,
                type,
                season,
                episode,
                title,
                time,
                lastUpdated: new Date().getTime(),
              });

            await db
              .update(users)
              .set({
                continueWatching: user.continueWatching,
              })
              .where(eq(users.id, user.id));
          },
        ),
      checkpoint: router({
        get: protectedProcedure
          .input(
            z.object({
              id: z.number(),
              type: z.union([z.literal("movie"), z.literal("tv")]),
            }),
          )
          .query(async ({ input: { id, type } }) => {
            const session = await auth();
            const user = await currentUser(session?.user.id!);

            return (
              user.continueWatching.find(
                (entry) => entry.id == id && entry.type == type,
              ) ?? null
            );
          }),
      }),
      search: protectedProcedure
        .input(
          z.object({
            query: z.string(),
            page: z.number(),
          }),
        )
        .query(async ({ input: { query, page } }) => {
          const session = await auth();
          const user = await currentUser(session?.user.id!);

          return formulateSearchInPage(user.continueWatching, query, page);
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;
