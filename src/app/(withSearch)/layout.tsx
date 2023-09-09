import BackHome from "@/app/_components/BackHome";
import Search from "@/app/_components/Search";

export default function WithSearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="px-9 mt-3 mb-3 flex items-center gap-4">
        <BackHome className="-ml-4" />
        <Search />
      </div>

      {children}
    </>
  );
}
