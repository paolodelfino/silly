"use client";
import { MediaCommunitySkin, MediaOutlet, MediaPlayer } from "@vidstack/react";
import "vidstack/styles/community-skin/video.css";
import "vidstack/styles/defaults.css";

export default function ({ playlist }: { playlist: string }) {
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
