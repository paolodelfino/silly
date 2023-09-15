import { create } from "zustand";

interface BrowserInfoState {
  isSmallDevice: boolean;
  setIsSmallDevice: (isSmallDevice: boolean) => void;

  userAgent?: UAParser.IResult;
  setUserAgent: (userAgent: UAParser.IResult) => void;
}

export const useBrowserInfo = create<BrowserInfoState>()((set) => ({
  isSmallDevice: false,
  setIsSmallDevice(isSmallDevice) {
    set((state) => ({ ...state, isSmallDevice }));
  },

  setUserAgent(userAgent) {
    set((state) => ({ ...state, userAgent }));
  },
}));
