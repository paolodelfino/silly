import BackHome from "@/app/_components/BackHome";
import BottomNav from "@/app/_components/BottomNav";
import Search from "@/app/_components/Search";

export default function WithSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center gap-4 px-9 pb-3 pt-3">
        <BackHome className="-ml-4" />
        <Search />
      </div>

      {children}

      <BottomNav />
    </div>
  );
}
