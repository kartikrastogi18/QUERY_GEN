# 🚀 QueryGen – Natural Language to SQL Generator

### QueryGen is a full-stack web application that converts natural language questions into safe SQL queries using an AI model.
It includes rate limiting, caching, SQL validation, and a clean UI for developers and learners.

## ✨ Features

🔤 Convert English questions to SQL queries

🧠 AI-powered SQL generation (Gemini / LLM)

🛡 SQL safety validation (prevents dangerous queries)

⚡ In-memory caching for repeated questions

🚦 API rate limiting (prevents abuse)

📋 One-click copy to clipboard

💻 Clean and responsive frontend UI

🔍 Health check API for backend monitoring

## 🏗 Architecture Overview

Frontend (HTML, CSS, JS)
 
      |
 
        |  POST /generate-sql
  
        v

Backend (Node.js + Express)
  
        |
   
  |── Prompt Builder
  
        |── AI SQL Generator (Gemini)
        
        |── SQL Safety Validator
        
        |── In-memory Cache
        
        |── Rate Limiter
        
        |
        
        v
     
     SQL Response

## 🛠 Tech Stack
Frontend

HTML5

CSS3

Vanilla JavaScript

Fetch API

Backend

Node.js

Express.js

Google Gemini API (LLM)

express-rate-limit

dotenv

cors

## 📁 Project Structure

QueryGen/

│

├── frontend/

│   ├── index.html

│   ├── style.css

│   └── script.js

│

├── backend/

│   ├── index.js

│   ├── gemini.js

│   ├── prompt.js

│   ├── validator.js

│   ├── .env

│   └── package.json

│

└── README.md

## ⚙️ Setup Instructions (Local)
### 1️⃣ Clone the repository

git clone https://github.com/kartikrastogi18/QueryGen.git

cd QueryGen

### 2️⃣ Backend Setup

cd backend

npm install


### Create a .env file:

GEMINI_API_KEY=your_api_key_here


### Start backend:

npm run dev


### Backend runs on:

http://localhost:3000

## 3️⃣ Frontend Setup

### Open frontend using Live Server or directly open index.html:

cd frontend


### Frontend runs on:

http://127.0.0.1:5500

## 🔌 API Endpoints
### 🔍 Health Check
GET /health


Response:

{ "status": "ok" }

### 🧠 Generate SQL
POST /generate-sql


### Request Body:

{
  "question": "get all users created today"
}


### Response:

{
  "sql": "SELECT * FROM users WHERE created_at = CURRENT_DATE;",
  "cached": false
}

### 🚦 Rate Limiting

15 requests per minute per IP

Returns 429 Too Many Requests on limit exceed

Example error:

{
  "error": "RATE_LIMIT"
}

🛡 SQL Safety

Before returning SQL:

Blocks DROP, DELETE, TRUNCATE

Ensures read-only safe queries

Prevents SQL injection patterns

### 🧠 Caching Strategy

Uses in-memory Map

Same question → instant response

Reduces AI API cost

