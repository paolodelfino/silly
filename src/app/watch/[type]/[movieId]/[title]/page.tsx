import MediaWatch from "@/app/_components/pages/MediaWatch";
import { getMovieDetails } from "@/server/actions";
import { Metadata } from "next";

type Props = {
  params: {
    type: string;
    movieId: string;
    title: string;
  };
};

export async function generateMetadata({
  params: { type, movieId, title },
}: Props): Promise<Metadata> {
  const realType = type == "movie" ? type : type == "tv" ? type : undefined;
  const realMovieId = Number(movieId);

  if (!realType || realType == "tv" || isNaN(realMovieId)) {
    return {};
  }

  const data = await getMovieDetails(realType, realMovieId);

  return {
    title: `Watch ${decodeURIComponent(title)} | Silly`,
    description: data.overview,
  };
}

export default function WatchPage({ params: { type, movieId, title } }: Props) {
  const realType = type == "movie" ? type : type == "tv" ? type : undefined;
  if (!realType) {
    return "Illegal type (must be 'movie' | 'tv')";
  } else if (realType == "tv") {
    return "Type is tv but tv's parameters are missing";
  }

  const realMovieId = Number(movieId);
  if (isNaN(realMovieId)) {
    return "Movie id must be a number";
  }

  return (
    <MediaWatch
      type={realType}
      movieId={realMovieId}
      title={decodeURIComponent(title)}
    />
  );
}
