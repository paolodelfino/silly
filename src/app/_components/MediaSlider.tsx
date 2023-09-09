"use client";
import { Card, CardHeader, Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MediaSlider<
  T extends {
    page: number;
    results: {
      id: number;
      poster_path?: string | null;
      release_date?: string;
      title?: string;
      vote_count?: number;
      popularity: number;
      first_air_date?: string;
      name?: string;
    }[];
    total_pages: number;
    total_results: number;
  }
>({ title, data }: { title: string; data: T }) {
  const router = useRouter();

  return (
    <div className="space-y-1">
      <h1 className="text-lg font-medium mb-1 ml-1">{title}</h1>
      <Swiper
        spaceBetween={8}
        slidesPerView={"auto"}
        grabCursor
        modules={[FreeMode]}
        freeMode
      >
        {data.total_results == 0 && (
          <span className="text-slate-400 ml-2">No results</span>
        )}
        {data.results.map((entry, i) => {
          const type = entry.release_date
            ? "movie"
            : entry.first_air_date
            ? "tv"
            : "person";
          if (type == "person") {
            return null;
          }
          //   if (entry.vote_count entry.popularity)

          return (
            <SwiperSlide
              key={`${title}-${i}-${entry.id}`}
              className="!w-max first:!ml-2 last:!mr-1"
            >
              <Card
                className="w-[120px] h-[180px] !outline-none"
                isPressable
                isHoverable
                onClick={() => router.push(`/display/${type}/${entry.id}`)}
              >
                <CardHeader className="absolute z-10 w-full h-full left-0 top-0 !items-center justify-center">
                  {!entry.poster_path && (
                    <span className="line-clamp-3 text-center">
                      {entry.title ?? entry.name}
                    </span>
                  )}
                </CardHeader>

                {entry.poster_path && (
                  <Image
                    removeWrapper
                    as={NextImage}
                    radius="none"
                    loading="eager"
                    width={120}
                    height={180}
                    src={`https://image.tmdb.org/t/p/original/${entry.poster_path}`}
                    alt={entry.title ?? entry.name!}
                    className="object-cover w-full h-full z-0"
                  />
                )}
              </Card>
              {/* <div
                onClick={() => {
                  router.push(`/display/${type}/${entry.id}`);
                }}
                className="w-[120px] h-[180px] flex justify-center items-center bg-gray-800 rounded overflow-hidden"
              >
                {entry.poster_path && (
                  <Image
                    removeWrapper
                    as={NextImage}
                    radius="none"
                    loading="eager"
                    width={120}
                    height={180}
                    src={`https://image.tmdb.org/t/p/original/${entry.poster_path}`}
                    alt={entry.title ?? entry.name!}
                    className="object-cover"
                  />
                )}
                {!entry.poster_path && (
                  <span className="line-clamp-3 text-center">
                    {entry.title ?? entry.name}
                  </span>
                )}
              </div> */}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
