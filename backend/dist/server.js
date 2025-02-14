"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db")); // Import MySQL connection
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
function hashPassword() {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = yield bcrypt_1.default.hash("password123", 10);
        console.log("Hashed Password:", hashedPassword);
    });
}
hashPassword();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// ➤ REGISTER USER
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received /register request:", req.body); // Debugging line
    const { username, password } = req.body;
    try {
        // Check if user already exists
        const [existingUser] = yield db_1.default.query("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            res.status(400).json({ success: false, message: "Username already taken" });
            return;
        }
        // Hash the password before storing it
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Insert new user
        yield db_1.default.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
        res.status(201).json({ success: true, message: "Account created successfully" });
    }
    catch (error) {
        console.error("Error in /register:", error);
        res.status(500).json({ success: false, message: "Registration failed. Try again!" });
    }
}));
// const STATIC_USERNAME = "admin";
// const STATIC_PASSWORD = "password123";
// ➤ LOGIN
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password });
    try {
        const [user] = yield db_1.default.query("SELECT * FROM users WHERE username = ?", [username]);
        console.log("User from database:", user);
        if (user.length === 0) {
            res.status(401).json({ success: false, message: "Invalid username or password" });
            return;
        }
        const storedPassword = user[0].password;
        console.log("Stored password hash:", storedPassword);
        const isMatch = yield bcrypt_1.default.compare(password, storedPassword);
        console.log("Password match result:", isMatch);
        if (!isMatch) {
            res.status(401).json({ success: false, message: "Invalid username or password" });
            return;
        }
        res.json({ success: true, message: "Login successful" });
    }
    catch (error) {
        console.error("Error in /login:", error);
        res.status(500).json({ success: false, message: "Login failed. Try again!" });
    }
}));
// ➤ CREATE QUIZ
app.post("/quizzes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const teacher_id = 1; // Static teacher ID
    try {
        const [result] = yield db_1.default.query("INSERT INTO quizzes (title, description, teacher_id) VALUES (?, ?, ?)", [title, description, teacher_id]);
        res.status(201).json({ id: result.insertId, title, description });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// ➤ GET ALL QUIZZES
app.get("/quizzes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM quizzes");
        res.json(rows);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// ➤ GET QUIZ BY ID
app.get("/quizzes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM quizzes WHERE id = ?", [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: "Quiz not found" });
            return;
        }
        res.json(rows[0]);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// ➤ UPDATE QUIZ
app.put("/quizzes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        yield db_1.default.query("UPDATE quizzes SET title = ?, description = ? WHERE id = ?", [title, description, id]);
        res.json({ message: "Quiz updated successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// ➤ DELETE QUIZ
app.delete("/quizzes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.query("DELETE FROM quizzes WHERE id = ?", [id]);
        res.json({ message: "Quiz deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ error: err.message });
    }
}));
// ➤ TEST DATABASE CONNECTION
app.get("/test-db", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT 1 + 1 AS result");
        res.json({ success: true, message: "Database connected!", result: rows[0].result });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: "Database connection failed", error: err.message });
    }
}));
// ➤ DEFAULT ROUTE
app.get("/", (req, res) => {
    res.send("Quiz Management System API is running!");
});
// ➤ START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
