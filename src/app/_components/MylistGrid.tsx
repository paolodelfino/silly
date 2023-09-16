"use client";
import Search from "@/app/_components/Search";
import { fetchMylist } from "@/server/actions";
import { useIntersection } from "@mantine/hooks";
import {
  Button,
  Card,
  CardHeader,
  Image,
  Spacer,
  Spinner,
} from "@nextui-org/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function MylistGrid({ userId }: { userId: string }) {
  const mylist = useInfiniteQuery({
    queryKey: ["fetch-mylist"],
    queryFn: async ({ pageParam = 1 }) => await fetchMylist(userId, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage) return undefined;

      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
    getPreviousPageParam: (firstPage, allPages) => {
      if (!firstPage) return undefined;

      if (firstPage.page > 1 && firstPage.total_pages >= 1) {
        return firstPage.page - 1;
      }

      return undefined;
    },
  });

  const lastEntryRef = useRef<HTMLElement>(null);
  const observer = useIntersection({
    root: lastEntryRef.current,
  });

  useEffect(() => {
    if (observer.entry?.isIntersecting) {
      mylist.fetchNextPage();
    }
  }, [observer, mylist]);

  const entries = mylist.data?.pages.flatMap((page) => page.results);

  if (entries?.length == 0) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-large font-semibold px-2 text-cente">
          Your list is empty, browse and see what&apos;s your interest.
        </h1>

        <Spacer y={10} />

        <Search />
        <div className="mx-auto h-px bg-divider my-6 relative">
          <span className="bg-background absolute top-1/2 px-4 left-1/2 -translate-x-1/2 -translate-y-1/2">
            or
          </span>
        </div>
        <Button as={Link} href="/" fullWidth size="lg">
          Browse
        </Button>
      </div>
    );
  }

  if (entries || mylist.isFetching) {
    return (
      <>
        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6 w-full p-3 pb-6">
          {entries?.map((entry, i) => {
            let isLast = false;
            if (
              i == entries.length - 1 &&
              i != mylist.data?.pages[0].total_results! - 1
            )
              isLast = true;

            const isMovie = "title" in entry;
            const title = isMovie ? entry.title : entry.name;

            return (
              <div
                className="flex flex-col gap-3"
                key={`${i}-${title}`}
                ref={isLast ? observer.ref : null}
              >
                <div className="flex gap-4">
                  <Card
                    className="w-[185px] h-[104px] shrink-0"
                    radius="md"
                    isPressable
                    isHoverable
                    as={Link}
                    href={`/display/${isMovie ? "movie" : "tv"}/${entry.id}`}
                  >
                    <CardHeader className="absolute z-10 w-full h-full left-0 top-0 !items-center justify-center">
                      <div className="bg-background/40 rounded-full pl-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="fill-white h-8 w-8"
                        >
                          <path d="M7 6v12l10-6z"></path>
                        </svg>
                      </div>
                    </CardHeader>

                    {entry.backdrop_path && (
                      <Image
                        radius="none"
                        as={NextImage}
                        removeWrapper
                        width={185}
                        height={104}
                        src={`https://image.tmdb.org/t/p/w185/${entry.backdrop_path}`}
                        alt={title}
                        className="object-cover w-full h-full z-0"
                      />
                    )}
                  </Card>

                  <div className="flex flex-col justify-center">
                    <h4 className="text-medium font-semibold">{title}</h4>

                    <span className="text-slate-400 line-clamp-3 text-small">
                      {entry.overview}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {mylist.isFetching && (
          <center className="pt-3 pb-4">
            <Spinner />
          </center>
        )}
      </>
    );
  }
}
