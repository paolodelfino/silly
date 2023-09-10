import MediaSlider from "@/app/_components/MediaSlider";
import { trpcServer } from "@/app/_trpc/serverClient";

export default async function HomePage() {
  const trending = await trpcServer.tmdb.trending();
  const popularMovies = await trpcServer.tmdb.popular.movie();
  const topRatedTvShows = await trpcServer.tmdb.topRated.tvShow();

  return (
    <div className="flex flex-col gap-4 p-1 mb-4">
      <MediaSlider title="Trending" data={trending} />
      <MediaSlider title="Popular Movies" data={popularMovies} />
      <MediaSlider title="Top Rated TV Shows" data={topRatedTvShows} />
    </div>
  );
}
