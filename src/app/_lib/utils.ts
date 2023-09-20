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
  episodeIndex: number,
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

export function formulateSearchInPage<
  T extends {
    title: string;
  },
>(array: T[], query: string, page: number = 1, elPerPage: number = 20) {
  const queryLowercase = query.toLowerCase();
  const allResults = array.filter((entry) => {
    const titleLowercase = entry.title.toLowerCase();
    return (
      titleLowercase.includes(queryLowercase) ||
      queryLowercase.includes(titleLowercase)
    );
  });

  const pageResults = allResults.slice(
    (page - 1) * elPerPage,
    page * elPerPage,
  );

  return {
    page,
    results: pageResults,
    total_pages: Math.ceil(allResults.length / elPerPage),
    total_results: allResults.length,
  };
}

export function isTrash(popularity: number, voteCount?: number) {
  return (voteCount && voteCount < 5) || popularity < 5;
}
