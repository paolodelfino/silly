"use client";
import { useDocumentTitle } from "@mantine/hooks";
import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from "@vidstack/react";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { UAParser } from "ua-parser-js";
import "vidstack/styles/community-skin/video.css";
import "vidstack/styles/defaults.css";

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

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  useEffect(() => {
    setIsMobile(new UAParser().getResult().device.type == "mobile");
  }, []);

  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (isMobile && video.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(playlist);
        hls.attachMedia(video.current);
      } else {
        video.current.src = playlist;
      }
    }
  }, [video, isMobile, playlist]);

  if (isMobile == null) return null; // To avoid hydration problems

  if (isMobile) {
    return <video ref={video} controls className="w-screen h-screen"></video>;
  }

  return (
    <MediaPlayer
      title={formattedTitle}
      className="w-screen h-screen"
      src={{
        src: playlist,
        type: "application/vnd.apple.mpegurl",
      }}
      aspectRatio={16 / 9}
      crossorigin=""
    >
      <MediaOutlet></MediaOutlet>
      <MediaCommunitySkin />
    </MediaPlayer>
  );
}
