"use client";
import BackHome from "@/app/_components/BackHome";
import MylistGrid from "@/app/_components/MylistGrid";
import { getMylistCount } from "@/server/actions";
import { Badge, Spinner, button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MylistDisplay() {
  const session = useSession();

  const [elementsCount, setElementsCount] = useState<number | undefined>();
  useEffect(() => {
    getMylistCount().then((count) => setElementsCount(count));
  }, []);

  return (
    <div>
      <div className="flex justify-between px-4 py-4 bg-background/90 z-20 backdrop-blur items-center border-b border-divider sticky top-0">
        <BackHome
          className="p-0"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
            </svg>
          }
          buttonProps={button({
            variant: "light",
            isIconOnly: true,
            radius: "full",
          })}
        />

        <div className="absolute left-1/2 -translate-x-1/2">
          <Badge content={elementsCount} isDot>
            <h1 className="text-large font-semibold">My List</h1>
          </Badge>
        </div>
      </div>

      {session.status == "loading" && (
        <center className="pt-12 pb-4">
          <Spinner label="Loading session..." color="warning" />
        </center>
      )}

      {session.data && <MylistGrid userId={session.data.user.id!} />}
    </div>
  );
}
