import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import pool from "./db"; // Import MySQL connection
import { ResultSetHeader } from "mysql2"; // Import MySQL Type
import { Request, Response } from "express";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// ➤ REGISTER USER
app.post("/register", async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const [existingUser]: any[] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            res.status(400).json({ success: false, message: "Username already taken" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

        res.status(201).json({ success: true, message: "Account created successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Registration failed. Try again!" });
    }
});

// ➤ LOGIN
app.post("/login", async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    try {
        const [user]: any[] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

        if (user.length === 0) {
            res.status(401).json({ success: false, message: "Invalid username or password" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: "Invalid username or password" });
            return;
        }

        res.json({ success: true, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Login failed. Try again!" });
    }
});

// CREATE QUIZ
app.post("/quizzes", async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const teacher_id = 1; // Static teacher ID
  
    try {
      if (!title || !description) {
        res.status(400).json({ error: "Title and Description are required" });
        return;
      }
  
      const [result] = await pool.query<ResultSetHeader>(
        "INSERT INTO quizzes (title, description, teacher_id) VALUES (?, ?, ?)",
        [title, description, teacher_id]
      );
  
      res.status(201).json({ id: result.insertId, title, description });
    } catch (error: unknown) {
      console.error("Error in /quizzes:", error); // Logs error details to console
      const err = error as Error;
      res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  });
  

// ➤ GET ALL QUIZZES
app.get("/quizzes", async (req, res) => {
    try {
        const [quizzes] = await pool.query("SELECT * FROM quizzes");
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
});

// ➤ GET QUIZ BY ID (INCLUDES QUESTIONS & OPTIONS)
app.get("/quizzes/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [quiz]: any[] = await pool.query("SELECT * FROM quizzes WHERE id = ?", [id]);
        if (quiz.length === 0) {
            res.status(404).json({ error: "Quiz not found" });
            return;
        }

        const [questions]: any[] = await pool.query("SELECT * FROM questions WHERE quiz_id = ?", [id]);

        for (const question of questions) {
            if (question.type === "multiple_choice") {
                const [options]: any[] = await pool.query("SELECT * FROM options WHERE question_id = ?", [question.id]);
                question.options = options;
            }
        }

        res.json({ ...quiz[0], questions });
    } catch (error) {
        res.status(500).json({ error: "Error fetching quiz" });
    }
});

// ➤ UPDATE QUIZ
app.put("/quizzes/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        await pool.query("UPDATE quizzes SET title = ?, description = ? WHERE id = ?", [title, description, id]);
        res.json({ message: "Quiz updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating quiz" });
    }
});

// ➤ DELETE QUIZ
app.delete("/quizzes/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query("DELETE FROM quizzes WHERE id = ?", [id]);
        res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting quiz" });
    }
});

// ➤ TEST DATABASE CONNECTION
app.get("/test-db", async (req: Request, res: Response): Promise<void> => {
  try {
      const [rows]: any = await pool.query("SELECT 1 + 1 AS result");

      // Ensure rows is not empty and has data
      if (!rows || rows.length === 0) {
         res.status(500).json({ success: false, message: "Unexpected database response" });
         return;
      }

      res.json({ success: true, message: "Database connected!", result: rows[0]?.result || "No data" });
  }catch (error: unknown) {  // Fix: Ensure error is properly typed
    const err = error as Error;  // Explicitly cast error to an Error object
    res.status(500).json({ success: false, message: "Database connection failed", error: err.message || "Unknown error" });
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
