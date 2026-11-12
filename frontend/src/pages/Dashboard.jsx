import React, { useState } from 'react'
import {
  Sparkles,
  BookOpen,
  CalendarCheck,
  CheckSquare,
  Flame,
  Award,
  Clock,
  TrendingUp,
  Plus,
  ArrowRight,
  Brain,
  Lightbulb
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import StatCard from '../components/dashboard/StatCard'
import ScheduleTimeline from '../components/dashboard/ScheduleTimeline'
import UrgentDeadlines from '../components/dashboard/UrgentDeadlines'
import QuickPomodoroCard from '../components/dashboard/QuickPomodoroCard'
import SubjectProgressList from '../components/dashboard/SubjectProgressList'
import Button from '../components/common/Button'
import SessionModal from '../components/planner/SessionModal'
import AssignmentModal from '../components/assignments/AssignmentModal'

export const Dashboard = () => {
  const {
    user,
    subjects,
    assignments,
    studySessions,
    toggleSessionComplete
  } = useApp()

  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false)
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false)

  // Calculations for KPI
  const pendingAssignments = assignments.filter(
    (a) => a.status === 'To Do' || a.status === 'In Progress'
  ).length
  const todaySessions = studySessions.filter((s) => s.date === '2026-11-12')
  const completedTodaySessions = todaySessions.filter((s) => s.completed).length

  // Current formatted date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date('2026-11-12'))

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-6 sm:p-8 shadow-soft-lg">
        {/* Decorative background shapes */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-16 w-48 h-48 rounded-full bg-blue-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{user.semester} • {todayFormatted}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user.name}! 🚀
            </h1>
            <p className="text-sm text-blue-100 max-w-xl leading-relaxed">
              "Continuous effort – not strength or intelligence – is the key to unlocking our potential." You have <strong className="text-white font-semibold">{pendingAssignments} pending assignments</strong> and <strong className="text-white font-semibold">{todaySessions.length - completedTodaySessions} study blocks</strong> left today.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button
              variant="outline"
              size="md"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 shadow-none"
              icon={CalendarCheck}
              onClick={() => setIsSessionModalOpen(true)}
            >
              Plan Session
            </Button>
            <Button
              variant="primary"
              size="md"
              className="bg-white hover:bg-blue-50 text-blue-700 font-bold shadow-md shadow-blue-900/20"
              icon={Plus}
              onClick={() => setIsAssignmentModalOpen(true)}
            >
              New Assignment
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Active Deadlines"
          value={pendingAssignments}
          subtitle="assignments remaining"
          icon={CheckSquare}
          trend="+2"
          trendPositive={false}
          color="blue"
        />

        <StatCard
          title="Focus Hours"
          value={`${user.totalFocusHours}h`}
          subtitle="logged this semester"
          icon={Clock}
          trend="+14%"
          trendPositive={true}
          color="indigo"
        />

        <StatCard
          title="Study Streak"
          value={`${user.currentStreak} Days`}
          subtitle={`Best: ${user.longestStreak} days`}
          icon={Flame}
          trend="🔥 Active"
          trendPositive={true}
          color="amber"
        />

        <StatCard
          title="Cumulative GPA"
          value={user.gpa.toFixed(2)}
          subtitle={`Target: ${user.targetGpa.toFixed(2)}`}
          icon={Award}
          trend="Top 5%"
          trendPositive={true}
          color="emerald"
        />
      </div>

      {/* Main Content Split: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Timeline & Subject Progress */}
        <div className="lg:col-span-8 space-y-6">
          {/* Today's Schedule Timeline */}
          <ScheduleTimeline
            sessions={todaySessions}
            onToggleComplete={toggleSessionComplete}
            onAddSession={() => setIsSessionModalOpen(true)}
          />

          {/* Subjects Progress List */}
          <SubjectProgressList subjects={subjects} />
        </div>

        {/* Right Column (4 cols): Quick Pomodoro & Upcoming Deadlines */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Pomodoro Card */}
          <QuickPomodoroCard />

          {/* Urgent Deadlines Widget */}
          <UrgentDeadlines assignments={assignments} />

          {/* Smart Study Tip of the Day */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-amber-800">
              <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Smart Study Insight
              </h4>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Spaced Repetition Tip:</strong> Reviewing Data Structures algorithms 24 hours after your lecture increases retention rate by <strong>45%</strong> compared to cramming before exams.
            </p>
          </div>
        </div>
      </div>

      {/* Modals for quick adding */}
      <SessionModal
        isOpen={isSessionModalOpen}
        onClose={() => setIsSessionModalOpen(false)}
      />

      <AssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
      />
    </div>
  )
}

export default Dashboard
