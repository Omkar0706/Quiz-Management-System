import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./db"; // Import MySQL connection
import { ResultSetHeader } from "mysql2"; // Import MySQL Type
import { Request, Response } from "express";
import bcrypt from "bcrypt";

dotenv.config();

async function hashPassword() {
    const hashedPassword = await bcrypt.hash("password123", 10);
    console.log("Hashed Password:", hashedPassword);
}

hashPassword();

const app = express();
const PORT = process.env.PORT || 5001;


app.use(cors());
app.use(bodyParser.json());

// ➤ REGISTER USER
app.post("/register", async (req: Request, res: Response): Promise<void> => {
    console.log("Received /register request:", req.body); // Debugging line
    
    const { username, password } = req.body;
  
    try {
      // Check if user already exists
      const [existingUser]: any[] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
      if (existingUser.length > 0) {
        res.status(400).json({ success: false, message: "Username already taken" });
        return;
      }
  
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert new user
      await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
  
      res.status(201).json({ success: true, message: "Account created successfully" });
    } catch (error) {
      console.error("Error in /register:", error);
      res.status(500).json({ success: false, message: "Registration failed. Try again!" });
    }
  });
  
// const STATIC_USERNAME = "admin";
// const STATIC_PASSWORD = "password123";

// ➤ LOGIN
app.post("/login", async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
  console.log("Login attempt:", { username, password });

  try {
    const [user]: any[] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    console.log("User from database:", user);

    if (user.length === 0) {
      res.status(401).json({ success: false, message: "Invalid username or password" });
      return;
    }

    const storedPassword = user[0].password;
    console.log("Stored password hash:", storedPassword);

    const isMatch = await bcrypt.compare(password, storedPassword);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
       res.status(401).json({ success: false, message: "Invalid username or password" });
       return;
    }

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error in /login:", error);
    res.status(500).json({ success: false, message: "Login failed. Try again!" });
  }
});
  

// ➤ CREATE QUIZ
app.post("/quizzes", async (req, res) => {
  const { title, description } = req.body;
  const teacher_id = 1; // Static teacher ID

  try {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO quizzes (title, description, teacher_id) VALUES (?, ?, ?)",
      [title, description, teacher_id]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET ALL QUIZZES
app.get("/quizzes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM quizzes") as any[];
    res.json(rows);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// ➤ GET QUIZ BY ID
app.get("/quizzes/:id", async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const [rows]: any[] = await pool.query("SELECT * FROM quizzes WHERE id = ?", [id]);
      if (rows.length === 0) {
        res.status(404).json({ message: "Quiz not found" });
        return;
      }
      res.json(rows[0]);
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  });

// ➤ UPDATE QUIZ
app.put("/quizzes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    await pool.query("UPDATE quizzes SET title = ?, description = ? WHERE id = ?", [title, description, id]);
    res.json({ message: "Quiz updated successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// ➤ DELETE QUIZ
app.delete("/quizzes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM quizzes WHERE id = ?", [id]);
    res.json({ message: "Quiz deleted successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
});

// ➤ TEST DATABASE CONNECTION
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result") as any[];
    res.json({ success: true, message: "Database connected!", result: rows[0].result });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ success: false, message: "Database connection failed", error: err.message });
  }
});

// ➤ DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Quiz Management System API is running!");
});

// ➤ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
