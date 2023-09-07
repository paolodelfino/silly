import { create } from "zustand";

interface MediaWatchState {
  title?: string;
  show: boolean;
  setTitle: (title: string) => void;
  setShow: (show: boolean) => void;
}

export const useMediaWatch = create<MediaWatchState>()((set) => ({
  title: undefined,
  type: undefined,
  show: false,
  setTitle: (title) => set((state) => ({ ...state, title })),
  setShow: (show: boolean) =>
    set((state) => ({
      ...state,
      show,
      title: show ? state.title : undefined,
    })),
}));
