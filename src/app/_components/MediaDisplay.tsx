"use client";
import { cn } from "@/app/_lib/utils";
import { useMediaWatch } from "@/app/_stores/media-watch";
import { useMobileDetector } from "@/app/_stores/mobile-detector";
import {
  MovieDetailsOutput,
  SeasonDetailsOutput,
  TvShowDetailsOutput,
} from "@/app/_trpc/types";
import { getSeason } from "@/server/actions";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Select,
  Separator,
  Tabs,
  Text,
  Theme,
} from "@radix-ui/themes";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MediaDisplay({
  data,
}: {
  data: MovieDetailsOutput | TvShowDetailsOutput;
}) {
  const isMobile = useMobileDetector((state) => state.isMobile);
  const { setTitle, setSeasonNumber, setEpisodeNumber, setShow } =
    useMediaWatch();

  const isMovie = "title" in data;
  const isBookmarked = false;

  const trailer = data.videos.results.find(
    (video) =>
      video.official && video.site == "YouTube" && video.type == "Trailer"
  );

  const [selectedSeason, setSelectedSeason] = useState<number>(0);
  const [seasonData, setSeasonData] = useState<
    SeasonDetailsOutput | undefined
  >();
  useEffect(() => {
    if (isMovie) return;

    getSeason(data.id, data.seasons[selectedSeason].season_number).then(
      (season) => setSeasonData(season)
    );
  }, [selectedSeason]);

  const screen = useRef<HTMLDivElement>(null);
  const episodesContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(
      screen.current?.clientHeight,
      episodesContainer.current?.clientHeight,
      window.innerHeight,
      window.innerHeight -
        ((screen.current?.clientHeight ?? 0) -
          (episodesContainer.current?.clientHeight ?? 0))
    );
  }, [screen.current]);

  return (
    <Theme ref={screen} appearance="dark" className="">
      <div className="w-full aspect-video relative">
        <Image
          width={1280}
          height={720}
          src={`https://image.tmdb.org/t/p/w1280/${data.backdrop_path}`}
          alt={isMovie ? data.title : data.name}
          className="w-full h-full"
        />

        <Flex
          className="z-[2]"
          width={"100%"}
          direction={"column"}
          position={"absolute"}
          bottom={"0"}
          left={"0"}
          p={"3"}
          gap={"4"}
        >
          <Badge
            className="w-max"
            size={"2"}
            color="yellow"
            radius="full"
            variant="solid"
          >
            {isMovie
              ? data.release_date.split("-")[0]
              : data.first_air_date.split("-")[0]}
          </Badge>

          <Flex direction={"column"} gap={"1"}>
            <Heading size={"6"}>{isMovie ? data.title : data.name}</Heading>

            <Flex gap={"2"} wrap={"wrap"}>
              {isMovie && (
                <Flex gap={"1"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-[var(--amber-10)]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <Text>
                    {Math.floor(data.runtime / 60)}h{" "}
                    {Math.floor(data.runtime % 60)}m
                  </Text>
                </Flex>
              )}
              {data.genres.map((genre, i) => (
                <Box
                  key={`${isMovie ? data.title : data.name}-${i}-genre-${
                    genre.id
                  }`}
                  px={"2"}
                  className="rounded-3xl bg-[var(--gray-3)]"
                >
                  {genre.name}
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex>

        <div className="bg-gradient-to-t from-[var(--color-page-background)] h-1/2 w-full absolute bottom-0 left-0 z-[1]" />
      </div>

      <Flex direction={"column"} p={"3"}>
        <Flex direction={"column"}>
          <Flex direction={"column"} gap={"4"}>
            <Button
              onClick={() => {
                setTitle(isMovie ? data.title : data.name);
                setShow(true);
              }}
              color="red"
              variant="soft"
              size={"3"}
              className="w-full"
            >
              Play Film
            </Button>

            <Text size={"2"} color="gray" className="line-clamp-3">
              {data.overview}
            </Text>
          </Flex>
        </Flex>

        <Grid mt={"5"} columns={trailer ? "4" : "3"}>
          <Button variant="ghost" color="teal" disabled>
            {isBookmarked ? (
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
            )}
            List
          </Button>

          {trailer && (
            <Button variant="ghost" color="teal" asChild>
              <a
                target="_blank"
                href={`https://youtube.com/watch/${trailer.key}`}
              >
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
                Trailer
              </a>
            </Button>
          )}

          <Button variant="ghost" color="teal" disabled>
            <svg
              width="24"
              height="24"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.50005 1.04999C7.74858 1.04999 7.95005 1.25146 7.95005 1.49999V8.41359L10.1819 6.18179C10.3576 6.00605 10.6425 6.00605 10.8182 6.18179C10.994 6.35753 10.994 6.64245 10.8182 6.81819L7.81825 9.81819C7.64251 9.99392 7.35759 9.99392 7.18185 9.81819L4.18185 6.81819C4.00611 6.64245 4.00611 6.35753 4.18185 6.18179C4.35759 6.00605 4.64251 6.00605 4.81825 6.18179L7.05005 8.41359V1.49999C7.05005 1.25146 7.25152 1.04999 7.50005 1.04999ZM2.5 10C2.77614 10 3 10.2239 3 10.5V12C3 12.5539 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2239 12.2239 10 12.5 10C12.7761 10 13 10.2239 13 10.5V12C13 13.1041 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2239 2.22386 10 2.5 10Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            Download
          </Button>

          <Button variant="ghost" color="teal" disabled>
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
            Send
          </Button>
        </Grid>

        <Separator className="!w-full" mt={"4"} mb={"4"} />

        <Tabs.Root defaultValue={isMovie ? "cast" : "episodes"}>
          <Tabs.List className="!shadow-none">
            {!isMovie && (
              <Tabs.Trigger
                value="episodes"
                className="text-base before:rounded-sm before:!bg-red-500 [&[aria-selected='true']]:before:!w-[3px] before:!h-5 before:!left-0 before:!top-1/2 before:!-translate-y-1/2"
              >
                Episodes
              </Tabs.Trigger>
            )}

            <Tabs.Trigger
              value="cast"
              className="text-base before:rounded-sm before:!bg-red-500 [&[aria-selected='true']]:before:!w-[3px] before:!h-5 before:!left-0 before:!top-1/2 before:!-translate-y-1/2"
            >
              Cast
            </Tabs.Trigger>

            {/* <Tabs.Trigger value="collection">Collection</Tabs.Trigger> */}
          </Tabs.List>

          <Box mt={"2"}>
            {!isMovie && (
              <Tabs.Content value="episodes">
                <Select.Root
                  defaultValue={selectedSeason.toString()}
                  onValueChange={(selected) =>
                    setSelectedSeason(Number(selected))
                  }
                >
                  <Select.Trigger
                    placeholder="Select a season"
                    variant="ghost"
                    mb={"4"}
                  />

                  <Select.Content>
                    {data.seasons.map((season, i) => (
                      <Select.Item
                        key={`${season.id}-${season.name}`}
                        value={i.toString()}
                      >
                        {season.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>

                <Flex
                  ref={episodesContainer}
                  direction={"column"}
                  gap={"3"}
                  pb={"3"}
                  className={cn(isMobile && "overflow-y-auto")}
                  style={{
                    height: isMobile
                      ? window.innerHeight -
                        ((screen.current?.clientHeight ?? 0) -
                          (episodesContainer.current?.clientHeight ?? 0))
                      : undefined,
                  }}
                >
                  {seasonData?.episodes.map((episode) => (
                    <Flex
                      gap={"4"}
                      key={`${data.name}-${episode.season_number}-${episode.id}`}
                    >
                      <Flex
                        onClick={() => {
                          setTitle(data.name);
                          setSeasonNumber(episode.season_number);
                          setEpisodeNumber(episode.episode_number);
                          setShow(true);
                        }}
                        className="w-[185px] h-[104px] shrink-0 relative hover:cursor-pointer bg-[--gray-3] rounded-lg"
                      >
                        {episode.still_path && (
                          <Image
                            width={185}
                            height={104}
                            src={`https://image.tmdb.org/t/p/w185/${episode.still_path}`}
                            alt={episode.name}
                            className="rounded-lg w-full h-full"
                          />
                        )}

                        <Box
                          position={"absolute"}
                          top={"50%"}
                          left={"50%"}
                          className="-translate-y-1/2 -translate-x-1/2 bg-black/40 rounded-full p-1 border"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 fill-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                          </svg>
                        </Box>
                      </Flex>

                      <Flex direction={"column"} gap={"2"}>
                        <Heading size={"4"}>
                          {episode.episode_number}. {episode.name}
                        </Heading>

                        <Text size={"1"} color="gray" className="line-clamp-3">
                          {episode.overview}
                        </Text>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Tabs.Content>
            )}

            <Tabs.Content value="cast">
              <Swiper
                spaceBetween={8}
                slidesPerView={"auto"}
                grabCursor
                modules={[FreeMode]}
                freeMode
              >
                {data.credits.cast.map((person, i) => (
                  <SwiperSlide
                    key={`${isMovie ? data.title : data.name}-${i}-${
                      person.id
                    }`}
                    className="!w-max"
                  >
                    <Flex
                      direction={"column"}
                      justify={"center"}
                      className="!w-[130px] shrink-0"
                      gap={"2"}
                    >
                      <Flex width={"100%"} justify={"center"}>
                        <Avatar
                          src={`https://image.tmdb.org/t/p/w92/${person.profile_path}`}
                          fallback={person.name[0]}
                          radius="full"
                          size={"5"}
                        />
                      </Flex>

                      <Flex direction={"column"}>
                        <Text align={"center"} size={"1"}>
                          {person.name}
                        </Text>

                        <Text align={"center"} size={"1"} color="gray">
                          {person.character}
                        </Text>
                      </Flex>
                    </Flex>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Tabs.Content>
          </Box>

          {/* <Tabs.Content value="collection">
              <Text size="2">Access and update your documents.</Text>
            </Tabs.Content> */}

          {/* <Tabs.Content value="episodes">
              <Text size="2">
                Edit your profile or update contact information.
              </Text>
            </Tabs.Content> */}
        </Tabs.Root>
      </Flex>
    </Theme>
  );
}
