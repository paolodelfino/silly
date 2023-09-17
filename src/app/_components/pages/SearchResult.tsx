"use client";
import MediaGrid from "@/app/_components/MediaGrid";
import MediaSlider, {
  MediaSliderSkeleton,
} from "@/app/_components/MediaSlider";
import { trpc } from "@/app/_trpc/client";
import { searchMovies } from "@/server/actions";

export default function SearchResult({ query }: { query: string }) {
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

      <MediaGrid
        title="Movies and TV Shows"
        queryKey={["search-result", query]}
        queryFn={async ({ pageParam = 1 }) =>
          pageParam == 1
            ? await searchMovies({ query, page: pageParam })
            : { page: 1, results: [], total_pages: 1, total_results: 20 }
        }
        filterTrash
      />
    </>
  );
}
