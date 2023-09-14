"use client";

import MediaSlider from "@/app/_components/MediaSlider";
import MediaSliderSkeleton from "@/app/_components/MediaSliderSkeleton";
import { trpc } from "@/app/_trpc/client";

export default function SearchResult({ query }: { query: string }) {
  const searchResult = trpc.search.useQuery({
    query,
  });

  if (searchResult.isLoading || !searchResult.data) {
    return <MediaSliderSkeleton titleWidth={108} />;
  }

  return <MediaSlider title="Search Result" data={searchResult.data} />;
}
