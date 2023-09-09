import MediaSlider from "@/app/_components/MediaSlider";
import { trpcServer } from "@/app/_trpc/serverClient";

export default async function SearchPage({
  params: { query },
}: {
  params: {
    query: string;
  };
}) {
  const searchResult = await trpcServer.search({
    query: decodeURIComponent(query),
  });

  return (
    <div className="flex flex-col gap-4 p-1 mb-4">
      <MediaSlider title="Search Result" data={searchResult} />
    </div>
  );
}
