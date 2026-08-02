import { create } from "zustand";

export const useGetIdByTopic = create((set) => ({
  topicId: null,
  setTopicId: (topicId) => set({topicId})
}))
