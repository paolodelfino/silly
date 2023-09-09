import MediaWatch from "@/app/_components/MediaWatch";

export default function WatchPage({
  params: { title, seasonNumber, episodeNumber, canBack, canForward, movieId },
}: {
  params: {
    title: string;
    seasonNumber: string;
    episodeNumber: string;
    canBack: string;
    canForward: string;
    movieId: string;
  };
}) {
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

  const realMovieId = Number(movieId);
  if (isNaN(realMovieId)) {
    return "Movie id must be a number";
  }

  return (
    <MediaWatch
      title={decodeURIComponent(title)}
      seasonNumber={realSeasonNumber}
      episodeNumber={realEpisodeNumber}
      canBack={realCanBack}
      canForward={realCanForward}
      movieId={realMovieId}
    />
  );
}
