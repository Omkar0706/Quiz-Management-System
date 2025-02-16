import React, { useEffect, useState } from "react";
import { fetchQuizzes, deleteQuiz } from "../api";
import { useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import "../styles.css"; // Ensure styles are properly applied

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

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

 // ✅ Handle quiz editing
const handleEditQuiz = (quizId) => {
  console.log("Quiz ID to edit:", quizId); // Debugging log
  if (!quizId) {
    console.error("No quiz ID provided for editing.");
    return;
  }

  try {
    navigate(`/edit-quiz/${quizId}`); // Navigate to the Edit Quiz page
  } catch (error) {
    console.error("Failed to navigate for quiz editing", error);
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
           onEdit = {handleEditQuiz}
          />
        ))}
      </div>
    </div>
  );
}
