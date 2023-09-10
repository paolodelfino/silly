"use client";
import { useHotkeys } from "@mantine/hooks";
import Hls from "hls.js";
import { useEffect, useRef } from "react";

export default function VideoPlayer({ playlist }: { playlist: string }) {
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

      video.current.addEventListener("seeking", (e) => e.preventDefault());
    }
  }, [video, playlist]);

  useHotkeys([
    [
      "ArrowLeft",
      () => {
        if (video.current) {
          video.current.currentTime -= 5;
        }
      },
    ],
    [
      "ArrowRight",
      () => {
        if (video.current) {
          video.current.currentTime += 5;
        }
      },
    ],
    [
      "ArrowUp",
      () => {
        if (video.current && video.current.volume <= 0.9) {
          video.current.volume += 0.1;
        }
      },
    ],
    [
      "ArrowDown",
      () => {
        if (video.current && video.current.volume >= 0.1) {
          video.current.volume -= 0.1;
        }
      },
    ],
    [
      "f",
      () => {
        if (video.current) {
          document.fullscreenElement
            ? document.exitFullscreen()
            : video.current.requestFullscreen();
        }
      },
    ],
    [
      "space",
      () => {
        if (video.current) {
          video.current.paused ? video.current.play() : video.current.pause();
        }
      },
    ],
    [
      "k",
      () => {
        if (video.current) {
          video.current.paused ? video.current.play() : video.current.pause();
        }
      },
    ],
  ]);

  return (
    <video
      onKeyDown={(e) => e.preventDefault()}
      ref={video}
      controls
      className="w-full outline-none aspect-video border-divider border rounded-medium"
    ></video>
  );
}
