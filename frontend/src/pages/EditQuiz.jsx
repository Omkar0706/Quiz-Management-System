import React, { useState } from "react";
import { PlusCircle, X, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../styles.css"; 

export default function CreateQuiz() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    questions: [
      {
        questionText: "",
        type: "multiple_choice",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ],
  });

  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  // ✅ Function to Navigate Back to Dashboard
  const handleBackToDashboard = () => {
    navigate("/"); // ✅ Redirect to Dashboard
  };

  // ✅ Function to Remove a Question
  const removeQuestion = (qIndex) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== qIndex),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: "loading", message: "Creating quiz..." });

    try {
      const response = await fetch("http://localhost:5001/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      if (response.ok) {
        setSubmitStatus({ type: "success", message: "Quiz created successfully!" });
        setTimeout(() => {
          navigate("/"); // ✅ Redirect to Dashboard after success
        }, 1500);
      } else {
        throw new Error("Failed to create quiz");
      }
    } catch (error) {
      setSubmitStatus({ type: "error", message: "Failed to create quiz. Please try again." });
    }
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          questionText: "",
          type: "multiple_choice",
          options: [
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
            { text: "", isCorrect: false },
          ],
        },
      ],
    }));
  };

  return (
    <div className="create-quiz-container">
      <div className="quiz-header">
        {/* ✅ Fix: Make Back to Dashboard Button Work */}
        <button onClick={handleBackToDashboard} className="back-button">
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
        <h1>Create New Quiz</h1>
      </div>

      {submitStatus.message && (
        <div className={`status-message ${submitStatus.type}`}>
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="quiz-form">
        <input
          type="text"
          placeholder="Quiz Title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="input-field"
          required
        />

        <textarea
          placeholder="Quiz Description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          className="input-field textarea"
          required
        />

        <div className="questions-container">
          {formData.questions.map((question, qIndex) => (
            <div key={qIndex} className="question-card">
              <button type="button" onClick={() => removeQuestion(qIndex)} className="remove-button">
                <X size={20} />
              </button>

              <input
                type="text"
                placeholder="Question"
                value={question.questionText}
                onChange={(e) => {
                  const newQuestions = [...formData.questions];
                  newQuestions[qIndex].questionText = e.target.value;
                  setFormData((prev) => ({ ...prev, questions: newQuestions }));
                }}
                className="input-field"
              />

              <select
                value={question.type}
                onChange={(e) => {
                  const newQuestions = [...formData.questions];
                  newQuestions[qIndex].type = e.target.value;
                  setFormData((prev) => ({ ...prev, questions: newQuestions }));
                }}
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
                        onChange={() => {
                          const newQuestions = [...formData.questions];
                          newQuestions[qIndex].options = newQuestions[qIndex].options.map(
                            (opt, i) => ({ ...opt, isCorrect: i === oIndex })
                          );
                          setFormData((prev) => ({ ...prev, questions: newQuestions }));
                        }}
                      />
                      <input
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        value={option.text}
                        onChange={(e) => {
                          const newQuestions = [...formData.questions];
                          newQuestions[qIndex].options[oIndex].text = e.target.value;
                          setFormData((prev) => ({ ...prev, questions: newQuestions }));
                        }}
                        className="input-field option-input"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="buttons-container">
          <button type="button" onClick={addQuestion} className="add-button">
            <PlusCircle size={20} />
            Add Question
          </button>

          <button type="submit" disabled={submitStatus.type === "loading"} className="save-button">
            <Save size={20} />
            {submitStatus.type === "loading" ? "Saving..." : "Save Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
}
