# SmartEdu – Smart Study Planner & Deadline Tracker

A modern, responsive, and full-featured academic productivity application designed to empower students with intelligent study planning, deadline tracking, course management, Pomodoro focus sessions, and performance analytics.

Built with a modern **blue-and-white** aesthetic inspired by top-tier productivity dashboards.

---

## 🚀 Technology Stack

### Frontend
- **React.js (v18)** with **Vite** for fast HMR and compilation
- **Tailwind CSS** with a custom blue-and-white design system
- **React Router (v6)** for multi-page SPA client-side routing
- **Lucide React** for modern UI iconography
- **Axios** with configured API interceptor layer (`src/services/api.js`)
- **Web Audio API** for zero-dependency ambient white noise & rain sound simulation

### Backend
- **Node.js** & **Express.js** RESTful API
- **MongoDB Atlas** cloud database integration
- **Mongoose** for schema models, validation, and data persistence
- **CORS**, **Morgan**, and **Dotenv** configuration

---

## 📁 Project Architecture

```
smartedu/
├── frontend/                     # React + Vite + Tailwind Client
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx              # Application entry point
│       ├── App.jsx               # Router & master responsive layout
│       ├── index.css             # Tailwind base & custom scrollbar styles
│       ├── context/
│       │   └── AppContext.jsx    # Centralized state management & dual-mode sync
│       ├── services/
│       │   └── api.js            # Axios client prepared for MongoDB endpoints
│       ├── utils/
│       │   ├── helpers.js        # Date formatting, countdowns, status color helpers
│       │   └── initialData.js    # Comprehensive initial academic mock dataset
│       ├── components/
│       │   ├── common/           # Reusable UI (Sidebar, Navbar, Modal, Button, Card, Badge)
│       │   ├── dashboard/        # StatCard, ScheduleTimeline, UrgentDeadlines, QuickPomodoro, SubjectProgress
│       │   ├── planner/          # SessionModal, DailyPlanCard
│       │   ├── subjects/         # SubjectModal, SubjectCard
│       │   ├── assignments/      # AssignmentModal, KanbanBoard
│       │   ├── notes/            # NoteModal
│       │   └── timer/            # Timer controls & sound player
│       └── pages/
│           ├── Dashboard.jsx            # 1. Main Student Dashboard
│           ├── StudyPlanner.jsx         # 2. Weekly & Daily Study Planner
│           ├── SubjectManagement.jsx    # 3. Enrolled Course & Syllabus Management
│           ├── AssignmentManagement.jsx # 4. Kanban & List Deadlines Tracker
│           ├── CalendarView.jsx         # 5. Interactive Academic Calendar
│           ├── Notes.jsx                # 6. Study Notes & Knowledge Base
│           ├── PomodoroTimer.jsx        # 7. Interactive Pomodoro Study Timer
│           ├── ProgressAnalytics.jsx    # 8. Focus Hours & Completion Analytics
│           ├── Notifications.jsx        # 9. Notification & Deadline Alert Center
│           └── StudentProfile.jsx       # 10. Student Profile & Graduation Tracker
│
└── backend/                      # Node.js + Express + Mongoose API
    ├── server.js                 # Express server & route registration
    ├── seed.js                   # Database seeder script
    ├── .env.example              # Environment variables template
    ├── package.json
    ├── config/
    │   └── db.js                 # MongoDB Atlas Mongoose connection
    ├── models/                   # Mongoose Schemas
    │   ├── Subject.js
    │   ├── Assignment.js
    │   ├── StudySession.js
    │   ├── Note.js
    │   ├── User.js
    │   └── Notification.js
    ├── controllers/              # Business logic for all modules
    └── routes/                   # REST API route endpoints
```

---

## ⚡ How to Run the Frontend

The frontend is ready to run immediately.

1. Open your terminal in the `smartedu` folder:
   ```bash
   cd frontend
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```
   http://localhost:5173
   ```

> **Note on Backend Readiness:**
> The frontend features an intelligent dual-mode architecture. If your backend is offline, the frontend runs smoothly in local reactive mode (persisting changes in `localStorage`). As soon as your MongoDB Atlas backend is online, it will automatically connect!

---

## 🗄️ How to Run the Backend (with MongoDB Atlas)

1. Open a new terminal in the `smartedu` folder:
   ```bash
   cd backend
   ```
2. Create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```
3. In `backend/.env`, paste your MongoDB Atlas connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@yourcluster.mongodb.net/smartedu?retryWrites=true&w=majority
   CLIENT_URL=http://localhost:5173
   ```
4. (Optional) Seed the database with realistic sample student data:
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000/api`.

---

## 🌟 10 Included Application Features

1. **Dashboard:**
   - Welcome greeting with academic quote, streak counter, and current semester.
   - 4 Key KPI cards: Active Deadlines, Focus Hours, Study Streak, and Cumulative GPA.
   - Interactive Today's Study Timeline with quick completion toggle.
   - Enrolled Subjects Progress & Grade preview.
   - Live Quick Pomodoro widget directly on the dashboard.
   - Urgent Deadlines countdown list.

2. **Study Planner:**
   - Daily and weekly focus block scheduler.
   - "Smart Suggest" button that recommends optimal study sessions based on upcoming deadlines.
   - Status filters (Planned vs Completed) and Subject filters.
   - Daily target progress meter.

3. **Subject Management:**
   - Visual course cards showing Instructor name, email, schedule, room, credit hours, and syllabus completion.
   - Real-time grade tracking (Percentage + Letter Grade).
   - Add, edit, and delete subjects with custom color palette tags.

4. **Assignment Management:**
   - **Kanban Board View** (To Do, In Progress, Submitted, Graded) with instant status dropdown mover.
   - **List/Table View** with progress bars, countdown urgency tags, and subtasks.
   - Subtasks checklist with interactive completion checkboxes.
   - Multi-criteria filtering by Subject, Priority (High/Medium/Low), and keyword search.

5. **Academic Calendar:**
   - Full monthly calendar grid with month navigation and "Today" shortcut.
   - Color-coded event markers for due dates and study sessions.
   - Selected Day Agenda sidebar showing deadlines and study sessions for that specific date.

6. **Notes & Knowledge Base:**
   - Note-taking repository with pin-to-top functionality.
   - Markdown viewer with code snippet formatting.
   - One-click "Copy Markdown" and "Download as .md" buttons.
   - Filter by course and tags.

7. **Pomodoro Study Timer:**
   - Interactive circular timer dial supporting 25m Focus, 5m Short Break, and 15m Long Break.
   - Built-in ambient noise generator (Gentle Rain and Soft Static) using the browser's Web Audio API.
   - Course assignment picker to associate focus blocks with course tasks.
   - Live session stats and cycle counter.

8. **Progress Analytics:**
   - Weekly Focus Hours Bar Chart with a daily target comparison line.
   - Subject-wise study time distribution percentages.
   - Productivity score (94%), peak focus hours insights, and milestone achievements.

9. **Notification Center:**
   - Real-time alerts for approaching deadlines, study streak achievements, and grades.
   - Categorized tabs (Deadlines, Achievements, Sessions).
   - "Mark all as read" and custom alert preferences.

10. **Student Profile:**
    - Profile banner with Student ID, University, Major, Semester, and Degree Progress.
    - Graduation requirement progress bar (Earned Credits / Target Credits).
    - Editable profile form with instant updates.
    - One-click "Export JSON" data backup.
