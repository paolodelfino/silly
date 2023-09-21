"use client";
import MediaGrid from "@/app/_components/MediaGrid";
import { fetchContinueWatching } from "@/server/actions";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function ContinueWatchingDisplay() {
  const session = useSession();

  return (
    <>
      {session.status == "loading" && (
        <center className="pb-4 pt-12">
          <Spinner label="Loading session..." color="warning" />
        </center>
      )}

      {session.data && (
        <MediaGrid
          queryKey={["continue-watching-display"]}
          queryFn={async ({ pageParam = 1 }) =>
            await fetchContinueWatching(session.data.user.id!, pageParam)
          }
          emptyDisplay={<div></div>}
        />
      )}
    </>
  );
}
