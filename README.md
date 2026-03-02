# InterviewAI - AI-Powered Mock Interview Platform

InterviewAI is a full-stack, AI-driven SaaS platform designed to help users prepare for technological and behavioral interviews. By utilizing Google Gemini's powerful language models, Speech-to-Text conversion, WebRTC for Webcam capabilities, and a comprehensive dashboard, it provides a realistic and strict environment for interview preparation.

## 🚀 Features

*   **Premium Light UI**: A high-impact, modern visual theme centered on clarity, glassmorphism, and smooth animations.
*   **AI Evolution Grader**: Real-time evaluation of answers using Google Gemini's Pro models, assessing Technical Correctness, Clarity, and Communication.
*   **Live Proctoring**: Simulates a strict interview room with WebRTC camera access and focus monitoring (tab-switch detection).
*   **Speech-to-Text Engine**: Hands-free interactions using the Web Speech API for a realistic conversation flow.
*   **Interactive Analytics**: Deep performance visualization with domain-wise proficiency charts and detailed progress history.
*   **Secure Environment**: JWT-based authentication and strictly private session data storage.
*   **Comprehensive Bank**: 300+ sample questions spanning DSA, Web Dev, ML, HR, Data Science, and DBMS.

## 🛠️ Tech Stack

*   **Frontend**: React, Vite, Tailwind CSS, Recharts, Lucide React
*   **Backend**: Node.js, Express, Mongoose
*   **Database**: MongoDB
*   **AI Engine**: Google Gemini API (@google/generative-ai)
*   **Security**: bcryptjs, JSON Web Tokens (JWT)

## 📁 Project Structure

```text
interview-ai/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Navbar)
│   │   ├── pages/          # Screens (Dashboard, Interview, Results, etc.)
│   │   ├── services/       # Axios API handlers
│   │   ├── main.jsx        # App entry point
│   │   └── index.css       # Tailwind base styles
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
└── server/                 # Express Backend
    ├── config/             # DB configuration
    ├── controllers/        # Route controllers (Auth, Interview logic)
    ├── middleware/         # Custom Middlewares (JWT protection)
    ├── models/             # Mongoose schemas (User, Session, Question, Answer)
    ├── routes/             # API routing
    ├── seed.js             # Initial database seed script
    ├── server.js           # Server entry point
    └── .env                # Environment parameters
```

## ⚙️ Setup and Installation

### Prerequisites

*   Node.js installed (v16+)
*   MongoDB installed locally or a MongoDB Atlas URI
*   An active Google Gemini API Key

### 1. Clone & Install Dependencies

Open a terminal and install dependencies for both `server` and `client`.

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### 2. Configure Environment Variables

**Backend (`server/.env`):**
Rename `.env.example` to `.env` or create a new `.env` file in the `server` directory.
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/interview-ai
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key_here
```

**Frontend (`client/.env`):**
Rename `.env.example` to `.env` or create a new `.env` file in the `client` directory.
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the Database

Populate your MongoDB database with over 300 sample questions spanning multiple domains.
```bash
# Inside the server directory
npm run seed
```

### 4. Run the Application

**Start the Backend Server:**
```bash
# Inside the server directory
npm run dev
# The backend will run on http://localhost:5000
```

**Start the Frontend Vite Server:**
```bash
# Inside the client directory
npm run dev
# The frontend will run on http://localhost:5173
```

## 📸 Screenshots & Usage
1. **Register / Login**: Create an account to access the dashboard.
2. **Dashboard**: View your past attempt metrics and score trends.
3. **Start Interview**: Select a domain and duration (10 or 15 mins).
4. **Interview Screen**: Wait for access to the camera, read the question, speak your answer or type it out, and submit. Avoid switching tabs!
5. **Results**: Review the detailed AI-generated feedback and your score out of 10.

## 📝 License
This project is for educational and portfolio purposes.
