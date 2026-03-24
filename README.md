# HRMS Lite – Full-Stack HR Management System

A lightweight, professional Human Resource Management System for managing employee records and tracking daily attendance.

## Tech Stack

- **Frontend**: Vite + React + Vanilla CSS
- **Backend**: FastAPI (Python) + SQLAlchemy ORM
- **Database**: SQLite (local persistence)
- **Icons**: Lucide React
- **Validation**: Pydantic + Email Validator

## Features

- **Employee Management**: Add, view, and delete employees with unique IDs and email validation.
- **Attendance Tracking**: Mark attendance (Present/Absent) on a per-date basis.
- **Admin Dashboard**: Real-time summary of total employees, present count, and attendance rate.
- **Responsive UI**: A modern dashboard design that works across different screen sizes.

## Project Structure

```text
hrms/
├── backend/            # FastAPI Backend
│   ├── main.py         # Entry point & API routes
│   ├── models.py       # SQLAlchemy ORM models
│   ├── schemas.py      # Pydantic validation schemas
│   ├── crud.py         # Database operations
│   └── database.py     # SQLAlchemy configuration
├── frontend/           # Vite + React Frontend
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page-level components
│   │   ├── App.jsx     # Main application layout
│   │   └── App.css     # Global design system
│   └── vite.config.js  # Vite settings with API proxy
└── README.md           # This file
```

## Setup & Local Development

### Prerequisites

- Python 3.9+
- Node.js 18+ & npm

### Backend Setup (using uv)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment using `uv`:
   ```bash
   uv venv
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   uv pip install -r requirements.txt
   ```
4. Run the backend server:
   ```bash
   python main.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev -- --host 0.0.0.0 --port 5173
   ```

### Accessing the App

Once both servers are running, the application will be accessible at:
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Running with Docker (Recommended for Production)

The application is fully dockerized for easy deployment.

1. Ensure you have **Docker** and **Docker Compose** installed.
2. Build and start the containers:
   ```bash
   docker-compose up --build -d
   ```
3. Access the services:
   - **Frontend**: [http://localhost](http://localhost) (Port 80)
   - **Backend API**: [http://localhost:8000](http://localhost:8000)

## Production Notes

- **CORS**: Update `CORS_ORIGINS` in `backend/.env` to include your production domain.
- **Security**: In a real production environment, use a more robust database like PostgreSQL and ensure the `.env` file is NOT committed to version control.
- **Nginx**: The frontend is served using Nginx, which handles the reverse proxy to the backend API.

---

Developed as a coding assignment for HRMS Lite.
