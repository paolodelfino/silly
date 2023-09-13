import MediaSlider from "@/app/_components/MediaSlider";
import MylistSlider from "@/app/_components/MylistSlider";
import { auth, currentUser } from "@/app/_lib/auth";
import { trpcServer } from "@/app/_trpc/serverClient";
import { SelectUser } from "@/db";

export default async function HomePage() {
  const trending = await trpcServer.tmdb.trending();
  const popularMovies = await trpcServer.tmdb.popular.movie();
  const topRatedTvShows = await trpcServer.tmdb.topRated.tvShow();

  let user: SelectUser | undefined;
  const session = await auth();
  if (session?.user.id) user = await currentUser(session?.user.id);

  return (
    <div className="flex flex-col gap-4 p-1 mb-4">
      {user && <MylistSlider user={user} />}
      <MediaSlider title="Trending" data={trending} />
      <MediaSlider title="Popular Movies" data={popularMovies} />
      <MediaSlider title="Top Rated TV Shows" data={topRatedTvShows} />
    </div>
  );
}
