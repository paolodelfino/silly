"use client";
import { isTrash } from "@/app/_lib/utils";
import { useIntersection } from "@mantine/hooks";
import { Card, CardHeader, Image, Spinner } from "@nextui-org/react";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import NextImage from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";

export default function MediaGrid<
  T extends {
    page: number;
    results: {
      id: number;
      title?: string;
      name?: string;
      backdrop_path?: string | null;
      overview?: string | null;
      vote_count?: number;
      popularity: number;
    }[];
    total_pages: number;
    total_results: number;
  },
>({
  queryKey,
  queryFn,
  emptyDisplay = <span className="ml-2 text-slate-400">No results</span>,
  title,
  filterTrash,
}: {
  queryKey: UseInfiniteQueryOptions["queryKey"];
  queryFn: UseInfiniteQueryOptions<T>["queryFn"];
  emptyDisplay?: ReactNode;
  title?: string;
  filterTrash?: boolean;
}) {
  const dataFetch = useInfiniteQuery({
    queryKey,
    queryFn,
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
      dataFetch.fetchNextPage();
    }
  }, [observer, dataFetch]);

  let entries = dataFetch.data?.pages.flatMap((page) => page.results) ?? [];
  if (filterTrash)
    entries = entries?.filter(
      (entry) => !isTrash(entry.popularity, entry.vote_count),
    );

  if (entries || dataFetch.isFetching) {
    return (
      <div>
        {title && (
          <h1 className="mb-1 ml-1 w-max text-lg font-medium">{title}</h1>
        )}

        {!dataFetch.isLoading && entries.length == 0 && emptyDisplay}

        {!dataFetch.isLoading && entries.length > 0 && (
          <div className="grid w-full gap-6 p-3 pb-6 md:grid-cols-2 2xl:grid-cols-3">
            {entries.map((entry, i) => {
              let isLast = false;
              if (
                i == entries.length - 1 &&
                i != dataFetch.data?.pages[0].total_results! - 1
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
                      className="h-[104px] w-[185px] shrink-0"
                      radius="md"
                      isPressable
                      isHoverable
                      as={Link}
                      href={`/display/${isMovie ? "movie" : "tv"}/${entry.id}`}
                    >
                      <CardHeader className="absolute left-0 top-0 z-10 h-full w-full !items-center justify-center">
                        <div className="rounded-full bg-background/40 pl-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-8 w-8 fill-white"
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
                          className="z-0 h-full w-full object-cover"
                        />
                      )}
                    </Card>

                    <div className="flex flex-col justify-center">
                      <h4 className="text-medium font-semibold">{title}</h4>

                      <span className="line-clamp-3 text-small text-slate-400">
                        {entry.overview}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {dataFetch.isLoading && (
          <center className="pb-4 pt-3">
            <Spinner />
          </center>
        )}
      </div>
    );
  }
}
