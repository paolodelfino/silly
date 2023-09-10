"use client";
import TRPCProvider from "@/app/_trpc/Provider";
import { NextUIProvider } from "@nextui-org/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

function VaulProvider({ children }: { children: React.ReactNode }) {
  return <div vaul-drawer-wrapper="">{children}</div>;
}

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
        <NextUIProvider>
          <VaulProvider>{children}</VaulProvider>
        </NextUIProvider>
      </TRPCProvider>
    </SessionProvider>
  );
}
