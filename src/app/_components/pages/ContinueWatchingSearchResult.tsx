"use client";
import MediaGrid from "@/app/_components/MediaGrid";
import { continueWatchingSearch } from "@/server/actions";

export default function ContinueWatchingSearchResult({ query }: { query: string }) {
  return (
    <MediaGrid
      queryKey={["continue-watching-search-result", query]}
      queryFn={async ({ pageParam = 1 }) =>
        await continueWatchingSearch({ query, page: pageParam })
      }
      emptyDisplay={<center className="p-4 text-slate-400">No results</center>}
    />
  );
}
