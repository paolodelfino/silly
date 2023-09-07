import MediaDrawer from "@/app/_components/MediaDrawer";
import Provider from "@/app/_trpc/Provider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import MediaWatch from "./_components/MediaWatch";
import "./globals.css";
import MobileDetector from "@/app/_components/MobileDetector";

export const metadata: Metadata = {
  title: "Silly - Watch Movies and TV Shows",
  description: "Watch Movies and TV Shows",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Theme appearance="dark">
          <Provider>
            <div vaul-drawer-wrapper="">
              {children}
              <MediaDrawer />
            </div>
            <MediaWatch />
            <MobileDetector />
          </Provider>
        </Theme>
      </body>
    </html>
  );
}
