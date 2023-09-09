"use client";
import MediaSlider from "@/app/_components/MediaSlider";
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
  Link,
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

  const trailer = data.videos.results.find(
    (video) =>
      video.official && video.site == "YouTube" && video.type == "Trailer"
  );

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

  const actionCount = 2 + (trailer ? 1 : 0);

  return (
    <div className="flex flex-col relative">
      <div className="flex absolute top-0 left-0 z-10">
        <Button
          variant="light"
          isIconOnly
          onPress={() => router.push(`/`)}
          radius="full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </Button>
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

            <span className="line-clamp-3 text-sm text-slate-400">
              {data.overview}
            </span>
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

          {trailer && (
            <Button
              isExternal
              href={`https://youtube.com/watch/${trailer.key}`}
              variant="light"
              as={Link}
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
                    d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                  />
                </svg>
              }
            >
              Trailer
            </Button>
          )}

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
                title: isMovie ? data.title : data.name,
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
