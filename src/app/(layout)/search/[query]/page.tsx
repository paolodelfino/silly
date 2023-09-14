import MediaSlider from "@/app/_components/MediaSlider";
import SearchResult from "@/app/_components/pages/SearchResult";
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

  return (
    <div className="flex flex-col gap-4 p-1 mb-4">
      <SearchResult query={decodedQuery} />
    </div>
  );
}
