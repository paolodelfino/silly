"use client";
import MediaSlider from "@/app/_components/MediaSlider";
import { SelectUser } from "@/db";
import { fetchMylist } from "@/server/actions";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function MylistSlider({ user }: { user: SelectUser }) {
  const mylist = useQuery({
    queryKey: ["mylist"],
    queryFn: async () =>
      /* TODO: caching problem due to Next.js caching */ await fetchMylist(
        user,
        1
      ),
  });

  if (mylist.isLoading) {
    return <Spinner />;
  }

  if (!mylist.data) {
    return null;
  }

  return <MediaSlider title="Mylist" seeAll="/mylist" data={mylist.data} />;
}
