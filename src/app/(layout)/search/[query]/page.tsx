import SearchResult from "@/app/_components/pages/SearchResult";
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
    <div className="mb-4 flex flex-col gap-4 p-1">
      <SearchResult query={decodedQuery} />
    </div>
  );
}
