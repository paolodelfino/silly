"use client";
import MediaSlider from "@/app/_components/MediaSlider";
import { fetchMylist } from "@/server/actions";
import { Skeleton, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function MylistSlider({ userId }: { userId: string }) {
  const mylist = useQuery({
    queryKey: ["mylist"],
    queryFn: async () => await fetchMylist(userId, 1),
  });

  if (mylist.isLoading) {
    return (
      <div className="gap-1 flex flex-col">
        <div className="flex justify-between px-1 h-10">
          <Skeleton className="w-[50px] rounded-large" />
          <Skeleton className="w-[80px] rounded-large" />
        </div>

        <Skeleton className="h-[180px] ml-2 mr-1 rounded-large" />
      </div>
    );
  }

  if (!mylist.data || mylist.data.total_results == 0) {
    return null;
  }

  return <MediaSlider title="Mylist" seeAll="/mylist" data={mylist.data} />;
}
