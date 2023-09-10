"use client";
import BackHome from "@/app/_components/BackHome";
import MediaSlider from "@/app/_components/MediaSlider";
import WatchTrailer from "@/app/_components/WatchTrailer";
import { calcCanBackForward } from "@/app/_lib/utils";
import {
  MovieDetailsOutput,
  SeasonDetailsOutput,
  TvShowDetailsOutput,
} from "@/app/_trpc/types";
import { getSeason } from "@/server/actions";
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
  Spacer,
  Tab,
  Tabs,
} from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MediaDisplay({
  data,
}: {
  data: MovieDetailsOutput | TvShowDetailsOutput;
}) {
  const router = useRouter();

  const isMovie = "title" in data;
  const isBookmarked = false;

  const defaultTrailer = data.videos.results.find(
    (video) =>
      video.official && video.site == "YouTube" && video.type == "Trailer"
  );
  const [trailer, setTrailer] = useState<
    MovieDetailsOutput["videos"]["results"][number] | undefined
  >();

  useEffect(() => {
    setTrailer(
      data.videos.results.find(
        (video) =>
          video.official && video.site == "YouTube" && video.type == "Trailer"
      )
    );
  }, [setTrailer]);

  const [selectedSeason, setSelectedSeason] = useState<number | undefined>(
    isMovie ? undefined : data.seasons[0].season_number
  );
  const [seasonData, setSeasonData] = useState<
    SeasonDetailsOutput | undefined
  >();

  useEffect(() => {
    if (isMovie || selectedSeason == undefined) return;

    getSeason(data.id, selectedSeason).then((season) => setSeasonData(season));
    // @ts-expect-error
  }, [selectedSeason, data.id, isMovie, data.seasons]);

  useEffect(() => {
    if (seasonData) {
      const trailer = seasonData.videos.results.find(
        (video) =>
          video.official && video.site == "YouTube" && video.type == "Trailer"
      );

      console.log(seasonData.videos);

      if (trailer) setTrailer(trailer);
      else if (defaultTrailer) setTrailer(defaultTrailer);
    }
  }, [seasonData]);

  const actionCount = 2 + (trailer ? 1 : 0);

  return (
    <div className="flex flex-col relative">
      <div className="flex absolute top-0 left-0 z-10 p-3">
        <BackHome />
      </div>

      <div className="w-full aspect-video relative">
        <NextImage
          width={1280}
          height={720}
          src={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`}
          alt={isMovie ? data.title : data.name}
          className="w-full h-full"
        />

        <div className="z-[2] flex flex-col absolute bottom-0 left-0 p-3 gap-4 w-full">
          <Chip className="w-max" color="warning" size="lg" radius="full">
            {isMovie
              ? data.release_date.split("-")[0]
              : data.first_air_date.split("-")[0]}
          </Chip>

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">
              {isMovie ? data.title : data.name}
            </h2>

            <div className="flex flex-wrap gap-2">
              {isMovie && (
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
                    {Math.floor(data.runtime / 60)}h{" "}
                    {Math.floor(data.runtime % 60)}m
                  </span>
                </div>
              )}
              {data.genres.map((genre, i) => (
                <Chip
                  key={`${isMovie ? data.title : data.name}-${i}-genre-${
                    genre.id
                  }`}
                  size="sm"
                >
                  {genre.name}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-t from-background h-1/2 w-full absolute bottom-0 left-0 z-[1]" />
      </div>

      <div className="flex flex-col p-3">
        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <Button
              onPress={() =>
                router.push(
                  `/watch/${isMovie ? "movie" : "tv"}/${data.id}/${
                    isMovie ? data.title : data.name
                  }`
                )
              }
              color="danger"
              className="w-full"
            >
              Play Film
            </Button>

            <Popover placement="bottom" backdrop="blur" showArrow>
              <PopoverTrigger>
                <Button
                  disableRipple
                  radius="none"
                  variant="light"
                  className="whitespace-normal p-0 h-max max-w-max"
                >
                  <span className="line-clamp-3 text-slate-400 text-sm text-start w-full">
                    {data.overview}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <ScrollShadow className="max-h-[250px]">
                  {data.overview}
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
          <Button
            startContent={
              isBookmarked ? (
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
                    d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                  />
                </svg>
              ) : (
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
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
              )
            }
            variant="light"
            isDisabled
          >
            List
          </Button>

          {trailer && <WatchTrailer youtubeKey={trailer.key} />}

          <Button
            variant="light"
            isDisabled={typeof navigator != "undefined" && !navigator.canShare}
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
                text: data.overview,
              });
            }}
          >
            Send
          </Button>
        </div>

        <Divider className="mt-4 mb-4" />

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
          {isMovie && data.collection && (
            <Tab key="collection" title="Collection">
              <MediaSlider
                data={{
                  page: 1,
                  results: data.collection.parts,
                  total_pages: 1,
                  total_results: data.collection.parts.length,
                }}
                title=""
              />
            </Tab>
          )}

          {!isMovie && (
            <Tab key="episodes" title="Episodes">
              <Select
                size="lg"
                disallowEmptySelection
                aria-label="Episodes"
                label="Watch"
                defaultSelectedKeys={[selectedSeason!.toString()]}
                onSelectionChange={(keys) =>
                  setSelectedSeason(Number(Array.from(keys)[0]))
                }
                items={data.seasons}
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

              <Spacer y={4} />

              <div className="flex flex-col gap-6 pb-3 w-full">
                {seasonData?.episodes.map((episode, episodeIndex) => {
                  const hours = Math.floor(episode.runtime / 60);
                  const minutes = episode.runtime % 60;

                  return (
                    <div className="flex flex-col gap-3" key={episode.id}>
                      <div
                        className="flex gap-4"
                        key={`${data.name}-${episode.season_number}-${episode.id}`}
                      >
                        <Card
                          className="w-[185px] h-[104px] shrink-0"
                          radius="md"
                          isPressable
                          isHoverable
                          onPress={() => {
                            const [canBack, canForward] = calcCanBackForward(
                              data.seasons,
                              seasonData,
                              episodeIndex
                            );

                            router.push(
                              `/watch/tv/${data.id}/${data.name}/${episode.season_number}/${episode.episode_number}/${canBack}/${canForward}`
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
                })}
              </div>
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
              {data.credits.cast.map((person, i) => (
                <SwiperSlide
                  key={`${isMovie ? data.title : data.name}-${i}-${person.id}`}
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
                      <span className="text-center text-xs">{person.name}</span>

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
      </div>
    </div>
  );
}
