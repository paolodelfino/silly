import BackHome from "@/app/_components/BackHome";
import BottomNav from "@/app/_components/BottomNav";
import Search from "@/app/_components/Search";

export default function WithSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="px-9 pt-3 pb-3 flex items-center gap-4">
        <BackHome className="-ml-4" />
        <Search />
      </div>

      {children}

      <BottomNav />
    </div>
  );
}
