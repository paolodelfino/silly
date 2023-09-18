"use client";
import BackHome from "@/app/_components/BackHome";
import Search from "@/app/_components/Search";
import { getMylistCount } from "@/server/actions";
import { useWindowScroll } from "@mantine/hooks";
import { Badge, Button, Skeleton, button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ReactNode } from "react";

export default function MylistLayoutPage({
  children,
}: {
  children?: ReactNode;
}) {
  const [{ y }] = useWindowScroll();

  const elementsCount = useQuery({
    queryKey: ["mylist-elements-count"],
    queryFn: async () => await getMylistCount(),
  });

  return (
    <div>
      <div
        className="sticky top-0 z-20 flex items-center justify-between bg-background/90 px-4 py-4 backdrop-blur"
        style={{
          borderBottomWidth:
            y > 0 || elementsCount.data == 0 || elementsCount.isLoading
              ? "1px"
              : undefined,
          borderColor:
            y > 0 || elementsCount.data == 0 || elementsCount.isLoading
              ? "hsl(var(--nextui-divider) / var(--nextui-divider-opacity, var(--tw-border-opacity)))"
              : undefined,
        }}
      >
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
          {elementsCount.isLoading ? (
            <div className="relative">
              <h1 className="text-large font-semibold">My List</h1>
              <Skeleton className="absolute right-[5%] top-[5%] h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full" />
            </div>
          ) : (
            <Badge content={elementsCount.data} size="lg">
              <h1 className="text-large font-semibold">My List</h1>
            </Badge>
          )}
        </div>
      </div>

      {(elementsCount.data ?? -1) > 0 && (
        <div className="border-b border-divider px-4 pb-4 pt-1">
          <Search
            path="/mylist/search"
            placeholder="Search for titles"
            callback="/mylist"
          />
        </div>
      )}

      {elementsCount.data == 0 && (
        <div className="mx-auto max-w-3xl p-4">
          <Search placeholder="Search for titles" />
          <div
            className="relative my-4 h-divider w-full bg-divider"
            role="separator"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3">
              or
            </span>
          </div>
          <Button as={Link} href="/" fullWidth>
            Browse
          </Button>
        </div>
      )}

      {(elementsCount.data ?? -1) > 0 && children}
    </div>
  );
}
