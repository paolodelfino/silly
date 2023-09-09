"use client";
import { useDocumentTitle } from "@mantine/hooks";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoPlayer({
  title,
  playlist,
  seasonNumber,
  episodeNumber,
}: {
  playlist: string;
  title: string;
  seasonNumber?: number;
  episodeNumber?: number;
}) {
  const formattedTitle =
    title +
    (seasonNumber && episodeNumber
      ? ` S${seasonNumber} E${episodeNumber}`
      : "");
  useDocumentTitle(`${formattedTitle} | Silly`);

  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (video.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(playlist);
        hls.attachMedia(video.current);
      } else {
        video.current.src = playlist;
      }
    }
  }, [video, playlist]);

  return (
    <video
      ref={video}
      controls
      className="w-full aspect-video border-divider border rounded-medium"
    ></video>
  );
}
