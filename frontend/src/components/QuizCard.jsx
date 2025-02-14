import React from "react";
import { Link } from "react-router-dom";
import "../styles.css"; // Ensure this is included

export default function QuizCard({ title, description, onDelete, id }) {
  return (
    <div className="quiz-card">
      <h3 className="quiz-title">{title}</h3>
      <p className="quiz-description">{description}</p>
      <Link to={`/quiz/${title}`} className="quiz-start-button">
        Start Quiz
      </Link>
      <div className="quiz-actions">
        <button className="delete-button" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
}