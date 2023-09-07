"use client";
import { useMediaDrawer } from "@/app/_stores/media-drawer";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function <
  T extends {
    page: number;
    results: {
      id: number;
      poster_path: string;
      release_date?: string;
      title?: string;
      vote_count: number;
      popularity: number;
      first_air_date?: string;
      name?: string;
    }[];
    total_pages: number;
    total_results: number;
  }
>({ title, data }: { title: string; data: T }) {
  const { setId, setType, setShow } = useMediaDrawer();

  return (
    <Box className="gap-2">
      <Heading size={"4"} mb={"1"} ml={"1"} weight={"medium"}>
        {title}
      </Heading>
      <Swiper
        spaceBetween={8}
        slidesPerView={"auto"}
        grabCursor
        modules={[FreeMode]}
        freeMode
      >
        {data.total_results == 0 && (
          <Text ml={"2"} color="gray" weight={"regular"}>
            No results
          </Text>
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
              <Flex
                onClick={() => {
                  setId(entry.id);
                  setType(type);
                  setShow(true);
                }}
                className="w-[120px] h-[180px] bg-gray-800 rounded overflow-hidden"
                justify={"center"}
                align={"center"}
              >
                {entry.poster_path && (
                  <Image
                    loading="eager"
                    width={120}
                    height={180}
                    src={`https://image.tmdb.org/t/p/original/${entry.poster_path}`}
                    alt={entry.title ?? entry.name!}
                    className="object-fill"
                  />
                )}
                {!entry.poster_path && (
                  <Text align={"center"} className="line-clamp-3">
                    {entry.title ?? entry.name}
                  </Text>
                )}
              </Flex>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
