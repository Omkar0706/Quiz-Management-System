// import React, { useState } from "react";
// import { createQuiz } from "../api";
// import { useNavigate } from "react-router-dom";
// import "./QuizForm.css";

// export default function QuizForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [questions, setQuestions] = useState([
//     {
//       questionText: "",
//       options: [
//         { text: "", isCorrect: false },
//         { text: "", isCorrect: false },
//       ],
//     },
//   ]);
  
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await createQuiz(title, description);
//     navigate("/");
//   };

//   const handleOptionChange = (qIndex, oIndex) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex].options = newQuestions[qIndex].options.map((opt, i) => ({
//       ...opt,
//       isCorrect: i === oIndex,
//     }));
//     setQuestions(newQuestions);
//   };

//   const handleTextChange = (qIndex, oIndex, value) => {
//     const newQuestions = [...questions];
//     newQuestions[qIndex].options[oIndex].text = value;
//     setQuestions(newQuestions);
//   };

//   return (
//     <div className="quiz-form">
//       <h2>Create a Quiz</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Title</label>
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
        
//         <label>Description</label>
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         ></textarea>

//         {/* Options Section */}
//         <div className="options-container">
//           {questions.map((question, qIndex) => (
//             <div key={qIndex}>
//               <h3>Question {qIndex + 1}</h3>
//               <input
//                 type="text"
//                 placeholder="Enter question"
//                 value={question.questionText}
//                 onChange={(e) => {
//                   const newQuestions = [...questions];
//                   newQuestions[qIndex].questionText = e.target.value;
//                   setQuestions(newQuestions);
//                 }}
//                 required
//               />

//               {/* Options */}
//               {question.options.map((option, oIndex) => (
//                 <div key={oIndex} className="option-item">
//                   <input
//                     type="checkbox"
//                     name={`correct-${qIndex}`}
//                     checked={option.isCorrect}
//                     onChange={() => handleOptionChange(qIndex, oIndex)}
//                   />
//                   <input
//                     type="text"
//                     placeholder={`Option ${oIndex + 1}`}
//                     value={option.text}
//                     onChange={(e) => handleTextChange(qIndex, oIndex, e.target.value)}
//                   />
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         <button type="submit">Create Quiz</button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { createQuiz } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure styles are correctly applied

export default function QuizForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ]);
  
  const navigate = useNavigate();

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createQuiz(title, description);
    navigate("/"); // ✅ Redirect to Dashboard
  };

  // ✅ Handle Cancel
  const handleCancel = () => {
    navigate("/"); // ✅ Redirect to Dashboard when canceled
  };

  // ✅ Handle Option Selection (Checkbox Left)
  const handleOptionChange = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.map((opt, i) => ({
      ...opt,
      isCorrect: i === oIndex,
    }));
    setQuestions(newQuestions);
  };

  const handleTextChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setQuestions(newQuestions);
  };

  return (
    <div className="quiz-form">
      <h2>Create a Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        {/* Options Section */}
        <div className="options-container">
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="question-box">
              <h3>Question {qIndex + 1}</h3>
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

              {/* Options (Checkbox on Left) */}
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="option-item">
                  <input
                    type="checkbox"
                    name={`correct-${qIndex}`}
                    checked={option.isCorrect}
                    onChange={() => handleOptionChange(qIndex, oIndex)}
                  />
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option.text}
                    onChange={(e) => handleTextChange(qIndex, oIndex, e.target.value)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ✅ Buttons for submission & navigation */}
        <div className="buttons-container">
          <button type="submit" className="submit-button">Create Quiz</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
