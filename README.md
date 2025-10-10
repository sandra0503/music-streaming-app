# 🎵 Nina Music Streaming App (Portfolio MVP)

A full-stack **React + TypeScript + Node.js + MongoDB** music streaming demo app with **signup/login functionality**, designed for portfolio use. The app is a demo Spotify-like project that will eventually integrate **Nina Protocol music** and custom playlists.

Further information on Nina can be found [here](https://dev.ninaprotocol.com/).

---

## 🛠️ Tech Stack

**Frontend:** React + TypeScript, Axios for API requests, Context/Hook for auth state (`useAuth`), optional PWA-ready.  
**Backend:** Node.js + Express + TypeScript, MongoDB (Docker / Atlas), JWT-based authentication, Bcrypt for password hashing.  
**Dev Tools / DevOps:** Docker + Docker Compose, ts-node-dev for hot-reload during development.

---

## 🔑 Features (So Far)

- User signup (`/api/auth/signup`)
- User login (`/api/auth/login`)
- JWT authentication & protected routes (`/api/protected`)
- TypeScript support for frontend & backend
- Dockerized development environment

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm v9+
- Docker & Docker Compose
- MongoDB (local or via Docker)

### Backend Setup

1. Go to backend folder:  
   `cd backend`

2. Install dependencies:  
   `npm install`

3. Create a `.env` file in `backend/` with the following content:

```
PORT=5000
MONGO_URI=mongodb://mongo:27017/nina-music
JWT_SECRET=your_jwt_secret_here
```

4. Run in development mode (hot-reload):  
   `npm run dev`

5. Or build and run compiled JS:  
   `npm run build`  
   `npm start`

### Frontend Setup

1. Go to frontend folder:  
   `cd frontend`

2. Install dependencies:  
   `npm install`

3. Create a `.env` file in `frontend/` with the following content:

```
REACT_APP_API_URL=http://localhost:5001
```

4. Run development server:  
   `npm start`

Open [http://localhost:3000](http://localhost:3000) and test signup/login.

### Docker Setup (Optional, Dev Mode)

1. Backend Dockerfile uses `ts-node-dev` for live reload:  
   `CMD ["npm", "run", "dev"]`

2. Run everything with Docker Compose:  
   `docker compose up --build`

- Backend runs on port `5001`
- MongoDB container runs on port `27017`

---

## 📝 How Login/Signup Works

**Signup:** User provides `email`, `password`. Backend hashes password with bcrypt and stores the user in MongoDB.

**Login:** User provides `email` + `password`. Backend validates credentials and returns a JWT token.

**Protected Routes:** Frontend sends JWT in `Authorization: Bearer <token>` header. Backend middleware verifies token and allows access only to authenticated users.

---

## 🔮 Next Steps (Planned)

- Integrate **Nina Protocol** for streaming music
- Add **custom playlists** stored in MongoDB
- Make frontend **PWA installable**
- Deploy full stack via **Docker + cloud hosting**

---

## 🖼️ Screenshots

---

## 💻 Contact / Portfolio Link

- GitHub: [https://github.com/sandra0503](https://github.com/sandra0503)
- LinkedIn: [Sandra Zollner](https://www.linkedin.com/in/sandrazollner/)

> Disclaimer: This is a **demo app for portfolio purposes**. No copyrighted tracks are hosted; future music integration will use Nina Protocol streaming.
