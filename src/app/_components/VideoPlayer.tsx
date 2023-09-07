"use client";
import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from "@vidstack/react";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { UAParser } from "ua-parser-js";
import "vidstack/styles/community-skin/video.css";
import "vidstack/styles/defaults.css";

export default function VideoPlayer({ playlist }: { playlist: string }) {
  const [isMobile, setIsMobile] = useState(false);
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
  }, [video.current, isMobile]);

  if (isMobile) {
    return <video ref={video} controls className="w-full h-full"></video>;
  }

  return (
    <MediaPlayer
      className="w-full h-full"
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
