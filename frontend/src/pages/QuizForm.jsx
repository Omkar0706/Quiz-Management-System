import React, { useState, useEffect } from "react";
import { fetchQuizzes, createQuiz, updateQuiz, getQuizById } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "../styles.css";


export default function QuizForm({ isEditMode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      type: "multiple_choice",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      answer: "",
    },
  ]);

  const navigate = useNavigate();
  const { quizId } = useParams();

  // Load Quiz Data in Edit Mode
  useEffect(() => {
    async function fetchQuizData() {
      if (isEditMode && quizId) {
        try {
          const quiz = await getQuizById(quizId);
          if (quiz) {
            setTitle(quiz.title);
            setDescription(quiz.description);
            setQuestions(quiz.questions || []);
          }
        } catch (error) {
          console.error("Error fetching quiz:", error);
        }
      }
    }
    fetchQuizData();
  }, [isEditMode, quizId]);

  // Handle Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (isEditMode) {
      await updateQuiz(quizId, title, description, questions);
    } else {
      await createQuiz(title, description, questions);
    }
    navigate("/"); // ✅ Redirect to Dashboard after saving
  } catch (error) {
    console.error("Error saving quiz:", error);
  }
};


  // Remove a Question
  const removeQuestion = (qIndex) => {
    setQuestions((prev) => prev.filter((_, index) => index !== qIndex));
  };

  // Handle Cancel
  const handleCancel = () => {
    navigate("/");
  };

  // Handle Option Selection (Multiple Choice)
  const handleOptionChange = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.forEach((opt, i) => (opt.isCorrect = i === oIndex));
    setQuestions(newQuestions);
  };

  // Handle Text Change (For Question and Options)
  const handleTextChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setQuestions(newQuestions);
  };

  // Handle Question Type Change
  const handleQuestionTypeChange = (qIndex, type) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].type = type;

    if (type === "multiple_choice") {
      newQuestions[qIndex].options = [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ];
    } else {
      newQuestions[qIndex].options = [];
    }

    setQuestions(newQuestions);
  };

  // Add New Question
  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        type: "multiple_choice",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        answer: "",
      },
    ]);
  };

  return (
    <div className="quiz-form">
      <h2>{isEditMode ? "Edit Quiz" : "Create a Quiz"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

        {/* Questions Section */}
        <div className="questions-container">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="question-box">
              <h3>{isEditMode ? `Edit Question ${qIndex + 1}` : `Question ${qIndex + 1}`}</h3>
              <button type="button" onClick={() => removeQuestion(qIndex)} className="remove-button">
                ❌ Remove
              </button>

              <input
                type="text"
                placeholder="Enter question"
                value={question.questionText}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].questionText = e.target.value;
                  setQuestions(newQuestions);
                }}
                required
              />

              <select
                value={question.type}
                onChange={(e) => handleQuestionTypeChange(qIndex, e.target.value)}
                className="input-field select-field"
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="true_false">True/False</option>
                <option value="short_answer">Short Answer</option>
              </select>

              {question.type === "multiple_choice" && (
                <div className="options-container">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="option-item">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        checked={option.isCorrect}
                        onChange={() => handleOptionChange(qIndex, oIndex)}
                      />
                      <input
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        value={option.text}
                        onChange={(e) => handleTextChange(qIndex, oIndex, e.target.value)}
                        className="input-field option-input"
                      />
                    </div>
                  ))}
                </div>
              )}

              {question.type === "true_false" && (
                <div className="true-false-container">
                  <label className="true-false-option">
                    <input
                      type="radio"
                      name={`truefalse-${qIndex}`}
                      checked={question.answer === "true"}
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[qIndex].answer = "true";
                        setQuestions(newQuestions);
                      }}
                    />
                    True
                  </label>
                  <label className="true-false-option">
                    <input
                      type="radio"
                      name={`truefalse-${qIndex}`}
                      checked={question.answer === "false"}
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[qIndex].answer = "false";
                        setQuestions(newQuestions);
                      }}
                    />
                    False
                  </label>
                </div>
              )}

              {question.type === "short_answer" && (
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={question.answer}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].answer = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  required
                />
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="buttons-container">
          <button type="button" className="add-question-button" onClick={handleAddQuestion}>
            ➕ Add Question
          </button>
          <button type="submit" className="save-quiz-button">
            {isEditMode ? "💾 Save Changes" : "💾 Save Quiz"}
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
