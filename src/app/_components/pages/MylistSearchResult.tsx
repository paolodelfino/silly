"use client";
import MediaGrid from "@/app/_components/MediaGrid";
import { mylistSearch } from "@/server/actions";

export default function MylistSearchResult({ query }: { query: string }) {
  return (
    <MediaGrid
      queryKey={["mylist-search-result", query]}
      queryFn={async ({ pageParam = 1 }) =>
        await mylistSearch({ query, page: pageParam })
      }
      emptyDisplay={<center className="p-4 text-slate-400">No results</center>}
    />
  );
}
