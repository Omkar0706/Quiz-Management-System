import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import QuizForm from "./pages/QuizForm";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import StartQuiz from "./pages/StartQuiz";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-quiz" element={<CreateQuiz />} />
          <Route path="/edit-quiz/:quizId" element={<QuizForm isEditMode={true} />} />          <Route path="login" element={<Login />} />
          <Route path="/start-quiz/:quizId" element={<StartQuiz />} />
         <Route path="register" element={<Register />} />
        </Route>
      </Routes>
  );
}

export default App;
