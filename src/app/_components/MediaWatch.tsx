"use client";
import VideoPlayer from "@/app/_components/VideoPlayer";
import { calcCanBackForward } from "@/app/_lib/utils";
import { PlaylistOutput } from "@/app/_trpc/types";
import { getMovieDetails, getMoviePlaylist, getSeason } from "@/server/actions";
import { Button, ButtonGroup, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MediaWatch({
  title,
  seasonNumber,
  episodeNumber,
  canBack,
  canForward,
  movieId,
}: {
  title: string;
  seasonNumber?: number;
  episodeNumber?: number;
  canBack?: boolean | "bySeason";
  canForward?: boolean | "bySeason";
  movieId?: number;
}) {
  const router = useRouter();

  const [playlist, setPlaylist] = useState<PlaylistOutput>();
  const [isLoading, setIsLoading] = useState(true);

  let backSeason: number | undefined,
    backEpisode: number | undefined,
    forwardSeason: number | undefined,
    forwardEpisode: number | undefined;
  if (seasonNumber) {
    backSeason = canBack == "bySeason" ? seasonNumber - 1 : seasonNumber;
    forwardSeason = canForward == "bySeason" ? seasonNumber + 1 : seasonNumber;
  }
  if (episodeNumber) {
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

    if (movieId == undefined) return;

    getMovieDetails("tv", movieId).then((data) => {
      if (
        movieId == undefined ||
        seasonNumber == undefined ||
        episodeNumber == undefined ||
        backSeason == undefined ||
        backEpisode == undefined ||
        forwardSeason == undefined ||
        forwardEpisode == undefined ||
        !("name" in data)
      )
        return;

      getSeason(movieId, backSeason).then((season) => {
        let episodeIndex = -1;
        for (const episode of season.episodes) {
          episodeIndex++;
          if (episode.episode_number == backEpisode) break;
        }

        const [canBack, canForward] = calcCanBackForward(
          data.seasons,
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
          data.seasons,
          season,
          episodeIndex
        );
        forwardCanBack.current = canBack;
        forwardCanForward.current = canForward;
      });
    });
  }, []);

  if (isLoading)
    return (
      <center className="mt-12">
        <Spinner label="Loading..." color="warning" />
      </center>
    );

  if (!playlist) return "Playlist not found";

  return (
    <div className="flex flex-col">
      <VideoPlayer
        playlist={playlist}
        title={title}
        seasonNumber={seasonNumber}
        episodeNumber={episodeNumber}
      />

      {canBack != undefined &&
        canForward != undefined &&
        seasonNumber != undefined &&
        episodeNumber != undefined && (
          <div className="flex justify-center p-2">
            <ButtonGroup variant="light">
              <Button
                onPress={() =>
                  router.push(
                    `/watch/${title}/${backSeason}/${backEpisode}/${backCanBack.current}/${backCanForward.current}/${movieId}`
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
                    `/watch/${title}/${forwardSeason}/${forwardEpisode}/${forwardCanBack.current}/${forwardCanForward.current}/${movieId}`
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
            </ButtonGroup>
          </div>
        )}
    </div>
  );
}
