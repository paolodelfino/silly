import MediaSlider from "@/app/_components/MediaSlider";
import MylistSlider from "@/app/_components/MylistSlider";
import { auth } from "@/app/_lib/auth";
import { trpcServer } from "@/app/_trpc/serverClient";

export default async function HomePage() {
  const session = await auth();

  const trending = await trpcServer.tmdb.trending();
  const popularMovies = await trpcServer.tmdb.popular.movie();
  const topRatedTvShows = await trpcServer.tmdb.topRated.tvShow();

  return (
    <div className="flex flex-col gap-4 p-1 mb-4">
      {session?.user.id && <MylistSlider userId={session.user.id} />}
      <MediaSlider title="Trending" data={trending} />
      <MediaSlider title="Popular Movies" data={popularMovies} />
      <MediaSlider title="Top Rated TV Shows" data={topRatedTvShows} />
    </div>
  );
}
