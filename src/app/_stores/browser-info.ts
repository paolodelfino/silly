import { create } from "zustand";

interface BrowserInfoState {
  isSmallDevice: boolean;
  setIsSmallDevice: (isSmallDevice: boolean) => void;

  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const useBrowserInfo = create<BrowserInfoState>()((set) => ({
  isSmallDevice: false,
  setIsSmallDevice: (isSmallDevice) =>
    set((state) => ({ ...state, isSmallDevice })),

  isMobile: false,
  setIsMobile: (isMobile) => set((state) => ({ ...state, isMobile })),
}));
