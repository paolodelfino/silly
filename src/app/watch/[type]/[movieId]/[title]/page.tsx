import MediaWatch from "@/app/_components/MediaWatch";

export default function WatchPage({
  params: { type, movieId, title },
}: {
  params: {
    type: string;
    movieId: string;
    title: string;
  };
}) {
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
