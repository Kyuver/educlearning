import { create } from "zustand";

export const useSetData = create((set) => ({
  data: {},
  setData: (data) => set({ data })
}))
