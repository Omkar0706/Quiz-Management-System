import { create } from "zustand";

const useQuizStore = create((set) => ({
  quizzes: [],

  // Fetch quizzes from backend
  fetchQuizzes: async () => {
    try {
      const response = await fetch("http://localhost:5001/quizzes");
      if (!response.ok) throw new Error("Failed to fetch quizzes");
      const data = await response.json();
      set({ quizzes: data });
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  },

  // Create a new quiz (Now includes questions)
  addQuiz: async (quiz) => {
    try {
      const response = await fetch("http://localhost:5001/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      });
      if (!response.ok) throw new Error("Failed to add quiz");
      const newQuiz = await response.json();
      set((state) => ({ quizzes: [...state.quizzes, newQuiz] }));
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  },
}));

export default useQuizStore;
