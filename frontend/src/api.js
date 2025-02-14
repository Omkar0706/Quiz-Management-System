import axios from "axios";

const API_URL = "http://localhost:5001"; // Backend URL

// Fetch all quizzes
export const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`${API_URL}/quizzes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    return [];
  }
};

// Create a new quiz
export const createQuiz = async (title, description) => {
  try {
    const response = await axios.post(`${API_URL}/quizzes`, { title, description });
    return response.data;
  } catch (error) {
    console.error("Error creating quiz:", error);
    return null;
  }
};

// Delete a quiz
export const deleteQuiz = async (quizId) => {
  if (!quizId) {
    throw new Error("No quiz ID provided");
  }

  try {
    const response = await fetch(`http://localhost:5001/quizzes/${quizId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete quiz');
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};


