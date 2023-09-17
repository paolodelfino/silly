"use client";
import MediaSlider, {
  MediaSliderSkeleton,
} from "@/app/_components/MediaSlider";
import { trpc } from "@/app/_trpc/client";

export default function HomeSliders() {
  const trending = trpc.tmdb.trending.useQuery();
  const popularMovies = trpc.tmdb.popular.movie.useQuery();
  const topRatedTvShows = trpc.tmdb.topRated.tvShow.useQuery();

  return (
    <>
      {trending.isLoading || !trending.data ? (
        <MediaSliderSkeleton titleWidth={72} />
      ) : (
        <MediaSlider title="Trending" data={trending.data} />
      )}

      {trending.isLoading || !popularMovies.data ? (
        <MediaSliderSkeleton titleWidth={126} />
      ) : (
        <MediaSlider title="Popular Movies" data={popularMovies.data} />
      )}

      {trending.isLoading || !topRatedTvShows.data ? (
        <MediaSliderSkeleton titleWidth={166} />
      ) : (
        <MediaSlider title="Top Rated TV Shows" data={topRatedTvShows.data} />
      )}
    </>
  );
}
