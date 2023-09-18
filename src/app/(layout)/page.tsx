import MylistSlider from "@/app/_components/MylistSlider";
import HomeSliders from "@/app/_components/pages/HomeSliders";
import { auth } from "@/app/_lib/auth";

export default async function HomePage() {
  const session = await auth();

  // const trending = await trpcServer.tmdb.trending();
  // const popularMovies = await trpcServer.tmdb.popular.movie();
  // const topRatedTvShows = await trpcServer.tmdb.topRated.tvShow();

  return (
    <div className="mb-4 flex flex-col gap-4 p-1">
      {session?.user.id && <MylistSlider userId={session.user.id} />}
      <HomeSliders />
      {/* <MediaSlider title="Trending" data={trending} />
      <MediaSlider title="Popular Movies" data={popularMovies} />
      <MediaSlider title="Top Rated TV Shows" data={topRatedTvShows} /> */}
    </div>
  );
}
