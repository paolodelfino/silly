"use client";
import MediaGrid, { MediaGridSkeleton } from "@/app/_components/MediaGrid";
import MediaSlider, {
  MediaSliderSkeleton,
} from "@/app/_components/MediaSlider";
import { trpc } from "@/app/_trpc/client";

export default function SearchResult({ query }: { query: string }) {
  const moviesResult = trpc.search.movies.useQuery({
    query,
  });
  const peopleResult = trpc.search.people.useQuery({
    query,
  });

  return (
    <>
      {peopleResult.isLoading || !peopleResult.data ? (
        <MediaSliderSkeleton titleWidth={55} />
      ) : (
        <MediaSlider title="People" data={peopleResult.data} />
      )}

      {moviesResult.isLoading || !moviesResult.data ? (
        <MediaGridSkeleton titleWidth={178} />
      ) : (
        <MediaGrid title="Movies and TV Shows" data={moviesResult.data} />
      )}
    </>
  );
}
