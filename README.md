
# 📚 Quiz Management System

A full-stack quiz management system that allows users to **create, edit, delete, and start quizzes**.  
Built using **React (Frontend)** and **Node.js + Express + MySQL (Backend)**.

## 🚀 Features
- **User Authentication** (Login/Register)
- **Create, Edit, Delete Quizzes**
- **Add Questions & Options to Quizzes**
- **Start and Attempt Quizzes**
- **Real-time Quiz Updates**

## 🛠️ Project Setup

### **🔧 Prerequisites**
Ensure you have the following installed:
- **Node.js** (`v16+`)
- **npm** (`v8+`) or **yarn**
- **MySQL** (for database)
### **📥 Clone Repository**
```sh
git clone https://github.com/your-username/quiz-management.git
cd quiz-management
```

### **📦 Backend Setup**
1️⃣ Navigate to the backend folder:

```sh
cd backend
```
2️⃣ Install dependencies:

```sh
npm install
```
3️⃣ Set up `.env`file:

Create a `.env` file in the backend directory and add:

```ini
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=quiz_db
PORT=5001
```
4️⃣ Run the backend server:

```sh
npm run dev
```
✅ Server running on: `http://localhost:5001`

### **🎨 Frontend Setup**

1️⃣ Navigate to the frontend folder:

```sh
cd ../frontend
```
2️⃣ Install dependencies:

```sh
npm install
```
3️⃣ Run the frontend:

```sh
npm run dev
```

✅ Frontend running on: `http://localhost:5174`
## 📡 API Documentation

🔹 User Authentication

#### 📌 Register a User

* Endpoint: `POST /register`

* Request:
```json
{
  "username": "testuser",
  "password": "password123"
}
```
* Response:
```json
{
  "success": true,
  "message": "Account created successfully"
}
```
#### 📌 Login a User
* Endpoint: `POST /login`
* Request:
```json
{
  "username": "testuser",
  "password": "password123"
}
```

* Response:
```json
{
  "success": true,
  "message": "Login successful"
}
```
## 🔹 Quiz Management

#### 📌 Create a Quiz
* Endpoint: `POST /quizzes`
* Request:
```json
{
  "title": "JavaScript Basics",
  "description": "A quiz on JS fundamentals",
  "questions": [
    {
      "questionText": "What is the output of 2 + '2'?",
      "type": "multiple_choice",
      "options": [
        { "text": "4", "isCorrect": false },
        { "text": "22", "isCorrect": true },
        { "text": "Error", "isCorrect": false },
        { "text": "NaN", "isCorrect": false }
      ]
    }
  ]
}
```
* Response:
```json
{
  "id": 1,
  "title": "JavaScript Basics",
  "description": "A quiz on JS fundamentals",
  "questions": [{...}]
}
```
#### 📌 Get All Quizzes
* Endpoint: `GET /quizzes`
* Response:
```json
[
  {
    "id": 1,
    "title": "JavaScript Basics",
    "description": "A quiz on JS fundamentals"
  }
]
```
#### 📌 Get Quiz by ID
* Endpoint: `GET /quizzes/:id`
* Response:
```json
{
  "id": 1,
  "title": "JavaScript Basics",
  "description": "A quiz on JS fundamentals",
  "questions": [
    {
      "id": 1,
      "questionText": "What is the output of 2 + '2'?",
      "type": "multiple_choice",
      "options": [
        { "text": "4", "isCorrect": false },
        { "text": "22", "isCorrect": true }
      ]
    }
  ]
}
```
#### 📌 Update a Quiz
* Endpoint: `PUT /quizzes/:id`
* Request:
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```
* Response:
```json
{ "message": "Quiz updated successfully" }
```
#### 📌 Delete a Quiz
* Endpoint: `DELETE /quizzes/:id`
* Response:
```json
{ "message": "Quiz deleted successfully" }
```

## Sceenshot
![image](https://github.com/user-attachments/assets/79532070-3a67-4880-8d28-954a9d792116)
![image](https://github.com/user-attachments/assets/dd5a835c-d164-4524-bcf5-c1b0ce85507e)
![image](https://github.com/user-attachments/assets/43905373-efde-4ac9-a26c-baaa5cad24c2)
![image](https://github.com/user-attachments/assets/8ce49269-e055-49b1-8b67-46372d666db6)
![image](https://github.com/user-attachments/assets/f654c736-79d0-4ef4-b645-21b77231fc18)
![image](https://github.com/user-attachments/assets/2927a1e1-7803-4061-ac99-8d25ae74e499)
![image](https://github.com/user-attachments/assets/6e5dd526-2d86-41be-b06a-96755e87b940)


## 🎯 Future Enhancements
* Quiz Timer & Scoring
* User Role Management (Admin, Student)
* Leaderboard & Performance Tracking

 📌 Contributions & feedback are welcome! 🚀
---

### **How to Use This?**
- Copy-paste this into your `README.md` file.
- Replace `"your-username"` with your actual GitHub username in the **clone command**.
- Ensure the **API endpoints match** your actual backend.

✅ **Now your project has a fully documented README with setup instructions and API details!** 🚀🔥
