import ContinueWatchingSlider from "@/app/_components/ContinueWatchingSlider";
import MylistSlider from "@/app/_components/MylistSlider";
import HomeSliders from "@/app/_components/pages/HomeSliders";
import { auth } from "@/app/_lib/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="mb-4 flex flex-col gap-4 p-1">
      {session?.user.id && (
        <>
          <ContinueWatchingSlider userId={session.user.id} />
          <MylistSlider userId={session.user.id} />
        </>
      )}
      <HomeSliders />
    </div>
  );
}
