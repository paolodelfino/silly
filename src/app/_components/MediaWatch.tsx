"use client";
import VideoPlayer from "@/app/_components/VideoPlayer";
import { calcCanBackForward } from "@/app/_lib/utils";
import { TmdbDetailsTvShowOutput } from "@/app/_trpc/types";
import { getMovieDetails, getMoviePlaylist, getSeason } from "@/server/actions";
import { useHotkeys } from "@mantine/hooks";
import { Button, ButtonGroup, Skeleton } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MediaWatch({
  type,
  movieId,
  title,
  seasonNumber,
  episodeNumber,
  canBack,
  canForward,
}: {
  movieId: number;
  title: string;
} & (
  | {
      type: "movie";
      seasonNumber?: undefined;
      episodeNumber?: undefined;
      canBack?: undefined;
      canForward?: undefined;
    }
  | {
      type: "tv";
      seasonNumber: number;
      episodeNumber: number;
      canBack: boolean | "bySeason";
      canForward: boolean | "bySeason";
    }
)) {
  const router = useRouter();
  const backUrl = `/display/${type}/${movieId}`;

  useHotkeys([["shift+escape", () => router.push(backUrl)]]);

  const [playlist, setPlaylist] = useState<string | undefined>();
  const [playlistLoading, setPlaylistLoading] = useState(true);

  useEffect(() => {
    if (!playlist)
      try {
        getMoviePlaylist(title, seasonNumber, episodeNumber).then((data) => {
          setPlaylist(data);
          setPlaylistLoading(false);
        });
      } catch (error) {}
  }, [episodeNumber, playlist, seasonNumber, title]);

  let backSeason: number | undefined,
    backEpisode: number | undefined,
    forwardSeason: number | undefined,
    forwardEpisode: number | undefined;
  if (type == "tv") {
    backSeason = canBack == "bySeason" ? seasonNumber - 1 : seasonNumber;
    forwardSeason = canForward == "bySeason" ? seasonNumber + 1 : seasonNumber;
    backEpisode = canBack == "bySeason" ? 1 : episodeNumber - 1;
    forwardEpisode = canForward == "bySeason" ? 1 : episodeNumber + 1;
  }

  const tvShowDetails = useQuery({
    queryKey: ["tvshow-details"],
    queryFn: async () =>
      (await getMovieDetails(type, movieId)) as TmdbDetailsTvShowOutput,
    enabled: type == "tv",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const backCan = useQuery({
    queryKey: ["back-can"],
    queryFn: async () => {
      const season = await getSeason(movieId, backSeason!);

      let episodeIndex = -1;
      for (const episode of season.episodes) {
        episodeIndex++;
        if (episode.episode_number == backEpisode) break;
      }

      return calcCanBackForward(
        tvShowDetails.data!.seasons,
        season,
        episodeIndex,
      );
    },
    enabled: Boolean(tvShowDetails.data) && backSeason != undefined,
  });

  const forwardCan = useQuery({
    queryKey: ["forward-can"],
    queryFn: async () => {
      const season = await getSeason(movieId, forwardSeason!);

      let episodeIndex = -1;
      for (const episode of season.episodes) {
        episodeIndex++;
        if (episode.episode_number == forwardEpisode) break;
      }

      return calcCanBackForward(
        tvShowDetails.data!.seasons,
        season,
        episodeIndex,
      );
    },
    enabled: Boolean(tvShowDetails.data) && forwardSeason != undefined,
  });

  if (!playlistLoading && !playlist) return "Playlist not found";

  return (
    <div className="mb-4 flex flex-col">
      <div className="flex p-3">
        <Button
          as={Link}
          href={backUrl}
          variant="light"
          isIconOnly
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

      <div className="px-4 py-0.5">
        {playlistLoading || !playlist ? (
          <Skeleton className="aspect-video w-full rounded-medium" />
        ) : (
          <VideoPlayer
            playlist={playlist}
            movieId={movieId}
            title={title}
            type={type}
            episodeNumber={episodeNumber}
            seasonNumber={seasonNumber}
          />
        )}
      </div>

      {type == "tv" && (
        <div className="flex justify-center p-2">
          <ButtonGroup variant="flat">
            {backCan.isFetching || !backCan.data ? (
              <Skeleton className="h-10 w-12 rounded-s-large" />
            ) : (
              <Button
                onPress={() =>
                  router.push(
                    `/watch/${type}/${movieId}/${title}/${backSeason}/${backEpisode}/${backCan.data[0]}/${backCan.data[1]}`,
                  )
                }
                isDisabled={!canBack}
                startContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                  </svg>
                }
              >
                {canBack ? `S${backSeason} E${backEpisode}` : "Back"}
              </Button>
            )}

            {forwardCan.isFetching || !forwardCan.data ? (
              <Skeleton className="h-10 w-12 rounded-e-large" />
            ) : (
              <Button
                onPress={() =>
                  router.push(
                    `/watch/${type}/${movieId}/${title}/${forwardSeason}/${forwardEpisode}/${forwardCan.data[0]}/${forwardCan.data[1]}`,
                  )
                }
                isDisabled={!canForward}
                endContent={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                  </svg>
                }
              >
                {canForward
                  ? `S${forwardSeason} E${forwardEpisode}`
                  : "Forward"}
              </Button>
            )}
          </ButtonGroup>
        </div>
      )}
    </div>
  );
}
