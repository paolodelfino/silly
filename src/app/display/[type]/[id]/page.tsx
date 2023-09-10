import DocumentTitle from "@/app/_components/DocumentTitle";
import MediaDisplay from "@/app/_components/MediaDisplay";
import { getMovieDetails } from "@/server/actions";

export default async function DisplayPage({
  params: { type, id },
}: {
  params: {
    type: string;
    id: string;
  };
}) {
  const realType = type == "movie" ? type : type == "tv" ? type : undefined;
  if (!realType) {
    return "Illegal type (must be 'movie' | 'tv')";
  }

  const realId = Number(id);
  if (isNaN(realId)) {
    return "Id is not a number";
  }

  const data = await getMovieDetails(realType, realId);

  return (
    <>
      <DocumentTitle
        title={`${"title" in data ? data.title : data.name} | Silly`}
      />

      <MediaDisplay data={data} />
    </>
  );
}
