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
  addQuiz: async (title, description, questions) => {
    try {
      const newQuiz = await createQuiz(title, description, questions);
      set((state) => ({ quizzes: [...state.quizzes, newQuiz] }));
    } catch (error) {
      console.error("Error adding quiz:", error);
    }
  },
}));

// src/api.js
export async function login(username, password) {
  const response = await fetch("http://localhost:5001/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

export async function fetchQuizzes() {
  try {
    const response = await fetch("http://localhost:5001/quizzes");
    if (!response.ok) throw new Error("Failed to fetch quizzes");
    return await response.json();
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    throw error;
  }
}

export async function createQuiz(title, description, questions) {
  try {
    const response = await fetch("http://localhost:5001/quizzes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, questions }),
    });

    if (!response.ok) {
      throw new Error("Failed to create quiz");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
}

export async function getQuizById(id) {
  try {
    const response = await fetch(`http://localhost:5001/quizzes/${id}`);
    if (!response.ok) throw new Error("Quiz not found");

    const quiz = await response.json();
    
    // Ensure all questions have an options array
    if (quiz.questions) {
      quiz.questions.forEach((q) => {
        if (!q.options) q.options = [];
      });
    }

    return quiz;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
}

export async function updateQuiz(quizId, title, description, questions) {
  try {
    const response = await fetch(`http://localhost:5001/quizzes/${quizId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, questions }),
    });

    const responseData = await response.json(); // ✅ Read response

    if (!response.ok) {
      console.error("❌ Update Quiz Error:", responseData); // ✅ Log error details
      throw new Error(responseData.error || "Failed to update quiz");
    }

    console.log("✅ Quiz Updated Successfully:", responseData); // ✅ Log success
    return responseData;
  } catch (error) {
    console.error("❌ Error updating quiz:", error);
    throw error;
  }
}



export async function deleteQuiz(quizId) {
  try {
    const response = await fetch(`http://localhost:5001/quizzes/${quizId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete quiz");
    return await response.json();
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
}
