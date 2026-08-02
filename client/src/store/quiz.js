import { create } from 'zustand';

export const useQuiz = create((set) => ({
  currentQuiz: null,
  answers: {},
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz, answers: {} }),
  setAnswer: (questionId, choiceIndex) =>
    set((state) => ({ answers: { ...state.answers, [questionId]: choiceIndex } })),
  resetQuiz: () => set({ currentQuiz: null, answers: {} }),
}));
