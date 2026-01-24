# Task Tracker

## Overview
This is a small full‑stack application for managing recurring tasks. Each task includes a name, a frequency in days, and optional notes. When a task is completed, the system updates the last completed date and calculates the next due date. The goal is to provide a simple and predictable way to track habits, chores, and other repeating responsibilities.

## Purpose
I built this project because most task apps focus on one‑time to‑dos. Recurring tasks often require a clear record of when they were last completed and when they are due again. This application provides a minimal interface and a lightweight backend to solve that specific problem without unnecessary complexity.

## Features
- Add tasks with a name, frequency (days), and notes
- Automatic calculation of next due date
- Mark tasks as complete
- Delete tasks
- Simple and clean UI
- Flask backend with a REST API
- React frontend for interaction

## Running the Project
### Backend (Flask)
1. Navigate to the backend directory:
```cd backend```
2. Create and activate a virtual environment:
```python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
```
3. Install dependencies:
```pip install -r requirements.txt```
4. Start the server:
```flask run```


The backend will be available at:
```http://localhost:5000```



### Frontend (React)
1. Navigate to the frontend directory:
```cd frontend```
2. Install dependencies:
```npm install```
3. Start the development server:
```npm start```

The frontend will be available at:
```http://localhost:3000```


## This project is open for improvement and extension.