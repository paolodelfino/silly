"use client";
import { useHotkeys } from "@mantine/hooks";
import { Button, button, cn } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function BackHome({
  className,
  icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
    </svg>
  ),
  buttonProps,
}: {
  className?: string;
  icon?: ReactNode;
  buttonProps?: ReturnType<typeof button>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  useHotkeys([["shift+escape", () => router.push("/")]]);

  return (
    <Button
      as={Link}
      href="/"
      size="sm"
      isIconOnly
      radius="full"
      className={cn(
        "p-1.5 !opacity-80",
        className,
        buttonProps,
        pathname == "/" && "hidden",
      )}
      aria-label="Back"
    >
      {icon}
    </Button>
  );
}
