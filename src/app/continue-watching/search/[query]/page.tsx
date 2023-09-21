import ContinueWatchingSearchResult from "@/app/_components/pages/ContinueWatchingSearchResult";
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
    title: `Search for ${decodedQuery} in Continue Watching | Silly`,
    description: "Search for titles within continue watching list",
  };
}

export default function ContinueWatchingSearchPage({
  params: { query },
}: Props) {
  const decodedQuery = decodeURIComponent(query);

  return <ContinueWatchingSearchResult query={decodedQuery} />;
}
