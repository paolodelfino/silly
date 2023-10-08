import BrowserInfo from "@/app/_components/BrowserInfo";
import { Providers } from "@/app/_components/Providers";
import ScrollToTop from "@/app/_components/ScrollToTop";
import type { Metadata } from "next";
import { Session } from "next-auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silly - Watch Movies and TV Shows",
  description: "Watch Movies and TV Shows",
  viewport: {
    initialScale: 1,
    maximumScale: 1,
    width: "device-width",
  },
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased">
        <Providers session={session}>
          <ScrollToTop />
          {children}
          <BrowserInfo />
        </Providers>
      </body>
    </html>
  );
}
