"use client";
import BackHome from "@/app/_components/BackHome";
import MediaCard from "@/app/_components/MediaCard";
import MediaSlider from "@/app/_components/MediaSlider";
import WatchTrailer from "@/app/_components/WatchTrailer";
import { calcCanBackForward } from "@/app/_lib/utils";
import { trpc } from "@/app/_trpc/client";
import {
  TmdbDetailsMovieOutput,
  TmdbDetailsSeasonOutput,
  TmdbDetailsTvShowOutput,
} from "@/app/_trpc/types";
import { existsInMylist, getMovieDetails, getSeason } from "@/server/actions";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollShadow,
  Select,
  SelectItem,
  Skeleton,
  Spacer,
  Spinner,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { signIn, useSession } from "next-auth/react";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "swiper/css";

export default function MediaDisplay({
  id,
  type,
}: {
  type: "movie" | "tv";
  id: number;
}) {
  const router = useRouter();
  const session = useSession();

  const movieDetails = useQuery({
    queryKey: ["movie-details", type, id],
    queryFn: async () => await getMovieDetails(type, id),
    onSettled: (data) => {
      if (data) {
        setDataForTrailer(data);
      }
    },
  });

  const checkpoint = trpc.user.continueWatching.checkpoint.get.useQuery(
    {
      id,
      type,
    },
    {
      enabled:
        !movieDetails.isFetching &&
        movieDetails.data != undefined &&
        session.status != "loading" &&
        type != "movie",
      onSettled(data, error) {
        if (data != null) setSeasonToFetch(data.season);
        else if (!("title" in movieDetails.data!))
          setSeasonToFetch(movieDetails.data!.seasons[0].season_number);
      },
      retry(failureCount, error) {
        if (
          error.data?.code == "UNAUTHORIZED" &&
          !("title" in movieDetails.data!)
        ) {
          setSeasonToFetch(movieDetails.data!.seasons[0].season_number);
          return false;
        }
        return true;
      },
      refetchOnWindowFocus: false,
    },
  );

  const [isBookmarkedOptimistic, setIsBookmarkedOptimistic] = useState(false);
  const isBookmarked = useQuery({
    queryKey: ["is-bookmarked", movieDetails, id, type],
    queryFn: async () => {
      try {
        return await existsInMylist({
          id: movieDetails.data!.id,
          type: "title" in movieDetails.data! ? "movie" : "tv",
        });
      } catch (error) {
        return false;
      }
    },
    retry(failureCount, error) {
      if (
        error instanceof TRPCClientError &&
        error.data?.code == "UNAUTHORIZED"
      ) {
        return false;
      }
      return true;
    },
    enabled:
      movieDetails.data != undefined && session.status == "authenticated",
    onSettled(data, error) {
      if (data != undefined) setIsBookmarkedOptimistic(data);
    },
  });

  const addBookmark = trpc.user.mylist.add.useMutation({
    onSettled() {
      isBookmarked.refetch();
    },
  });

  const removeBookmark = trpc.user.mylist.remove.useMutation({
    onSettled() {
      isBookmarked.refetch();
    },
  });

  const [dataForTrailer, setDataForTrailer] = useState<
    | TmdbDetailsMovieOutput
    | TmdbDetailsTvShowOutput
    | TmdbDetailsSeasonOutput
    | undefined
  >();

  const trailer = useQuery({
    queryKey: ["trailer", dataForTrailer],
    queryFn: () =>
      dataForTrailer!.videos.results.find(
        (video) => video.site == "YouTube" && video.type == "Trailer",
      ) ?? null,
    enabled: dataForTrailer != undefined,
  });

  const [seasonToFetch, setSeasonToFetch] = useState<number | undefined>();
  const selectedSeason = useQuery({
    queryKey: ["selected-season", seasonToFetch, movieDetails],
    queryFn: async () => await getSeason(movieDetails.data!.id, seasonToFetch!),
    enabled:
      seasonToFetch != undefined &&
      movieDetails.data &&
      !("title" in movieDetails.data),
    onSettled: (data) => {
      if (data) setDataForTrailer(data);
      else setDataForTrailer(movieDetails.data);
    },
    refetchOnWindowFocus: false,
  });

  const actionCount = 2 + (trailer.data || trailer.isLoading ? 1 : 0);

  return (
    <div className="relative flex flex-col">
      <div className="absolute left-0 top-0 z-10 flex p-3">
        <BackHome />
      </div>

      <div className="relative aspect-video w-full">
        {movieDetails.isFetching || !movieDetails.data ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <NextImage
            width={1280}
            height={720}
            src={`https://image.tmdb.org/t/p/w1280/${movieDetails.data.backdrop_path}`}
            alt={
              "title" in movieDetails.data
                ? movieDetails.data.title
                : movieDetails.data.name
            }
            className="h-full w-full"
          />
        )}

        <div className="absolute bottom-0 left-0 z-[2] flex w-full flex-col gap-4 p-3">
          {movieDetails.isFetching || !movieDetails.data ? (
            <Skeleton className="h-[32px] w-[66.5px] rounded-full" />
          ) : (
            <Chip className="w-max" color="warning" size="lg" radius="full">
              {"title" in movieDetails.data
                ? movieDetails.data.release_date.split("-")[0]
                : movieDetails.data.first_air_date.split("-")[0]}
            </Chip>
          )}

          <div className="flex flex-col gap-1">
            {movieDetails.isFetching || !movieDetails.data ? (
              <Skeleton className="h-8 w-full" />
            ) : (
              <h2 className="text-2xl font-bold">
                {"title" in movieDetails.data
                  ? movieDetails.data.title
                  : movieDetails.data.name}
              </h2>
            )}

            <div className="flex flex-wrap gap-2">
              {movieDetails.isFetching || !movieDetails.data ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <>
                  {"title" in movieDetails.data && (
                    <div className="flex gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6 text-amber-300"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {Math.floor(movieDetails.data.runtime / 60)}h{" "}
                        {Math.floor(movieDetails.data.runtime % 60)}m
                      </span>
                    </div>
                  )}

                  {movieDetails.data.genres.map((genre, i) => (
                    <Chip
                      key={`${
                        "title" in movieDetails.data
                          ? movieDetails.data.title
                          : movieDetails.data.name
                      }-${i}-genre-${genre.id}`}
                      size="sm"
                    >
                      {genre.name}
                    </Chip>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-[1] h-1/2 w-full bg-gradient-to-t from-background" />
      </div>

      <div className="flex flex-col p-3">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            {movieDetails.isFetching ||
            !movieDetails.data ||
            (type == "tv" &&
              (checkpoint.isLoading || selectedSeason.isLoading)) ? (
              <Skeleton className="h-10 w-full rounded-large" />
            ) : (
              <Button
                onPress={() => {
                  if ("title" in movieDetails.data)
                    router.push(
                      `/watch/${type}/${movieDetails.data.id}/${movieDetails.data.title}`,
                    );
                  else {
                    let episodeIndex = 0;
                    if (checkpoint.data != null)
                      for (const episode of selectedSeason.data!.episodes) {
                        if (episode.episode_number == checkpoint.data.episode)
                          break;
                        episodeIndex++;
                      }

                    const [canBack, canForward] = calcCanBackForward(
                      movieDetails.data.seasons,
                      selectedSeason.data!,
                      episodeIndex,
                    );

                    router.push(
                      `/watch/tv/${movieDetails.data.id}/${
                        movieDetails.data.name
                      }/${
                        checkpoint.data?.season ??
                        selectedSeason.data!.season_number
                      }/${
                        checkpoint.data?.episode ??
                        selectedSeason.data!.episodes[0].episode_number
                      }/${canBack}/${canForward}`,
                    );
                  }
                }}
                color="danger"
                className="w-full"
              >
                {type == "movie" && "Play Film"}

                {type == "tv" &&
                  `Play (S${
                    checkpoint.data?.season ??
                    selectedSeason.data?.season_number
                  } E${
                    checkpoint.data?.episode ??
                    selectedSeason.data?.episodes[0].episode_number
                  })`}
              </Button>
            )}

            <Popover placement="bottom" backdrop="blur" showArrow>
              <PopoverTrigger>
                <Button
                  disableRipple
                  radius="none"
                  variant="light"
                  className="h-max whitespace-normal p-0"
                >
                  {movieDetails.isFetching || !movieDetails.data ? (
                    <Skeleton className="h-[60px] w-full" />
                  ) : (
                    <span className="line-clamp-3 w-full text-start text-sm text-slate-400">
                      {movieDetails.data.overview}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mr-3">
                <ScrollShadow className="max-h-[250px]">
                  {movieDetails.isFetching || !movieDetails.data ? (
                    <center>
                      <Spinner />
                    </center>
                  ) : (
                    movieDetails.data.overview
                  )}
                </ScrollShadow>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div
          className="mt-5 grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${Math.min(
              3,
              actionCount,
            )}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${Math.max(
              Math.floor(actionCount / 3),
              1,
            )}, minmax(0, 1fr))`,
          }}
        >
          {movieDetails.isFetching || !movieDetails.data ? (
            <Skeleton className="h-10 w-full rounded-xl" />
          ) : (
            <Button
              onPress={() => {
                if (session.status != "authenticated") {
                  signIn();
                  return;
                }

                setIsBookmarkedOptimistic(!isBookmarked.data);

                isBookmarked.data
                  ? removeBookmark.mutate({
                      id: movieDetails.data.id,
                      type: "title" in movieDetails.data ? "movie" : "tv",
                    })
                  : addBookmark.mutate({
                      id: movieDetails.data.id,
                      type: "title" in movieDetails.data ? "movie" : "tv",
                      title:
                        "title" in movieDetails.data
                          ? movieDetails.data.title
                          : movieDetails.data.name,
                    });
              }}
              startContent={
                isBookmarked.isInitialLoading ? null : isBookmarkedOptimistic ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
                  </svg>
                )
              }
              variant="light"
              isLoading={isBookmarked.isInitialLoading}
            >
              List
            </Button>
          )}

          {trailer.isFetching ||
            (trailer.isLoading && (
              <Skeleton className="h-10 w-full rounded-xl" />
            ))}
          {!trailer.isFetching && !trailer.isLoading && trailer.data && (
            <WatchTrailer youtubeKey={trailer.data.key} />
          )}

          {movieDetails.isFetching || !movieDetails.data ? (
            <Skeleton className="h-10 w-full rounded-xl" />
          ) : (
            <Button
              variant="light"
              isDisabled={
                typeof navigator != "undefined" && !navigator.canShare
              }
              startContent={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              }
              onPress={() => {
                navigator.share({
                  title: document.title,
                  url: window.location.href,
                  text: movieDetails.data.overview,
                });
              }}
            >
              Send
            </Button>
          )}
        </div>

        <Divider className="mb-4 mt-4" />

        {movieDetails.isFetching || !movieDetails.data ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <Tabs
            variant="underlined"
            classNames={{
              tabList: "w-full relative rounded-none p-0",
              cursor: "w-0",
              tab: "max-w-fit px-3 h-12 data-[focus-visible=true]:ring ring-focus rounded-sm ring-inset !outline-none",
              tabContent:
                "relative group-data-[selected=true]:text-white group-data-[selected=true]:before:scale-100 text-lg before:absolute before:rounded-sm before:bg-red-500 group-data-[selected=true]:before:w-[3px] before:h-5 before:-left-3 before:transition-all before:scale-0 before:top-1/2 before:-translate-y-1/2",
            }}
          >
            {"title" in movieDetails.data && movieDetails.data.collection && (
              <Tab key="collection" title="Collection">
                <MediaSlider
                  data={{
                    page: 1,
                    results: movieDetails.data.collection.parts,
                    total_pages: 1,
                    total_results: movieDetails.data.collection.parts.length,
                  }}
                  Card={(props) => {
                    if (props.entry.id != id) {
                      return (
                        <MediaCard<{
                          page: number;
                          results: (typeof props.entry)[];
                          total_pages: number;
                          total_results: number;
                        }>
                          {...props}
                        />
                      );
                    }

                    return (
                      <Badge
                        isOneChar
                        color="success"
                        placement="bottom-right"
                        size="lg"
                        content={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            fill="currentColor"
                          >
                            <path d="m438-540-28-28q-12-12-28-12t-28 12q-12 12-12 28.5t12 28.5l56 57q12 12 28 12t28-12l142-142q12-12 12-28.5T608-653q-12-12-28.5-12T551-653L438-540Zm362-12q0 45-17.5 94.5t-51 103Q698-301 648-244T533-127q-11 10-25 15t-28 5q-14 0-28-5t-25-15q-65-60-115-117t-83.5-110.5q-33.5-53.5-51-103T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552Z" />
                          </svg>
                        }
                      >
                        <MediaCard
                          {...props}
                          actions={() => (
                            <div className="absolute left-0 top-0 z-10 h-full w-full rounded-large border-2 border-success bg-transparent" />
                          )}
                        />
                      </Badge>
                    );
                  }}
                />
              </Tab>
            )}

            {!("title" in movieDetails.data) && (
              <Tab key="episodes" title="Episodes">
                {selectedSeason.isFetching ||
                !selectedSeason.data ||
                seasonToFetch == undefined ? (
                  <Skeleton className="h-16 w-full rounded-large" />
                ) : (
                  <Select
                    size="lg"
                    disallowEmptySelection
                    aria-label="Episodes"
                    label="Watch"
                    defaultSelectedKeys={[seasonToFetch.toString()]}
                    onSelectionChange={(keys) =>
                      setSeasonToFetch(Number(Array.from(keys)[0]))
                    }
                    items={movieDetails.data.seasons}
                  >
                    {(season) => (
                      <SelectItem
                        key={season.season_number.toString()}
                        value={season.season_number.toString()}
                      >
                        {season.name}
                      </SelectItem>
                    )}
                  </Select>
                )}

                <Spacer y={4} />

                {selectedSeason.isFetching ||
                !selectedSeason.data ||
                !movieDetails.data ? (
                  <center className="pt-1">
                    <Spinner />
                  </center>
                ) : (
                  <div className="flex w-full flex-col gap-6 pb-3">
                    {selectedSeason.data.episodes.map(
                      (episode, episodeIndex) => {
                        if ("title" in movieDetails.data) return null;

                        const hours = Math.floor(episode.runtime / 60);
                        const minutes = episode.runtime % 60;

                        return (
                          <div
                            className="flex flex-col gap-3"
                            key={`${movieDetails.data.name}-${episode.season_number}-${episode.id}`}
                          >
                            <div className="flex gap-4">
                              <Card
                                className="h-[104px] w-[185px] shrink-0"
                                radius="md"
                                isPressable
                                isHoverable
                                onPress={() => {
                                  if ("title" in movieDetails.data) return;

                                  const [canBack, canForward] =
                                    calcCanBackForward(
                                      movieDetails.data.seasons,
                                      selectedSeason.data,
                                      episodeIndex,
                                    );

                                  router.push(
                                    `/watch/tv/${movieDetails.data.id}/${movieDetails.data.name}/${episode.season_number}/${episode.episode_number}/${canBack}/${canForward}`,
                                  );
                                }}
                              >
                                <CardHeader className="absolute left-0 top-0 z-10 h-full w-full !items-center justify-center">
                                  <div className="rounded-full bg-background/40 pl-0.5">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className="h-8 w-8 fill-white"
                                    >
                                      <path d="M7 6v12l10-6z"></path>
                                    </svg>
                                  </div>
                                </CardHeader>

                                {episode.still_path && (
                                  <Image
                                    radius="none"
                                    as={NextImage}
                                    removeWrapper
                                    width={185}
                                    height={104}
                                    src={`https://image.tmdb.org/t/p/w185/${episode.still_path}`}
                                    alt={episode.name}
                                    className="z-0 h-full w-full object-cover"
                                  />
                                )}
                              </Card>

                              <div className="flex flex-col gap-1">
                                <h4 className="text-medium">
                                  {episode.episode_number}. {episode.name}
                                </h4>

                                <span className="text-slate-600">
                                  {hours > 0 ? `${hours}h ` : null}
                                  {minutes}m
                                </span>
                              </div>
                            </div>

                            <span className="max-w-3xl text-slate-400">
                              {episode.overview}
                            </span>
                          </div>
                        );
                      },
                    )}
                  </div>
                )}
              </Tab>
            )}

            <Tab key="cast" title="Cast">
              <MediaSlider
                data={{
                  page: 1,
                  results: movieDetails.data.credits.cast,
                  total_pages: 1,
                  total_results: movieDetails.data.credits.cast.length,
                }}
                Card={({ entry, type }) => {
                  return (
                    <Card
                      isPressable
                      isHoverable
                      className="flex w-[130px] shrink-0 flex-col justify-center gap-2 bg-background !outline-none data-[focus-visible=true]:scale-[0.90]"
                      as={Link}
                      href={`/display/${type}/${entry.id}`}
                    >
                      <div className="flex w-full justify-center">
                        <Avatar
                          src={`https://image.tmdb.org/t/p/w92/${entry.profile_path}`}
                          showFallback={!entry.profile_path}
                          fallback={entry.name[0]}
                          size={"lg"}
                        />
                      </div>

                      <div className="flex w-full flex-col !text-center">
                        <span className="text-xs">{entry.name}</span>

                        <span className="text-xs text-slate-400">
                          {entry.character}
                        </span>
                      </div>
                    </Card>
                  );
                }}
              />
            </Tab>
          </Tabs>
        )}
      </div>
    </div>
  );
}
