import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { Eye, EyeOff, LogIn, CheckCircle } from 'lucide-react';
import "../styles.css"; // Ensure this file is correctly linked

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate(); // ✅ Use navigate for redirection

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // onLoginSuccess();
        localStorage.setItem("user", JSON.stringify({ username: formData.username })); // ✅ Store User
        setShowPopup(true); // ✅ Show Pop-up
        setTimeout(() => {
          setShowPopup(false);
          navigate("/"); // ✅ Redirect to Dashboard
        }, 3000);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      {/* ✅ Pop-up Notification */}
      {showPopup && (
        <div className="popup-message">
          <CheckCircle size={24} />
          Login Successful! Redirecting...
        </div>
      )}
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Please sign in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">{error}</div>
          )}

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your username"
            />
          </div>

          <div className="input-group password-wrapper">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="Enter your password"
            />
            <button style={{ marginTop: "7px" }}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={25} /> : <Eye size={25} /> }
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? (
              <>
                <div className="spinner" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        <div className="register-link" >
          <p>
            Don't have an account?{' '}
            <button style={{ marginTop: "10px" }}
              onClick={() => navigate('/register')} // ✅ Redirect to Register Page
              className="register-button"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
