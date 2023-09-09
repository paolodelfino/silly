import MediaDisplay from "@/app/_components/MediaDisplay";
import { getMovieDetails } from "@/server/actions";

export default async function DisplayPage({
  params: { id, type },
}: {
  params: {
    id: string;
    type: string;
  };
}) {
  const realId = Number(id);
  if (isNaN(realId)) {
    return "Id is not a number";
  }

  const realType = type == "movie" ? type : type == "tv" ? type : undefined;
  if (!realType) {
    return "Illegal type (must be 'movie' | 'tv')";
  }

  const data = await getMovieDetails(realType, realId);

  return <MediaDisplay data={data} />;
}
