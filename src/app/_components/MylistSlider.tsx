"use client";
import MediaSlider, {
  MediaSliderSkeleton,
} from "@/app/_components/MediaSlider";
import { fetchMylist } from "@/server/actions";
import { useQuery } from "@tanstack/react-query";

export default function MylistSlider({ userId }: { userId: string }) {
  const mylist = useQuery({
    queryKey: ["mylist"],
    queryFn: async () => await fetchMylist(userId, 1),
  });

  if (mylist.isLoading) {
    return <MediaSliderSkeleton titleWidth={50} seeAll />;
  }

  if (!mylist.data || mylist.data.total_results == 0) {
    return null;
  }

  return <MediaSlider title="My List" seeAll="/mylist" data={mylist.data} />;
}
