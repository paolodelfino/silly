"use client";
import MediaSlider, {
  MediaSliderSkeleton,
} from "@/app/_components/MediaSlider";
import { trpc } from "@/app/_trpc/client";
import { fetchMylist } from "@/server/actions";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

export default function MylistSlider({ userId }: { userId: string }) {
  const mylist = useQuery({
    queryKey: ["mylist", userId],
    queryFn: async () => await fetchMylist(userId, 1),
  });

  if (mylist.isLoading) {
    return <MediaSliderSkeleton titleWidth={50} seeAll />;
  }

  if (!mylist.data || mylist.data.total_results == 0) {
    return null;
  }

  return (
    <MediaSlider
      title="My List"
      seeAll="/mylist"
      data={mylist.data}
      externActions
      actions={({ entry, type }) => {
        if (type == "person") return null;

        const removeBookmark = trpc.user.mylist.remove.useMutation({
          onSettled(data, error, variables, context) {
            mylist.refetch();
          },
        });

        return (
          <Button
            size="sm"
            startContent={
              !removeBookmark.isLoading && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                  fill="currentColor"
                >
                  <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
                </svg>
              )
            }
            variant="faded"
            fullWidth
            radius="none"
            className="absolute bottom-0 left-0 z-20 h-9 rounded-b-medium !outline-none data-[focus-visible=true]:border-focus data-[loading=true]:opacity-80"
            onPress={() => {
              removeBookmark.mutate({
                type,
                id: entry.id,
              });
            }}
            isLoading={removeBookmark.isLoading}
          >
            Remove
          </Button>
        );
      }}
    />
  );
}
