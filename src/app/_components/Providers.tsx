"use client";
import TRPCProvider from "@/app/_trpc/Provider";
import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionProvider session={session}>
      <TRPCProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </TRPCProvider>
    </SessionProvider>
  );
}
