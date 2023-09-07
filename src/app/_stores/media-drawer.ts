import { create } from "zustand";

interface MediaDrawerState {
  id?: number;
  type?: "movie" | "tv";
  show: boolean;
  setId: (id: number) => void;
  setType: (type: "movie" | "tv") => void;
  setShow: (show: boolean) => void;
}

export const useMediaDrawer = create<MediaDrawerState>()((set) => ({
  id: undefined,
  type: undefined,
  show: false,
  setId: (id) => set((state) => ({ ...state, id })),
  setType: (type) => set((state) => ({ ...state, type })),
  setShow: (show: boolean) =>
    set((state) => ({
      ...state,
      show,
      id: show ? state.id : undefined,
      type: show ? state.type : undefined,
    })),
}));
