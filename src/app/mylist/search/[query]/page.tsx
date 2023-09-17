import MylistSearchResult from "@/app/_components/pages/MylistSearchResult";
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
    title: `Search for ${decodedQuery} in My List | Silly`,
    description: "Search for titles within mylist",
  };
}

export default function MylistSearchPage({ params: { query } }: Props) {
  const decodedQuery = decodeURIComponent(query);

  return <MylistSearchResult query={decodedQuery} />;
}
