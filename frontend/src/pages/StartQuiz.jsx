import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles.css"; // Ensure styles are applied

const staticQuestions = [
  {
    questionText: "What is the capital of France?",
    type: "multiple_choice",
    options: [
      { text: "Berlin", isCorrect: false },
      { text: "Madrid", isCorrect: false },
      { text: "Paris", isCorrect: true },
      { text: "Rome", isCorrect: false },
    ],
  },
  {
    questionText: "Which planet is known as the Red Planet?",
    type: "multiple_choice",
    options: [
      { text: "Earth", isCorrect: false },
      { text: "Mars", isCorrect: true },
      { text: "Jupiter", isCorrect: false },
      { text: "Saturn", isCorrect: false },
    ],
  },
];

export default function StartQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = staticQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (selectedOption === null) {
      alert("Please select an option before proceeding.");
      return;
    }

    if (currentQuestion.options[selectedOption].isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < staticQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="quiz-container">
      <h2>Quiz {quizId}</h2>
      
      {isFinished ? (
        <div className="result">
          <h3>Quiz Completed!</h3>
          <p>Your Score: {score} / {staticQuestions.length}</p>
          <button onClick={handleRestart}>Restart Quiz</button>
          <button onClick={() => navigate("/")}>Go to Dashboard</button>
        </div>
      ) : (
        <div className="question-box">
          <h3>{currentQuestion.questionText}</h3>

          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <label key={index} className="option-label">
                <input
                  type="radio"
                  name="option"
                  checked={selectedOption === index}
                  onChange={() => setSelectedOption(index)}
                />
                {option.text}
              </label>
            ))}
          </div>

          <button onClick={handleNext}>
            {currentQuestionIndex + 1 === staticQuestions.length ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
