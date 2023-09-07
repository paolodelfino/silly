import { create } from "zustand";

interface MediaWatchState {
  title?: string;
  seasonNumber?: number;
  episodeNumber?: number;
  show: boolean;
  setTitle: (title: string) => void;
  setSeasonNumber: (seasonNumber: number) => void;
  setEpisodeNumber: (episodeNumber: number) => void;
  setShow: (show: boolean) => void;
}

export const useMediaWatch = create<MediaWatchState>()((set) => ({
  show: false,
  setTitle: (title) => set((state) => ({ ...state, title })),
  setSeasonNumber: (seasonNumber) =>
    set((state) => ({ ...state, seasonNumber })),
  setEpisodeNumber: (episodeNumber) =>
    set((state) => ({ ...state, episodeNumber })),
  setShow: (show: boolean) =>
    set((state) => ({
      ...state,
      show,
      title: show ? state.title : undefined,
      seasonNumber: show ? state.seasonNumber : undefined,
      episodeNumber: show ? state.episodeNumber : undefined,
    })),
}));
