"use client";
import VideoPlayer from "@/app/_components/VideoPlayer";
import { calcCanBackForward } from "@/app/_lib/utils";
import { PlaylistOutput, TvShowDetailsOutput } from "@/app/_trpc/types";
import { getMovieDetails, getMoviePlaylist, getSeason } from "@/server/actions";
import { Button, ButtonGroup, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

  const [playlist, setPlaylist] = useState<PlaylistOutput>();
  const [isLoading, setIsLoading] = useState(true);

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

  let backCanBack = useRef<boolean | "bySeason">(false);
  let backCanForward = useRef<boolean | "bySeason">(false);
  let forwardCanBack = useRef<boolean | "bySeason">(false);
  let forwardCanForward = useRef<boolean | "bySeason">(false);

  useEffect(() => {
    getMoviePlaylist(title, seasonNumber, episodeNumber).then((playlist) => {
      setPlaylist(playlist);
      setIsLoading(false);
    });

    if (type != "tv") return;

    getMovieDetails(type, movieId).then((data) => {
      if (type != "tv" || backSeason == undefined || forwardSeason == undefined)
        return;

      const tvShow = data as TvShowDetailsOutput;

      getSeason(movieId, backSeason).then((season) => {
        let episodeIndex = -1;
        for (const episode of season.episodes) {
          episodeIndex++;
          if (episode.episode_number == backEpisode) break;
        }

        const [canBack, canForward] = calcCanBackForward(
          tvShow.seasons,
          season,
          episodeIndex
        );
        backCanBack.current = canBack;
        backCanForward.current = canForward;
      });
      getSeason(movieId, forwardSeason).then((season) => {
        let episodeIndex = -1;
        for (const episode of season.episodes) {
          episodeIndex++;
          if (episode.episode_number == forwardEpisode) break;
        }

        const [canBack, canForward] = calcCanBackForward(
          tvShow.seasons,
          season,
          episodeIndex
        );
        forwardCanBack.current = canBack;
        forwardCanForward.current = canForward;
      });
    });
  }, [
    backEpisode,
    backSeason,
    episodeNumber,
    forwardEpisode,
    forwardSeason,
    movieId,
    seasonNumber,
    title,
    type,
  ]);

  if (isLoading)
    return (
      <center className="mt-12">
        <Spinner label="Loading..." color="warning" />
      </center>
    );

  if (!playlist) return "Playlist not found";

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Button
          onPress={() => router.push(`/display/${type}/${movieId}`)}
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
        <VideoPlayer
          playlist={playlist}
          title={title}
          seasonNumber={seasonNumber}
          episodeNumber={episodeNumber}
        />
      </div>

      {type == "tv" && (
        <div className="flex justify-center p-2">
          <ButtonGroup variant="light">
            <Button
              onPress={() =>
                router.push(
                  `/watch/${type}/${movieId}/${title}/${backSeason}/${backEpisode}/${backCanBack.current}/${backCanForward.current}`
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
            <Button
              onPress={() =>
                router.push(
                  `/watch/${type}/${movieId}/${title}/${forwardSeason}/${forwardEpisode}/${forwardCanBack.current}/${forwardCanForward.current}`
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
              {canForward ? `S${forwardSeason} E${forwardEpisode}` : "Forward"}
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
}
