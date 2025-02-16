import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Quiz Manager</div>

      {/* Mobile Menu Button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-item" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/create-quiz" className="nav-item" onClick={() => setMenuOpen(false)}>Create Quiz</Link>

        {!isAuthenticated ? (
          <Link to="/login" className="nav-item" onClick={() => setMenuOpen(false)}>Login</Link>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        )}
      </div>
    </nav>
  );
}
