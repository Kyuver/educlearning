import { create } from 'zustand';

export const useSetData = create((set) => ({
  data: {},
  setData: (data) => set((state) => ({ data: { ...state.data, ...data } })),
  clearData: () => set({ data: {} }),
}));
