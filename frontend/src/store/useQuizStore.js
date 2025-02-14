import { create } from "zustand";

const useQuizStore = create((set) => ({
  quizzes: [],
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
}));

export default useQuizStore;
