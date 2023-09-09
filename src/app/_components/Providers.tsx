"use client";
import TRPCProvider from "@/app/_trpc/Provider";
import { NextUIProvider } from "@nextui-org/react";

function VaulProvider({ children }: { children: React.ReactNode }) {
  return <div vaul-drawer-wrapper="">{children}</div>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <NextUIProvider>
        <VaulProvider>{children}</VaulProvider>
      </NextUIProvider>
    </TRPCProvider>
  );
}
