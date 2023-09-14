import MediaDisplay from "@/app/_components/pages/MediaDisplay";
import { getMovieDetails } from "@/server/actions";
import { Metadata } from "next";

type Props = {
  params: {
    type: string;
    id: string;
  };
};

export async function generateMetadata({
  params: { id, type },
}: Props): Promise<Metadata> {
  const realType = type == "movie" ? type : type == "tv" ? type : undefined;
  const realId = Number(id);

  if (!realType || isNaN(realId)) {
    return {};
  }

  const data = await getMovieDetails(realType, realId);

  return {
    title: `${"title" in data ? data.title : data.name} | Silly`,
    description: data.overview,
  };
}

export default async function DisplayPage({ params: { type, id } }: Props) {
  const realType = type == "movie" ? type : type == "tv" ? type : undefined;
  if (!realType) {
    return "Illegal type (must be 'movie' | 'tv')";
  }

  const realId = Number(id);
  if (isNaN(realId)) {
    return "Id is not a number";
  }

  const data = await getMovieDetails(realType, realId);

  return <MediaDisplay data={data} />;
}
