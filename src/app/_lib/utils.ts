import {
  TmdbDetailsSeasonOutput,
  TmdbDetailsTvShowOutput,
} from "@/app/_trpc/types";

export const domain = () =>
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : "https://sillymovie.vercel.app";

export function calcCanBackForward(
  seasons: TmdbDetailsTvShowOutput["seasons"],
  currentSeason: TmdbDetailsSeasonOutput,
  episodeIndex: number
): [boolean | "bySeason", boolean | "bySeason"] {
  let seasonIndex = -1;
  for (const season of seasons) {
    seasonIndex++;
    if (season.season_number == currentSeason.season_number) break;
  }

  const canBack =
    episodeIndex > 0 ? true : seasonIndex > 0 ? "bySeason" : false;

  const canForward =
    episodeIndex < currentSeason.episodes.length - 1
      ? true
      : seasonIndex < seasons.length - 1
      ? "bySeason"
      : false;

  return [canBack, canForward];
}
