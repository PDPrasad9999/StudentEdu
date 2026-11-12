import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Sidebar from './components/common/Sidebar'
import Navbar from './components/common/Navbar'

// Pages
import Dashboard from './pages/Dashboard'
import StudyPlanner from './pages/StudyPlanner'
import SubjectManagement from './pages/SubjectManagement'
import AssignmentManagement from './pages/AssignmentManagement'
import CalendarView from './pages/CalendarView'
import Notes from './pages/Notes'
import PomodoroTimer from './pages/PomodoroTimer'
import ProgressAnalytics from './pages/ProgressAnalytics'
import Notifications from './pages/Notifications'
import StudentProfile from './pages/StudentProfile'

// Quick Modals
import AssignmentModal from './components/assignments/AssignmentModal'
import SessionModal from './components/planner/SessionModal'
import SubjectModal from './components/subjects/SubjectModal'
import NoteModal from './components/notes/NoteModal'

const AppLayout = () => {
  const [quickModalType, setQuickModalType] = useState(null) // 'assignment' | 'session' | 'subject' | 'note' | null

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all">
        {/* Sticky Header Navbar */}
        <Navbar onOpenQuickAction={(type) => setQuickModalType(type)} />

        {/* Dynamic Page Router Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/planner" element={<StudyPlanner />} />
            <Route path="/subjects" element={<SubjectManagement />} />
            <Route path="/assignments" element={<AssignmentManagement />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/timer" element={<PomodoroTimer />} />
            <Route path="/analytics" element={<ProgressAnalytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<StudentProfile />} />
            {/* Catch-all redirect to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Quick Action Modals */}
      <AssignmentModal
        isOpen={quickModalType === 'assignment'}
        onClose={() => setQuickModalType(null)}
      />
      <SessionModal
        isOpen={quickModalType === 'session'}
        onClose={() => setQuickModalType(null)}
      />
      <SubjectModal
        isOpen={quickModalType === 'subject'}
        onClose={() => setQuickModalType(null)}
      />
      <NoteModal
        isOpen={quickModalType === 'note'}
        onClose={() => setQuickModalType(null)}
      />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
