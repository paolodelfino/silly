"use client";
import Menu from "@/app/_components/Menu";
import { formatTime } from "@/app/_lib/utils";
import { useBrowserInfo } from "@/app/_stores/browser-info";
import { trpc } from "@/app/_trpc/client";
import { getCheckpoint } from "@/server/actions";
import { useHotkeys } from "@mantine/hooks";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Kbd,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  cn,
} from "@nextui-org/react";
import Hls from "hls.js";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactSlider from "react-slider";
import { VideoSeekSlider } from "react-video-seek-slider";
import "react-video-seek-slider/styles.css";
import screenfull from "screenfull";

type Props = {
  playlist: string;
  movieId: number;
  title: string;
  type: "movie" | "tv";
  seasonNumber?: number;
  episodeNumber?: number;
};

export default function VideoPlayer({
  playlist,
  movieId,
  type,
  title,
  episodeNumber,
  seasonNumber,
}: Props) {
  const { userAgent } = useBrowserInfo();
  const session = useSession();

  const player = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);
  const interval = useRef<NodeJS.Timeout>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [beautyCurrentTime, setBeautyCurrentTime] = useState<string>("");
  const [beautyLeftTime, setBeautyLeftTime] = useState<string>("");

  const updateCheckpoint = trpc.user.continueWatching.update.useMutation();

  const handleCanPlay = () =>
    video.current &&
    getCheckpoint({
      id: movieId,
      type,
    })
      .then((checkpoint) => {
        if (
          checkpoint != null &&
          (type == "movie" ||
            (episodeNumber == checkpoint.episode &&
              seasonNumber == checkpoint.season))
        ) {
          video.current!.currentTime = checkpoint.time;
        }
      })
      .catch((err) => console.log(err));

  const handleTimeUpdate = () => {
    if (!video.current) return;

    const currentTime = video.current.currentTime || 0;
    const duration = video.current.duration || 0;
    const showHours = Math.floor(duration / 60 / 60) > 0;

    setBeautyCurrentTime(formatTime(currentTime, showHours));

    const leftTime = duration - currentTime;
    setBeautyLeftTime(formatTime(leftTime, showHours));
  };

  const handleTimeChange = useCallback<
    (time: number, offsetTime: number) => void
  >((time, offsetTime) => {
    if (!video.current?.currentTime) {
      return;
    }

    video.current.currentTime = time / 1000;
    setCurrentTime(time);
  }, []);

  const handlePlay = () => {
    setIsPaused(false);
    // @ts-expect-error
    interval.current = setInterval(() => {
      setCurrentTime((video.current?.currentTime || 0) * 1000);
    }, 1000);
  };

  const handlePause = () => {
    setIsPaused(true);
    clearInterval(interval.current || undefined);
  };

  const handleDataLoaded = () => {
    setMaxTime((video.current?.duration || 0) * 1000);
  };

  const handleProgress = () => {
    const buffer = video?.current?.buffered;
    if (!buffer) return;

    if (((buffer.length > 0 && video.current?.duration) || 0) > 0) {
      let currentBuffer = 0;
      const inSeconds = video.current?.currentTime || 0;

      for (let i = 0; i < buffer.length; i++) {
        if (buffer.start(i) <= inSeconds && inSeconds <= buffer.end(i)) {
          currentBuffer = i;
          break;
        }
      }

      setProgress(buffer.end(currentBuffer) * 1000 || 0);
      if (session.status == "authenticated")
        updateCheckpoint.mutate({
          id: movieId,
          type,
          season: seasonNumber,
          episode: episodeNumber,
          time: inSeconds,
          title: title,
        });
    }
  };

  const seekBack = (by: number = 5) => {
    if (video.current) {
      video.current.currentTime -= by;
    }
  };

  const seekForward = (by: number = 5) => {
    if (video.current) {
      video.current.currentTime += by;
    }
  };

  const volumeUp = () => {
    if (video.current && video.current.volume <= 0.9) {
      video.current.volume += 0.1;
    }
  };

  const volumeDown = () => {
    if (video.current && video.current.volume >= 0.1) {
      video.current.volume -= 0.1;
    }
  };

  const toggleFullscreen = () => {
    if (player.current) {
      if (screenfull.isFullscreen) screenfull.exit();
      else if (screenfull.isEnabled) screenfull.request(player.current);
    }
  };

  const togglePip = () => {
    if (video.current) {
      document.pictureInPictureElement
        ? document.exitPictureInPicture()
        : video.current.requestPictureInPicture();
    }
  };

  const togglePause = () => {
    if (video.current) {
      video.current.paused ? video.current.play() : video.current.pause();
    }
  };

  const toggleMute = () => {
    if (video.current) {
      if (video.current.volume == 0) video.current.volume = 0.5;
      else video.current.muted = !video.current.muted;
    }
  };

  const [shortcutsHelpOpen, setShortcutsHelpOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const toggleShortcutsHelp = () => {
    if (!shortcutsHelpOpen && !showControls) {
      setShowControls(true);
    }
    setShortcutsHelpOpen(!shortcutsHelpOpen);
  };

  useHotkeys([
    ["ArrowLeft", () => seekBack()],
    ["ArrowRight", () => seekForward()],
    ["ArrowUp", volumeUp],
    ["ArrowDown", volumeDown],
    ["f", toggleFullscreen],
    ["space", togglePause],
    ["k", togglePause],
    ["m", toggleMute],
    ["i", togglePip],
    ["ctrl+h", toggleShortcutsHelp],
    [
      "ctrl+i",
      () => {
        if (!actionsOpen) {
          setShowControls(true);
        }
        setActionsOpen(!actionsOpen);
      },
    ],
    ["v", () => setShowControls(!showControls)],
  ]);

  const settingsActions: Record<string, VoidFunction> = {
    pip: togglePip,
    shortcuts: toggleShortcutsHelp,
  };

  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const videoRef = video.current;

    if (videoRef) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(playlist);
        hls.attachMedia(videoRef);
      } else {
        videoRef.src = playlist;
      }

      videoRef.addEventListener("play", handlePlay);
      videoRef.addEventListener("pause", handlePause);
      videoRef.addEventListener("loadeddata", handleDataLoaded);
      videoRef.addEventListener("progress", handleProgress);
      videoRef.addEventListener("canplay", handleCanPlay, { once: true });
      videoRef.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      videoRef?.removeEventListener("play", handlePlay);
      videoRef?.removeEventListener("pause", handlePause);
      videoRef?.removeEventListener("loadeddata", handleDataLoaded);
      videoRef?.removeEventListener("progress", handleProgress);
      videoRef?.removeEventListener("canplay", handleCanPlay);
      videoRef?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [video, playlist]);

  return (
    <div
      className="relative flex items-center border-divider"
      style={{
        borderWidth:
          (typeof document != "undefined" && !document.fullscreenElement
            ? "1"
            : "0") + "px",
        borderRadius:
          typeof document != "undefined" && !document.fullscreenElement
            ? "var(--nextui-radius-medium)"
            : undefined,
      }}
      ref={player}
      onClick={(e) => {
        setShowControls(!showControls);
      }}
    >
      <video
        playsInline={
          userAgent?.os.name != "iOS" && userAgent?.device.type != "mobile"
        }
        onKeyDown={(e) => e.preventDefault()}
        ref={video}
        className="aspect-video w-full outline-none"
        style={{
          borderRadius:
            typeof document != "undefined" && !document.fullscreenElement
              ? "var(--nextui-radius-medium)"
              : undefined,
        }}
      ></video>

      <Popover
        showArrow
        placement="top"
        isOpen={shortcutsHelpOpen}
        onOpenChange={setShortcutsHelpOpen}
        offset={20}
      >
        <PopoverTrigger>
          <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full"></div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <span className="flex w-full items-center justify-between gap-4">
              Show/Hide Controls
              <Kbd>V Click</Kbd>
            </span>
            <span className="flex w-full items-center justify-between gap-4">
              Volume
              <Kbd keys={["up", "down"]} />
            </span>
            <span className="flex w-full items-center justify-between gap-4">
              Mute/Unmute <Kbd>M</Kbd>
            </span>
            <span className="flex w-full items-center justify-between gap-4">
              Enter/Exit PiP <Kbd>I</Kbd>
            </span>
          </div>
        </PopoverContent>
      </Popover>

      {showControls && (
        <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between bg-background/20">
          <div className="flex w-full items-center justify-end gap-1 px-4 py-2">
            <div className="flex items-center gap-0.5">
              <ReactSlider
                className="h-3 w-[165px] overflow-hidden rounded-large duration-100 ease-linear transition-height focus-within:h-4 hover:h-4"
                min={0}
                max={1}
                step={0.1}
                value={video.current?.volume}
                renderTrack={({ key, ...props }, state) => (
                  <div
                    key={key}
                    {...props}
                    className={cn(
                      "bottom-0 top-0",
                      state.index == 1 ? "bg-default-200" : "bg-white",
                    )}
                  />
                )}
                renderThumb={({ key, ...props }, state) => (
                  <div key={key} {...props} />
                )}
                onChange={(value) =>
                  video.current && (video.current.volume = value)
                }
              />
              <Button
                isIconOnly
                radius="full"
                variant="light"
                onClick={toggleMute}
              >
                {video.current?.muted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M671-177q-11 7-22 13t-23 11q-15 7-30.5 0T574-176q-6-15 1.5-29.5T598-227q7-3 13-6.5t12-7.5L480-368v111q0 27-24.5 37.5T412-228L280-360H160q-17 0-28.5-11.5T120-400v-160q0-17 11.5-28.5T160-600h88L84-764q-11-11-11-28t11-28q11-11 28-11t28 11l680 680q11 11 11 28t-11 28q-11 11-28 11t-28-11l-93-93Zm113-111-58-58q17-31 25.5-65t8.5-70q0-83-44-151.5T598-735q-15-7-22-21.5t-2-29.5q6-16 21.5-23t31.5 0q97 43 155 131t58 197q0 53-14.5 102T784-288ZM650-422l-90-90v-94q0-12 10.5-17.5t20.5.5q33 21 51 63t18 80q0 15-2.5 29.5T650-422ZM480-592 376-696l36-36q19-19 43.5-8.5T480-703v111Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z" />
                  </svg>
                ) : (video.current?.volume ?? 0) < 0.5 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M360-360H240q-17 0-28.5-11.5T200-400v-160q0-17 11.5-28.5T240-600h120l132-132q19-19 43.5-8.5T560-703v446q0 27-24.5 37.5T492-228L360-360Zm380-120q0 42-19 79.5T671-339q-10 6-20.5.5T640-356v-250q0-12 10.5-17.5t20.5.5q31 25 50 63t19 80ZM480-606l-86 86H280v80h114l86 86v-252ZM380-480Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M760-481q0-83-44-151.5T598-735q-15-7-22-21.5t-2-29.5q6-16 21.5-23t31.5 0q97 43 155 131.5T840-481q0 108-58 196.5T627-153q-16 7-31.5 0T574-176q-5-15 2-29.5t22-21.5q74-34 118-102.5T760-481ZM280-360H160q-17 0-28.5-11.5T120-400v-160q0-17 11.5-28.5T160-600h120l132-132q19-19 43.5-8.5T480-703v446q0 27-24.5 37.5T412-228L280-360Zm380-120q0 42-19 79.5T591-339q-10 6-20.5.5T560-356v-250q0-12 10.5-17.5t20.5.5q31 25 50 63t19 80ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z" />
                  </svg>
                )}
              </Button>
            </div>

            {typeof document != "undefined" && !document.fullscreenElement && (
              <Tooltip
                showArrow
                isOpen={shortcutsHelpOpen}
                placement="left"
                content={
                  <span className="flex w-full items-center justify-between gap-4">
                    Show/Hide Actions
                    <Kbd keys={["ctrl"]}>I</Kbd>
                  </span>
                }
              >
                <div>
                  {userAgent?.device.type == "mobile" ? (
                    <Menu
                      Trigger={({ onOpen }) => (
                        <Button
                          isIconOnly
                          radius="full"
                          variant="light"
                          onPress={onOpen}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            fill="currentColor"
                          >
                            <path d="M555-80H405q-15 0-26-10t-13-25l-12-93q-13-5-24.5-12T307-235l-87 36q-14 5-28 1t-22-17L96-344q-8-13-5-28t15-24l75-57q-1-7-1-13.5v-27q0-6.5 1-13.5l-75-57q-12-9-15-24t5-28l74-129q7-14 21.5-17.5T220-761l87 36q11-8 23-15t24-12l12-93q2-15 13-25t26-10h150q15 0 26 10t13 25l12 93q13 5 24.5 12t22.5 15l87-36q14-5 28-1t22 17l74 129q8 13 5 28t-15 24l-75 57q1 7 1 13.5v27q0 6.5-2 13.5l75 57q12 9 15 24t-5 28l-74 128q-8 13-22.5 17.5T738-199l-85-36q-11 8-23 15t-24 12l-12 93q-2 15-13 25t-26 10Zm-73-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z" />
                          </svg>
                        </Button>
                      )}
                      Content={({ onClose }) => (
                        <Listbox
                          aria-label="Settings"
                          onAction={(key) => {
                            settingsActions[key.toString()]();
                            onClose();
                          }}
                        >
                          <ListboxItem
                            key={"pip"}
                            startContent={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 -960 960 960"
                                width="24"
                                fill="currentColor"
                              >
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-120h240q17 0 28.5-11.5T760-320v-160q0-17-11.5-28.5T720-520H480q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm120-120Z" />
                              </svg>
                            }
                          >
                            Picture-in-Picture
                          </ListboxItem>
                        </Listbox>
                      )}
                    />
                  ) : (
                    <Dropdown
                      placement="left-start"
                      isOpen={actionsOpen}
                      onOpenChange={setActionsOpen}
                    >
                      <DropdownTrigger>
                        <Button isIconOnly radius="full" variant="light">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 -960 960 960"
                            width="24"
                            fill="currentColor"
                          >
                            <path d="M555-80H405q-15 0-26-10t-13-25l-12-93q-13-5-24.5-12T307-235l-87 36q-14 5-28 1t-22-17L96-344q-8-13-5-28t15-24l75-57q-1-7-1-13.5v-27q0-6.5 1-13.5l-75-57q-12-9-15-24t5-28l74-129q7-14 21.5-17.5T220-761l87 36q11-8 23-15t24-12l12-93q2-15 13-25t26-10h150q15 0 26 10t13 25l12 93q13 5 24.5 12t22.5 15l87-36q14-5 28-1t22 17l74 129q8 13 5 28t-15 24l-75 57q1 7 1 13.5v27q0 6.5-2 13.5l75 57q12 9 15 24t-5 28l-74 128q-8 13-22.5 17.5T738-199l-85-36q-11 8-23 15t-24 12l-12 93q-2 15-13 25t-26 10Zm-73-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z" />
                          </svg>
                        </Button>
                      </DropdownTrigger>
                      <div className="[&>div]:-mr-[47px]">
                        <DropdownMenu
                          aria-label="Settings"
                          onAction={(key) => settingsActions[key.toString()]()}
                        >
                          <DropdownItem
                            key={"pip"}
                            shortcut="I"
                            startContent={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 -960 960 960"
                                width="24"
                                fill="currentColor"
                              >
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-120h240q17 0 28.5-11.5T760-320v-160q0-17-11.5-28.5T720-520H480q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm120-120Z" />
                              </svg>
                            }
                          >
                            Picture-in-Picture
                          </DropdownItem>
                          <DropdownItem
                            key={"shortcuts"}
                            shortcut="^H"
                            startContent={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                viewBox="0 -960 960 960"
                                width="24"
                                fill="currentColor"
                              >
                                <path d="M480-280q17 0 28.5-11.5T520-320v-160q0-17-11.5-28.5T480-520q-17 0-28.5 11.5T440-480v160q0 17 11.5 28.5T480-280Zm0-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                              </svg>
                            }
                          >
                            Shortcuts Help
                          </DropdownItem>
                        </DropdownMenu>
                      </div>
                    </Dropdown>
                  )}
                </div>
              </Tooltip>
            )}
          </div>

          <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 grid-cols-3 gap-2">
            <Button
              isIconOnly
              size="lg"
              radius="full"
              variant="light"
              onPress={() => seekBack()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 -960 960 960"
                width="32"
                fill="currentColor"
              >
                <path d="M799-281 551-447q-18-12-18-33t18-33l248-166q20-13 41-1.5t21 35.5v330q0 24-21 36t-41-2Zm-400 0L151-447q-18-12-18-33t18-33l248-166q20-13 41-1.5t21 35.5v330q0 24-21 36t-41-2Z" />
              </svg>
            </Button>

            <Tooltip
              showArrow
              offset={15}
              isOpen={shortcutsHelpOpen}
              content={
                <div className="flex flex-col gap-2">
                  <span className="flex w-full items-center justify-between gap-4">
                    Back
                    <Kbd keys={["left"]} />
                  </span>
                  <span className="flex w-full items-center justify-between gap-4">
                    Play/Pause
                    <Kbd keys={["space"]}>K</Kbd>
                  </span>
                  <span className="flex w-full items-center justify-between gap-4">
                    Forward
                    <Kbd keys={["right"]} />
                  </span>
                </div>
              }
            >
              <Button isIconOnly size="lg" radius="full" onPress={togglePause}>
                {isPaused ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="32"
                    viewBox="0 -960 960 960"
                    width="32"
                    fill="currentColor"
                  >
                    <path d="M381-239q-20 13-40.5 1.5T320-273v-414q0-24 20.5-35.5T381-721l326 207q18 12 18 34t-18 34L381-239Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="32"
                    viewBox="0 -960 960 960"
                    width="32"
                    fill="currentColor"
                  >
                    <path d="M640-200q-33 0-56.5-23.5T560-280v-400q0-33 23.5-56.5T640-760q33 0 56.5 23.5T720-680v400q0 33-23.5 56.5T640-200Zm-320 0q-33 0-56.5-23.5T240-280v-400q0-33 23.5-56.5T320-760q33 0 56.5 23.5T400-680v400q0 33-23.5 56.5T320-200Z" />
                  </svg>
                )}
              </Button>
            </Tooltip>

            <Button
              isIconOnly
              size="lg"
              radius="full"
              variant="light"
              onPress={() => seekForward()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32"
                viewBox="0 -960 960 960"
                width="32"
                fill="currentColor"
              >
                <path d="M162-281q-20 14-41 2t-21-36v-330q0-24 21-35.5t41 1.5l248 166q18 12 18 33t-18 33L162-281Zm400 0q-20 14-41 2t-21-36v-330q0-24 21-35.5t41 1.5l248 166q18 12 18 33t-18 33L562-281Z" />
              </svg>
            </Button>
          </div>

          <div className="flex w-full items-center gap-2 rounded-b-medium py-2 pl-7 pr-4">
            <div className="relative w-full">
              <div className="absolute bottom-4 flex w-full justify-between">
                <span>{beautyCurrentTime}</span>
                <span>-{beautyLeftTime}</span>
              </div>
              <div className="mb-[13.5px] w-full">
                <VideoSeekSlider
                  max={maxTime}
                  currentTime={currentTime}
                  bufferTime={progress}
                  onChange={handleTimeChange}
                  limitTimeTooltipBySides={true}
                  secondsPrefix="00:"
                  minutesPrefix="0:"
                />
              </div>
            </div>

            <Tooltip
              isOpen={shortcutsHelpOpen}
              showArrow
              content={
                <span className="flex w-full items-center justify-between gap-4">
                  Enter/Exit Fullscreen
                  <Kbd>F</Kbd>
                </span>
              }
            >
              <Button isIconOnly variant="light" onPress={toggleFullscreen}>
                {typeof document != "undefined" &&
                document.fullscreenElement != null ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M320-320h-80q-17 0-28.5-11.5T200-360q0-17 11.5-28.5T240-400h120q17 0 28.5 11.5T400-360v120q0 17-11.5 28.5T360-200q-17 0-28.5-11.5T320-240v-80Zm320 0v80q0 17-11.5 28.5T600-200q-17 0-28.5-11.5T560-240v-120q0-17 11.5-28.5T600-400h120q17 0 28.5 11.5T760-360q0 17-11.5 28.5T720-320h-80ZM320-640v-80q0-17 11.5-28.5T360-760q17 0 28.5 11.5T400-720v120q0 17-11.5 28.5T360-560H240q-17 0-28.5-11.5T200-600q0-17 11.5-28.5T240-640h80Zm320 0h80q17 0 28.5 11.5T760-600q0 17-11.5 28.5T720-560H600q-17 0-28.5-11.5T560-600v-120q0-17 11.5-28.5T600-760q17 0 28.5 11.5T640-720v80Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M280-280h80q17 0 28.5 11.5T400-240q0 17-11.5 28.5T360-200H240q-17 0-28.5-11.5T200-240v-120q0-17 11.5-28.5T240-400q17 0 28.5 11.5T280-360v80Zm0-400v80q0 17-11.5 28.5T240-560q-17 0-28.5-11.5T200-600v-120q0-17 11.5-28.5T240-760h120q17 0 28.5 11.5T400-720q0 17-11.5 28.5T360-680h-80Zm400 400v-80q0-17 11.5-28.5T720-400q17 0 28.5 11.5T760-360v120q0 17-11.5 28.5T720-200H600q-17 0-28.5-11.5T560-240q0-17 11.5-28.5T600-280h80Zm0-400h-80q-17 0-28.5-11.5T560-720q0-17 11.5-28.5T600-760h120q17 0 28.5 11.5T760-720v120q0 17-11.5 28.5T720-560q-17 0-28.5-11.5T680-600v-80Z" />
                  </svg>
                )}
              </Button>
            </Tooltip>
          </div>
        </div>
      )}
    </div>
  );
}
