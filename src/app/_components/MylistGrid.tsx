"use client";
import { fetchMylist } from "@/server/actions";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export default function MylistGrid({ userId }: { userId: string }) {
  const mylist = useInfiniteQuery({
    queryKey: ["fetch-mylist"],
    queryFn: async ({ pageParam = 1 }) =>
      /* TODO: caching problem due to Next.js caching */ await fetchMylist(
        userId,
        pageParam
      ),
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
    if (observer.entry?.isIntersecting) mylist.fetchNextPage();
  }, [observer, mylist]);

  const entries = mylist.data?.pages.flatMap((page) => page.results);

  return (
    <div>
      {entries?.map((entry, i) => {
        const title = "title" in entry ? entry.title : entry.name;

        let isLast = false;
        if (i == entries.length - 1) isLast = true;

        return (
          <div
            className="my-20"
            key={`${i}-${title}`}
            ref={isLast ? observer.ref : null}
          >
            {title}
          </div>
        );
      })}
    </div>
  );
}
