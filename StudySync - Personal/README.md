# StudySync

## Overview

**StudySync** is a full-stack web application designed to help students find structured collaboration opportunities based on shared courses, availability, and academic strengths.

Instead of unstructured, noisy coordination (e.g., Discord), StudySync enables students to:

- Create focused collaboration posts
- Request to join study or project sessions
- Match based on course + time overlap + (future) skill compatibility
- Communicate securely within the platform

StudySync follows a structured workflow where collaboration happens through **posts and controlled membership**, not random DMs.

---

## Core Concept

StudySync does **not** match users directly (like a swipe-based system).

Instead, it follows a controlled workflow:

1. A student creates a **Collaboration Post**
2. Other students **request to join**
3. The creator **accepts or rejects** requests
4. Accepted members become **Post Members**
5. Only members can access the **in-app chat** for that post

This structured approach reduces noise and increases accountability.

---

## Core Features

### Authentication & Security (MVP)
- User registration and login
- Secure password hashing (bcrypt)
- JWT-based authentication
- Protected API routes

### Courses (MVP)
- Seeded course catalog
- Fetch courses for post creation and filtering

### Collaboration Posts (MVP)
Users can create posts such as:
- Study group
- Project teammate search
- Hackathon team
- Accountability session

Each post includes:
- Course
- Type
- Title + description
- Start time
- Duration

### Join Request Workflow (MVP)
- Send join request to a post
- Creator accepts or rejects
- Accepted users become members of that post
- Membership is required to access chat

### Controlled Communication (MVP-lite)
- Members-only in-app messaging per post
- (Future) contact-sharing protection, report/block tools

---

## Tech Stack

### Frontend
- React (Create React App)
- JavaScript (simple React, no TypeScript required initially)
- React Router

### Backend
- Python
- FastAPI
- SQLAlchemy
- Alembic (migrations)

### Database
- MySQL (Docker local development)
- Managed deployment ready (AWS RDS / Railway / etc.)

### Authentication
- JWT
- bcrypt hashing

---

## Architecture

StudySync follows a client-server architecture:

    [ React (CRA) Frontend ]
                ↓
    [ FastAPI Backend (Python) ]
                ↓
    [ MySQL Database ]

- The frontend handles UI rendering and API communication.
- The backend manages business logic, validation, and authentication.
- SQLAlchemy models relational data, Alembic manages migrations.
- MySQL stores users, courses, posts, join requests, memberships, messages.

---

## Monorepo Structure

    StudySync/
    │
    ├── apps/
    │   ├── web/                  # Frontend (React CRA)
    │   │   └── src/
    │   │       ├── pages/
    │   │       ├── components/
    │   │       ├── api/
    │   │       └── styles/
    │   │
    │   └── api_py/               # Backend (FastAPI + SQLAlchemy)
    │       ├── app/
    │       │   ├── main.py
    │       │   ├── db.py
    │       │   ├── models.py
    |       |   ├── deps.py
    │       │   ├── auth/
    |       |   |      ├── routes.py
    |       |   |      ├── security.py
    |       |   |      ├── schemas.py
    │       │   ├── posts/
    │       │   ├── courses/
    │       │   └── messages/
    │       ├── migrations/       # Alembic migrations
    │       ├── requirements.txt
    │       └── .env
    │
    ├── docker-compose.yml
    └── README.md

This structure enables:
- Clear separation of concerns
- Scalable growth (features split into modules)
- Easy local development using Docker MySQL

---

## Installation & Setup

### Prerequisites
- Python 3.11+ (recommended)
- Node.js (LTS)
- npm
- Docker + Docker Compose
- Git

---

## 1) Start MySQL with Docker

From repo root:

    docker compose up -d

If you see a container name conflict (e.g., `studysync-mysql` already exists), either:
- reuse the existing container, OR
- remove it and restart (fresh DB)

---

## 2) Backend Setup (FastAPI)

Go to backend folder:

    cd apps/api_py

Create a virtual environment (recommended):

    python -m venv .venv

Activate it:
- Windows (PowerShell):

    .\.venv\Scripts\Activate.ps1

Install dependencies:

    pip install -r requirements.txt

Create `.env` inside `apps/api_py`:

    DATABASE_URL=mysql+pymysql://studysync:PeerUp@localhost:3306/studysync
    JWT_SECRET=dev-secret
    PORT=4000

Run migrations (Alembic):

    alembic upgrade head

Start FastAPI server:

    uvicorn app.main:app --reload --port 4000

Backend runs at:

    http://localhost:4000

FastAPI docs:

    http://localhost:4000/docs

---

## 3) Frontend Setup (React CRA)

Go to frontend folder:

    cd apps/web

Install deps:

    npm install

Add proxy to `apps/web/package.json`:

    "proxy": "http://localhost:4000"

Start frontend:

    npm start

Frontend runs at:

    http://localhost:3000

---

## API Endpoints (MVP)

### Health
| Method | Endpoint        | Description |
|--------|------------------|-------------|
| GET    | `/api/health`    | Returns API + DB status |

### Authentication
| Method | Endpoint              | Description |
|--------|------------------------|-------------|
| POST   | `/api/auth/register`   | Register new user |
| POST   | `/api/auth/login`      | Login and receive JWT |

### Courses
| Method | Endpoint          | Description |
|--------|--------------------|-------------|
| GET    | `/api/courses`     | List courses |

### Posts
| Method | Endpoint                     | Description |
|--------|-------------------------------|-------------|
| GET    | `/api/posts`                  | List posts |
| POST   | `/api/posts`                  | Create a post |
| GET    | `/api/posts/{id}`              | Post details |
| DELETE | `/api/posts/{id}`              | Delete post (owner only) |

### Join Requests
| Method | Endpoint                                | Description |
|--------|------------------------------------------|-------------|
| POST   | `/api/posts/{id}/request`                 | Request to join a post |
| POST   | `/api/posts/requests/:requestId/accept`  | Accept join request |
| POST   | `/api/posts/requests/:requestId/reject`  | Reject join request |

### Messages (Members-only)
| Method | Endpoint                    | Description |
|--------|------------------------------|-------------|
| GET    | `/api/posts/{id}/messages`    | Read messages |
| POST   | `/api/posts/{id}/messages`    | Send message |

---

## Roadmap (After MVP)

- Pagination and filtering on posts
- Max member limits and auto-close posts
- User profile editing
- Availability blocks + overlap scoring
- Matching logic (course + time + tags)
- Rate limiting and request validation
- Structured logging + monitoring
- Tests (Pytest + HTTPX / TestClient)
- Basic moderation (report/block/contact filtering)

---

## Status

**MVP rebuild in progress (FastAPI migration).**  
Target: BCIT pilot-ready MVP.