"use client";
import { Button, Card, CardHeader, Image, Skeleton } from "@nextui-org/react";
import NextImage from "next/image";
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

export default function MediaSlider<
  T extends {
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
  },
>({
  title,
  seeAll,
  data,
  actions,
}: {
  title: string;
  seeAll?: string;
  data: T;
  actions?: (props: {
    entry: {
      id: number;
      poster_path?: string | null;
      profile_path?: string | null;
      release_date?: string;
      title?: string;
      vote_count?: number;
      popularity: number;
      first_air_date?: string;
      name?: string;
    };
  }) => ReactNode;
}) {
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
                as={Link}
                href={`/display/${type}/${entry.id}`}
                className="h-[180px] w-[120px] !outline-none data-[focus-visible=true]:scale-[0.97]"
                isPressable
                isHoverable
              >
                <CardHeader className="absolute left-0 top-0 z-10 h-full w-full !items-center justify-center">
                  {!entry.poster_path && !entry.profile_path && (
                    <span className="line-clamp-3 text-center">
                      {entry.title ?? entry.name}
                    </span>
                  )}
                </CardHeader>

                {actions?.({ entry })}

                {(entry.poster_path || entry.profile_path) && (
                  <Image
                    removeWrapper
                    as={NextImage}
                    radius="none"
                    loading="eager"
                    width={120}
                    height={180}
                    src={`https://image.tmdb.org/t/p/original/${
                      entry.poster_path || entry.profile_path
                    }`}
                    alt={entry.title ?? entry.name!}
                    className="z-0 h-full w-full object-cover"
                  />
                )}
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
