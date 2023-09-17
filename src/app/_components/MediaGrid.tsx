"use client";
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
  }
>({
  queryKey,
  queryFn,
  emptyDisplay,
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
    entries = entries?.filter((entry) => {
      if (
        (entry.vote_count && entry.vote_count < 40) ||
        entry.popularity < 10
      ) {
        return false;
      }
      return true;
    });

  if (entries || dataFetch.isFetching) {
    return (
      <div>
        {title && (
          <h1 className="text-lg font-medium mb-1 ml-1 w-max">{title}</h1>
        )}

        {!dataFetch.isLoading &&
          entries.length == 0 &&
          (emptyDisplay || (
            <span className="text-slate-400 ml-2">No results</span>
          ))}

        {!dataFetch.isLoading && entries.length > 0 && (
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-6 w-full p-3 pb-6">
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
        )}

        {dataFetch.isLoading && (
          <center className="pt-3 pb-4">
            <Spinner />
          </center>
        )}
      </div>
    );
  }
}
