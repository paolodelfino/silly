import DocumentTitle from "@/app/_components/DocumentTitle";
import MediaSlider from "@/app/_components/MediaSlider";
import { trpcServer } from "@/app/_trpc/serverClient";

export default async function SearchPage({
  params: { query },
}: {
  params: {
    query: string;
  };
}) {
  const decodedQuery = decodeURIComponent(query);
  const searchResult = await trpcServer.search({
    query: decodedQuery,
  });

  return (
    <>
      <DocumentTitle title={`Search for ${decodedQuery} | Silly`} />

      <div className="flex flex-col gap-4 p-1 mb-4">
        <MediaSlider title="Search Result" data={searchResult} />
      </div>
    </>
  );
}
