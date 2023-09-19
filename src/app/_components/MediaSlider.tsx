"use client";
import MediaCard from "@/app/_components/MediaCard";
import { Button, Skeleton } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function MediaSliderSkeleton({
  titleWidth,
  seeAll,
}: {
  titleWidth: number;
  seeAll?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-1 px-1">
      <div
        className="flex justify-between"
        style={{
          height: (seeAll ? "40" : "32") + "px",
        }}
      >
        <Skeleton
          className="rounded-large"
          style={{
            width: titleWidth + "px",
          }}
        />
        {seeAll && <Skeleton className="w-[80px] rounded-large" />}
      </div>

      <Skeleton className="ml-1 h-[180px] rounded-large" />
    </div>
  );
}

export type GenericMedia = {
  page: number;
  results: {
    id: number;
    poster_path?: string | null;
    profile_path?: string | null;
    release_date?: string;
    title?: string;
    vote_count?: number;
    popularity: number;
    first_air_date?: string;
    name?: string;
  }[];
  total_pages: number;
  total_results: number;
};

export type MediaSliderProps<T extends GenericMedia> = {
  title: string;
  seeAll?: string;
  data: T;
  actions?: (props: {
    entry: T["results"][number];
    type: Parameters<typeof MediaCard<T>>["0"]["type"];
  }) => ReactNode;
  externActions?: boolean;
  Card?: typeof MediaCard<T>;
};

export default function MediaSlider<T extends GenericMedia>({
  title,
  seeAll,
  data,
  actions,
  externActions,
  Card = MediaCard,
}: MediaSliderProps<T>) {
  data.results = data.results.filter((entry) => {
    if ((entry.vote_count && entry.vote_count < 40) || entry.popularity < 10) {
      return false;
    }
    return true;
  });
  data.total_results = data.results.length;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <h1 className="mb-1 ml-1 text-lg font-medium">{title}</h1>
        {seeAll && (
          <Button variant="light" color="danger" as={Link} href={seeAll}>
            See all
          </Button>
        )}
      </div>

      <Swiper
        mousewheel={true}
        spaceBetween={8}
        slidesPerView={"auto"}
        grabCursor
        modules={[FreeMode]}
        freeMode
      >
        {data.total_results == 0 && (
          <span className="ml-2 text-slate-400">No results</span>
        )}
        {data.results.map((entry, i) => {
          const type = entry.release_date
            ? "movie"
            : entry.first_air_date
            ? "tv"
            : "person";

          if (
            (entry.vote_count && entry.vote_count < 40) ||
            entry.popularity < 10
          ) {
            return null;
          }

          return (
            <SwiperSlide
              key={`${title}-${i}-${entry.id}`}
              className="!w-max first:!ml-2 last:!mr-1"
            >
              <Card
                entry={entry}
                type={type}
                actions={actions}
                externActions={externActions}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
