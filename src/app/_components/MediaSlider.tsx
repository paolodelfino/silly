"use client";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Drawer } from "vaul";

export default function <
  T extends {
    page: number;
    results: {
      poster_path: string;
      vote_count: number;
      popularity: number;
      id: number;
      title?: string;
      name?: string;
      release_date?: string; // To figure out if it's a person and not a movie nor a tv show
    }[];
    total_pages: number;
    total_results: number;
  }
>({ title, data }: { title: string; data: T }) {
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
          // const isPerson = !Boolean(entry.release_date);
          // if (entry.vote_count entry.popularity)

          return (
            <SwiperSlide
              key={`${title}-${i}-${entry.id}-slide`}
              className="!w-max first:!ml-2 last:!mr-1"
            >
              <Drawer.Root
                shouldScaleBackground
                key={`${title}-${i}-${entry.id}`}
              >
                <Drawer.Trigger asChild>
                  <Flex
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
                    <Text align={"center"} className="line-clamp-3">
                      {(!entry.poster_path && entry.title) ?? entry.name}
                    </Text>
                  </Flex>
                </Drawer.Trigger>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Portal>
                  <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
                    <div className="p-4 bg-white rounded-t-[10px] flex-1">
                      <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
                      <div className="max-w-md mx-auto">
                        <Drawer.Title className="font-medium mb-4">
                          Drawer for React.
                        </Drawer.Title>
                        <p className="text-gray-600 mb-2">
                          {entry.title ?? entry.name}
                        </p>
                      </div>
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
