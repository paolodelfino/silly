"use client";
import BackHome from "@/app/_components/BackHome";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
    queryKey: ["movie-details"],
    queryFn: async () => await getMovieDetails(type, id),
    onSettled: (data) => {
      if (data) {
        setDataForTrailer(data);
      }
    },
    refetchOnWindowFocus: false,
  });

  const isBookmarked = useQuery({
    queryKey: ["is-bookmarked", movieDetails],
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
    enabled: Boolean(movieDetails.data),
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
        (video) =>
          video.official && video.site == "YouTube" && video.type == "Trailer"
      ) ?? null,
    enabled: Boolean(dataForTrailer),
  });

  const [seasonToFetch, setSeasonToFetch] = useState<number | undefined>();
  const selectedSeason = useQuery({
    queryKey: ["selected-season", seasonToFetch],
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

  useEffect(() => {
    if (movieDetails.data && !("title" in movieDetails.data)) {
      setSeasonToFetch(movieDetails.data.seasons[0].season_number);
    }
  }, [setSeasonToFetch, movieDetails.data]);

  const actionCount = 2 + (trailer.data || trailer.isLoading ? 1 : 0);

  return (
    <div className="flex flex-col relative">
      <div className="flex absolute top-0 left-0 z-10 p-3">
        <BackHome />
      </div>

      <div className="w-full aspect-video relative">
        {movieDetails.isFetching || !movieDetails.data ? (
          <Skeleton className="w-full h-full" />
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
            className="w-full h-full"
          />
        )}

        <div className="z-[2] flex flex-col absolute bottom-0 left-0 p-3 gap-4 w-full">
          {movieDetails.isFetching || !movieDetails.data ? (
            <Skeleton className="w-[66.5px] h-[32px] rounded-full" />
          ) : (
            <Chip className="w-max" color="warning" size="lg" radius="full">
              {"title" in movieDetails.data
                ? movieDetails.data.release_date.split("-")[0]
                : movieDetails.data.first_air_date.split("-")[0]}
            </Chip>
          )}

          <div className="flex flex-col gap-1">
            {movieDetails.isFetching || !movieDetails.data ? (
              <Skeleton className="w-full h-8" />
            ) : (
              <h2 className="text-2xl font-bold">
                {"title" in movieDetails.data
                  ? movieDetails.data.title
                  : movieDetails.data.name}
              </h2>
            )}

            <div className="flex flex-wrap gap-2">
              {movieDetails.isFetching || !movieDetails.data ? (
                <Skeleton className="w-full h-6" />
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
                        className="w-6 h-6 text-amber-300"
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

        <div className="bg-gradient-to-t from-background h-1/2 w-full absolute bottom-0 left-0 z-[1]" />
      </div>

      <div className="flex flex-col p-3">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            {movieDetails.isFetching || !movieDetails.data ? (
              <Skeleton className="h-10 w-full rounded-large" />
            ) : (
              <Button
                onPress={() =>
                  router.push(
                    `/watch/${"title" in movieDetails.data ? "movie" : "tv"}/${
                      movieDetails.data.id
                    }/${
                      "title" in movieDetails.data
                        ? movieDetails.data.title
                        : movieDetails.data.name
                    }`
                  )
                }
                color="danger"
                className="w-full"
              >
                Play Film
              </Button>
            )}

            <Popover placement="bottom" backdrop="blur" showArrow>
              <PopoverTrigger>
                <Button
                  disableRipple
                  radius="none"
                  variant="light"
                  className="whitespace-normal p-0 h-max"
                >
                  {movieDetails.isFetching || !movieDetails.data ? (
                    <Skeleton className="w-full h-[60px]" />
                  ) : (
                    <span className="line-clamp-3 text-slate-400 text-sm text-start w-full">
                      {movieDetails.data.overview}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
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
          className="mt-5 gap-4 grid"
          style={{
            gridTemplateColumns: `repeat(${Math.min(
              3,
              actionCount
            )}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${Math.max(
              Math.floor(actionCount / 3),
              1
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

                if (isBookmarked.data) {
                  removeBookmark.mutate({
                    id: movieDetails.data.id,
                    type: "title" in movieDetails.data ? "movie" : "tv",
                  });
                } else {
                  addBookmark.mutate({
                    id: movieDetails.data.id,
                    type: "title" in movieDetails.data ? "movie" : "tv",
                    title:
                      "title" in movieDetails.data
                        ? movieDetails.data.title
                        : movieDetails.data.name,
                  });
                }
              }}
              startContent={
                !isBookmarked.isLoading &&
                !removeBookmark.isLoading &&
                !addBookmark.isLoading ? (
                  isBookmarked.data ? (
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
                ) : null
              }
              variant="light"
              isLoading={
                isBookmarked.isLoading ||
                removeBookmark.isLoading ||
                addBookmark.isLoading
              }
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
                  className="w-6 h-6"
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

        <Divider className="mt-4 mb-4" />

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
                  title=""
                />
              </Tab>
            )}

            {!("title" in movieDetails.data) && (
              <Tab key="episodes" title="Episodes">
                {selectedSeason.isFetching ||
                !selectedSeason.data ||
                seasonToFetch == undefined ? (
                  <Skeleton className="w-full h-16 rounded-large" />
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
                  <div className="flex flex-col gap-6 pb-3 w-full">
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
                                className="w-[185px] h-[104px] shrink-0"
                                radius="md"
                                isPressable
                                isHoverable
                                onPress={() => {
                                  if ("title" in movieDetails.data) return;

                                  const [canBack, canForward] =
                                    calcCanBackForward(
                                      movieDetails.data.seasons,
                                      selectedSeason.data,
                                      episodeIndex
                                    );

                                  router.push(
                                    `/watch/tv/${movieDetails.data.id}/${movieDetails.data.name}/${episode.season_number}/${episode.episode_number}/${canBack}/${canForward}`
                                  );
                                }}
                              >
                                <CardHeader className="absolute z-10 w-full h-full left-0 top-0 !items-center justify-center">
                                  <div className="bg-background/40 rounded-full pl-0.5">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      className="fill-white h-8 w-8"
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
                                    className="object-cover w-full h-full z-0"
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

                            <span className="text-slate-400 max-w-3xl">
                              {episode.overview}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </Tab>
            )}

            <Tab key="cast" title="Cast">
              <Swiper
                spaceBetween={8}
                slidesPerView={"auto"}
                grabCursor
                modules={[FreeMode]}
                freeMode
              >
                {movieDetails.data.credits.cast.map((person, i) => (
                  <SwiperSlide
                    key={`${
                      "title" in movieDetails.data
                        ? movieDetails.data.title
                        : movieDetails.data.name
                    }-${i}-${person.id}`}
                    className="!w-max"
                  >
                    <div className="justify-center gap-2 w-[130px] shrink-0 flex flex-col">
                      <div className="w-full flex justify-center">
                        <Avatar
                          src={`https://image.tmdb.org/t/p/w92/${person.profile_path}`}
                          showFallback={!person.profile_path}
                          fallback={person.name[0]}
                          size={"lg"}
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="text-center text-xs">
                          {person.name}
                        </span>

                        <span className="text-center text-xs text-slate-400">
                          {person.character}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Tab>
          </Tabs>
        )}
      </div>
    </div>
  );
}
