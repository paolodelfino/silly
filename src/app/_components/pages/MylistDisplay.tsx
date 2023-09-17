"use client";
import MediaGrid from "@/app/_components/MediaGrid";
import { fetchMylist } from "@/server/actions";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function MylistDisplay() {
  const session = useSession();

  return (
    <>
      {session.status == "loading" && (
        <center className="pt-12 pb-4">
          <Spinner label="Loading session..." color="warning" />
        </center>
      )}

      {session.data && (
        <MediaGrid
          queryKey={["mylist-display"]}
          queryFn={async ({ pageParam = 1 }) =>
            await fetchMylist(session.data.user.id!, pageParam)
          }
          emptyDisplay={<div></div>}
        />
      )}
    </>
  );
}
