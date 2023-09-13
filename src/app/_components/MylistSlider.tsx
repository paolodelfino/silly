"use client";
import MediaSlider from "@/app/_components/MediaSlider";
import { fetchMylist } from "@/server/actions";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function MylistSlider({ userId }: { userId: string }) {
  const mylist = useQuery({
    queryKey: ["mylist"],
    queryFn: async () => await fetchMylist(userId, 1),
  });

  if (mylist.isLoading) {
    return <Spinner />;
  }

  if (!mylist.data || mylist.data.total_results == 0) {
    return null;
  }

  return <MediaSlider title="Mylist" seeAll="/mylist" data={mylist.data} />;
}
