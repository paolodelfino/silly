import MediaSlider from "@/app/_components/MediaSlider";
import MylistSlider from "@/app/_components/MylistSlider";
import { trpcServer } from "@/app/_trpc/serverClient";
import { UserMylistGetOutput } from "@/server";

export default async function HomePage() {
  const trending = await trpcServer.tmdb.trending();
  const popularMovies = await trpcServer.tmdb.popular.movie();
  const topRatedTvShows = await trpcServer.tmdb.topRated.tvShow();

  let mylist: UserMylistGetOutput | undefined;
  try {
    mylist = await trpcServer.user.mylist.get();
  } catch (error) {}

  return (
    <div className="flex flex-col gap-4 p-1 mb-4">
      {mylist && <MylistSlider data={mylist} />}
      <MediaSlider title="Trending" data={trending} />
      <MediaSlider title="Popular Movies" data={popularMovies} />
      <MediaSlider title="Top Rated TV Shows" data={topRatedTvShows} />
    </div>
  );
}
