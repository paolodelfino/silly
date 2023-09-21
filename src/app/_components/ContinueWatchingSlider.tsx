"use client";
import MediaSlider, {
  MediaSliderSkeleton,
} from "@/app/_components/MediaSlider";
import { trpc } from "@/app/_trpc/client";
import { fetchContinueWatching } from "@/server/actions";
import {
  Card,
  CardFooter,
  CardHeader,
  Image,
  Progress,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import Link from "next/link";

export default function ContinueWatchingSlider({ userId }: { userId: string }) {
  const continueWatching = useQuery({
    queryKey: ["continue-watching"],
    queryFn: async () => await fetchContinueWatching(userId, 1),
  });

  if (continueWatching.isLoading) {
    return <MediaSliderSkeleton titleWidth={156} seeAll />;
  }

  if (!continueWatching.data || continueWatching.data.total_results == 0) {
    return null;
  }

  return (
    <MediaSlider
      title="Continue Watching"
      seeAll="/continue-watching"
      data={continueWatching.data}
      Card={({ entry, type, actions, externActions }) => {
        const tvData = trpc.tmdb.details.season.useQuery(
          {
            id: entry.id,
            season: entry.checkpoint.season!,
          },
          {
            enabled: type == "tv",
            refetchOnWindowFocus: false,
          },
        );

        const runtime =
          ("title" in entry
            ? entry.runtime
            : tvData.data?.episodes.find(
                (episode) => episode.episode_number == entry.checkpoint.episode,
              )?.runtime ?? 0) * 60;
        const left = runtime - entry.checkpoint.time;
        const hours = Math.floor(left / 60 / 60);
        const minutes = Math.floor((left / 60) % 60);

        return (
          <Card
            className="w-[230px] !outline-none data-[focus-visible=true]:scale-[0.95]"
            as={Link}
            href={`/display/${type}/${entry.id}`}
            isPressable
            isHoverable
          >
            <CardHeader className="absolute left-0 top-0 z-10 h-[130px] w-full items-end">
              <div className="z-10 flex w-full flex-col items-end">
                {type == "tv" && tvData.isFetching ? (
                  <Skeleton className="h-6 w-7" />
                ) : (
                  <span>
                    -{hours > 0 && `${hours}h `}
                    {minutes > 0 && `${minutes}m`}
                  </span>
                )}

                <Progress
                  aria-label={
                    ("title" in entry ? entry.title : entry.name) + " progress"
                  }
                  size="sm"
                  value={(entry.checkpoint.time / runtime) * 100}
                  classNames={{
                    track: "drop-shadow-md bg-white/40",
                    indicator: "bg-white",
                  }}
                />
              </div>

              <div className="absolute bottom-0 left-0 h-[40%] w-full bg-gradient-to-t from-background/70" />
            </CardHeader>

            <div className="h-[130px] w-full">
              {entry.backdrop_path && (
                <Image
                  removeWrapper
                  as={NextImage}
                  radius="none"
                  loading="eager"
                  width={230}
                  height={130}
                  src={`https://image.tmdb.org/t/p/w300/${entry.backdrop_path}`}
                  alt={"title" in entry ? entry.title : entry.name}
                  className="z-0 h-full w-full object-cover"
                />
              )}
            </div>

            <CardFooter>
              <span className="line-clamp-1">
                {"title" in entry
                  ? entry.title
                  : `${entry.name} (S${entry.checkpoint.season} E${entry.checkpoint.episode})`}
              </span>
            </CardFooter>
          </Card>
        );
      }}
    />
  );
}
