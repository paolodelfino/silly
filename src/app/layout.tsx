import BrowserInfo from "@/app/_components/BrowserInfo";
import { Providers } from "@/app/_components/Providers";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="antialiased">
        <Providers>
          {children}
          <BrowserInfo />
        </Providers>
      </body>
    </html>
  );
}
