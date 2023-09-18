"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function TopNav() {
  const { data, status } = useSession();

  return (
    <div className="sticky top-0 z-10 flex justify-between border-b border-divider bg-background/90 px-4 py-3 backdrop-blur">
      {status == "loading" && (
        <Skeleton className="h-10 w-10 rounded-full !bg-default-200"></Skeleton>
      )}

      {status == "unauthenticated" && (
        <Button variant="faded" onClick={() => signIn()}>
          Log in
        </Button>
      )}

      {status == "authenticated" && (
        <Dropdown placement="top-end">
          <DropdownTrigger>
            <Avatar
              as={"button"}
              isBordered
              src={data.user?.image ?? undefined}
              showFallback
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="User Actions"
            variant="flat"
            disabledKeys={["settings"]}
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-bold">{data.user?.name}</p>
              <p className="text-tiny text-slate-400">{data.user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}
