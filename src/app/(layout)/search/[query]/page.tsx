import MediaSlider from "@/app/_components/MediaSlider";
import { trpcServer } from "@/app/_trpc/serverClient";
import { Metadata } from "next";

type Props = {
  params: {
    query: string;
  };
};

export async function generateMetadata({
  params: { query },
}: Props): Promise<Metadata> {
  const decodedQuery = decodeURIComponent(query);

  return {
    title: `Search for ${decodedQuery} | Silly`,
    description: "Search for titles, people",
  };
}

export default async function SearchPage({ params: { query } }: Props) {
  const decodedQuery = decodeURIComponent(query);
  const searchResult = await trpcServer.search({
    query: decodedQuery,
  });

  return (
    <div className="flex flex-col gap-4 p-1 mb-4">
      <MediaSlider title="Search Result" data={searchResult} />
    </div>
  );
}
