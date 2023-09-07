import { create } from "zustand";

interface MobileDetectorState {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

export const useMobileDetector = create<MobileDetectorState>()((set) => ({
  isMobile: false,
  setIsMobile: (isMobile) => set((state) => ({ ...state, isMobile })),
}));
