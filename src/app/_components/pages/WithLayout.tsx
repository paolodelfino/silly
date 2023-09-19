import BackHome from "@/app/_components/BackHome";
import Search from "@/app/_components/Search";
import TopNav from "@/app/_components/TopNav";
import { ReactNode } from "react";

export default function WithLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />

      <div className="flex items-center gap-4 px-9 pb-3 pt-3">
        <BackHome className="-ml-4" />
        <Search />
      </div>

      {children}
    </div>
  );
}
