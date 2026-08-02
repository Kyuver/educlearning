import { create } from 'zustand'

export const useSection = create((set) => ({
  section: "approved",
  setSection: (section) => set({ section }),
}));