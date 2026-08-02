import { create } from 'zustand'

export const useView = create((set) => ({
  view: "dashboard",
  setView: (view) => set({ view }),
}));