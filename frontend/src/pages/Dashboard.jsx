import React, { useEffect, useState } from "react";
import { fetchQuizzes, deleteQuiz } from "../api";
import QuizCard from "../components/QuizCard";
import "../styles.css"; // Ensure styles are properly applied

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const loadQuizzes = async () => {
      const data = await fetchQuizzes();
      setQuizzes(data);
    };
    loadQuizzes();
  }, []);

   // ✅ Handle quiz deletion
   const handleDeleteQuiz = async (quizId) => {
    console.log("Quiz ID to delete:", quizId); // Add this log to check
    if (!quizId) {
      console.error("No quiz ID provided for deletion.");
      return;
    }
  
    try {
      await deleteQuiz(quizId); // Call the delete function from your API
      setQuizzes((prevQuizzes) => prevQuizzes.filter(quiz => quiz.id !== quizId)); // Remove quiz from state
    } catch (error) {
      console.error("Failed to delete quiz", error);
    }
  };
  
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Available Quizzes</h2>
      <div className="quiz-grid">
        {quizzes.map((quiz) => (
          <QuizCard 
           key={quiz.id}
           title={quiz.title}
           id={quiz.id} 
           description={quiz.description}
           onDelete={handleDeleteQuiz} // Pass delete function
          />
        ))}
      </div>
    </div>
  );
}
