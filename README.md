# 🎓 Student Management System

A full-stack, highly secure web application for managing academic records. 

This project is built using a modern stack separated into a **Next.js** frontend and a **Fastify** backend. It features robust security measures including OTP (One-Time Password) email authentication, JWT session management, Cloudflare Turnstile bot protection, and Role-Based Access Control (RBAC).

---

## 🏗️ Architecture & Tech Stack

### Frontend (`/frontend`)
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + custom CSS variables
- **Icons:** Lucide React
- **Security:** Cloudflare Turnstile (Bot Protection), Next.js Middleware (Route Protection)
- **Deployment:** Ready for Railway / Vercel

### Backend (`/backend`)
- **Framework:** Fastify (Node.js)
- **Language:** TypeScript
- **Authentication:** JWT (JSON Web Tokens) via `@fastify/jwt`
- **Email Service:** Resend API (for sending 6-digit OTP codes)
- **Security:** `@fastify/helmet` (Headers), `@fastify/rate-limit` (DDoS protection), `@fastify/cors`
- **Storage:** In-memory store (for exam/demo purposes)

---

## ✨ Key Features

1. **Passwordless OTP Login:** Users enter their email and a password, pass a Turnstile bot-check, and receive a secure 6-digit OTP via email (powered by Resend).
2. **Role-Based Access Control:**
   - **Admin:** Can view, add, edit, and delete student records.
   - **Viewer:** Can only view the student dashboard.
3. **Cross-Domain Session Management:** Secure `httpOnly` cookies handle JWTs, with a synchronized frontend cookie to prevent infinite redirect loops on cross-domain deployments (e.g., Railway).
4. **Rate Limiting:** Global rate limits prevent abuse and brute-force attacks on the API.

---

## 🚀 How to Run Locally

Because the project is separated into a frontend and backend, you will need to run two terminal windows.

### 1. Backend Setup
```bash
cd backend
npm install
```
- Copy `.env.example` to `.env`.
- Fill in the required environment variables:
  - `JWT_SECRET`: A long random string (e.g., `openssl rand -hex 64`).
  - `RESEND_API_KEY`: Your API key from [Resend](https://resend.com).
  - `FRONTEND_URL`: Set to `http://localhost:3000`.
- Start the server:
```bash
npm run dev
```
*The backend will start on `http://localhost:4000`.*

### 2. Frontend Setup
```bash
cd frontend
npm install
```
- Copy `.env.example` to `.env.local`.
- Fill in the required environment variables:
  - `NEXT_PUBLIC_API_URL`: Set to `http://localhost:4000/api`.
  - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Set to your Cloudflare Turnstile Site Key (or use the dummy testing key `1x00000000000000000000AA`).
- Start the server:
```bash
npm run dev
```
*The frontend will start on `http://localhost:3000`.*

---

## ☁️ Deployment (Railway)

This repository is optimized for deployment on **Railway** using Nixpacks.

1. **Create two services** in Railway: one pointing to the `/frontend` root directory, and one pointing to the `/backend` root directory.
2. **Configure Environment Variables:**
   - In the **Backend** service, set `FRONTEND_URL` to the live URL of your frontend (e.g., `https://frontend.up.railway.app`).
   - In the **Frontend** service, set `NEXT_PUBLIC_API_URL` to the live URL of your backend (e.g., `https://backend.up.railway.app/api`).
3. **Important Note:** Do not include a root `package.json` in the repository when deploying to Railway, as it confuses the Nixpacks builder into treating the subdirectories incorrectly. 

---

## 👥 Default Users (Demo)

For demonstration purposes, the system has hardcoded users:

- **Admin Account:**
  - Email: `hadiafyouni9@gmail.com`
  - Password: `admin123`
- **Viewer Account:**
  - Email: `gigeishak@gmail.com`
  - Password: `user123`

---

## 🔗 References & AI Collaboration

The development and debugging of this system's architecture (including fixing CORS, Cross-Domain Cookies, Next.js Middleware, and Railway Deployment configurations) was assisted by AI. 

You can view the full development chat log here:
[Claude AI Chat Log](https://claude.ai/share/6674e4bc-4a70-4698-bf1b-2893cd17fb42)
