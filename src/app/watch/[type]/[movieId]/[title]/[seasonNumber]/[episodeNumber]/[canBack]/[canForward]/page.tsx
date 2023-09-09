import MediaWatch from "@/app/_components/MediaWatch";

export default function WatchPage({
  params: {
    type,
    movieId,
    title,
    seasonNumber,
    episodeNumber,
    canBack,
    canForward,
  },
}: {
  params: {
    type: string;
    movieId: string;
    title: string;
    seasonNumber: string;
    episodeNumber: string;
    canBack: string;
    canForward: string;
  };
}) {
  const realType = type == "movie" ? type : type == "tv" ? type : undefined;
  if (!realType) {
    return "Illegal type (must be 'movie' | 'tv')";
  } else if (realType == "movie") {
    return "Type is movie but tv's parameters are provided";
  }

  const realMovieId = Number(movieId);
  if (isNaN(realMovieId)) {
    return "Movie id must be a number";
  }

  const realSeasonNumber = Number(seasonNumber);
  if (isNaN(realSeasonNumber)) {
    return "Season number is not a number";
  }

  const realEpisodeNumber = Number(episodeNumber);
  if (isNaN(realEpisodeNumber)) {
    return "Episode number is not a number";
  }

  const realCanBack =
    canBack == "false"
      ? false
      : canBack == "true"
      ? true
      : canBack == "bySeason"
      ? canBack
      : undefined;
  if (realCanBack == undefined) {
    return "Illegal canBack (must be boolean | 'bySeason')";
  }

  const realCanForward =
    canForward == "false"
      ? false
      : canForward == "true"
      ? true
      : canForward == "bySeason"
      ? canForward
      : undefined;
  if (realCanForward == undefined) {
    return "Illegal canForward (must be boolean | 'bySeason')";
  }

  return (
    <MediaWatch
      type={realType}
      movieId={realMovieId}
      title={decodeURIComponent(title)}
      seasonNumber={realSeasonNumber}
      episodeNumber={realEpisodeNumber}
      canBack={realCanBack}
      canForward={realCanForward}
    />
  );
}
