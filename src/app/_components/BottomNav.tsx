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
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const { data, status } = useSession();

  return (
    <div className="sticky bottom-0 z-10 mt-auto flex justify-between rounded-t-3xl bg-default-100 p-5">
      <Button
        as={Link}
        href="/"
        color={pathname == "/" ? "danger" : "default"}
        variant={pathname == "/" ? "shadow" : "light"}
        radius="full"
        isIconOnly={pathname != "/"}
        startContent={
          pathname == "/" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="pointer-events-none"
            >
              <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path>
            </svg>
          ) : null
        }
      >
        {pathname == "/" ? (
          "Home"
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path>
          </svg>
        )}
      </Button>

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
