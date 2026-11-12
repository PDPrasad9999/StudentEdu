import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  Search,
  Bell,
  Plus,
  Timer,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  BookOpen,
  CheckSquare,
  CalendarCheck,
  FileText,
  Flame,
  Check,
  Sparkles
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import Button from './Button'

const pageTitles = {
  '/': 'Student Dashboard',
  '/planner': 'Study Planner',
  '/subjects': 'Subject Management',
  '/assignments': 'Assignment Management',
  '/calendar': 'Academic Calendar',
  '/notes': 'Study Notes & Knowledge Base',
  '/timer': 'Pomodoro Study Timer',
  '/analytics': 'Academic Progress & Analytics',
  '/notifications': 'Notification Center',
  '/profile': 'Student Profile & Settings'
}

export const Navbar = ({ onOpenQuickAction }) => {
  const location = useLocation()
  const {
    user,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    isTimerRunning,
    timeLeft,
    timerMode,
    setIsMobileSidebarOpen,
    searchQuery,
    setSearchQuery,
    backendStatus
  } = useApp()

  const [showNotifMenu, setShowNotifMenu] = useState(false)
  const [showQuickMenu, setShowQuickMenu] = useState(false)
  const notifRef = useRef(null)
  const quickRef = useRef(null)

  const unreadNotifs = notifications.filter((n) => n.unread)
  const pageTitle = pageTitles[location.pathname] || 'SmartEdu'

  // Format seconds into mm:ss
  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Close menus on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifMenu(false)
      }
      if (quickRef.current && !quickRef.current.contains(e.target)) {
        setShowQuickMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {pageTitle}
          </h2>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, assignments, notes..."
            className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Backend Connectivity Status Pill */}
        <div
          title={
            backendStatus === 'connected'
              ? 'Backend API & MongoDB Connected'
              : 'App running in local reactive mode (Ready for MongoDB backend)'
          }
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border bg-slate-50 border-slate-200 text-slate-600"
        >
          <span
            className={`w-2 h-2 rounded-full ${
              backendStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'
            }`}
          />
          <span>{backendStatus === 'connected' ? 'MongoDB Synced' : 'Ready for API'}</span>
        </div>

        {/* Active Pomodoro Timer Pill */}
        {isTimerRunning && (
          <Link
            to="/timer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold hover:bg-blue-100 transition-colors animate-pulse"
          >
            <Timer className="w-3.5 h-3.5" />
            <span>{formatSeconds(timeLeft)}</span>
            <span className="text-[10px] uppercase text-blue-500 font-bold hidden sm:inline">
              ({timerMode === 'work' ? 'Focus' : 'Break'})
            </span>
          </Link>
        )}

        {/* Quick Action Dropdown */}
        <div className="relative" ref={quickRef}>
          <Button
            size="sm"
            variant="primary"
            icon={Plus}
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="shadow-sm shadow-blue-500/20"
          >
            <span className="hidden sm:inline">Create</span>
          </Button>

          {showQuickMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Quick Create
              </div>
              <button
                onClick={() => {
                  setShowQuickMenu(false)
                  onOpenQuickAction?.('assignment')
                }}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5"
              >
                <CheckSquare className="w-4 h-4 text-blue-600" />
                <span>New Assignment</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickMenu(false)
                  onOpenQuickAction?.('session')
                }}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5"
              >
                <CalendarCheck className="w-4 h-4 text-indigo-600" />
                <span>Study Session</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickMenu(false)
                  onOpenQuickAction?.('note')
                }}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>Quick Note</span>
              </button>
              <button
                onClick={() => {
                  setShowQuickMenu(false)
                  onOpenQuickAction?.('subject')
                }}
                className="w-full px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5"
              >
                <BookOpen className="w-4 h-4 text-violet-600" />
                <span>New Subject</span>
              </button>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifs.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-slate-900">Notifications</h4>
                  {unreadNotifs.length > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                      {unreadNotifs.length} new
                    </span>
                  )}
                </div>
                {unreadNotifs.length > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-3.5 transition-colors cursor-pointer hover:bg-slate-50 ${
                      n.unread ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                    <div className="flex items-center justify-between mt-2 pt-1">
                      <span className="text-[10px] text-slate-400">
                        {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {n.link && (
                        <Link
                          to={n.link}
                          onClick={() => setShowNotifMenu(false)}
                          className="text-[11px] text-blue-600 hover:underline font-medium"
                        >
                          View Details &rarr;
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-slate-100 text-center bg-slate-50/50">
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifMenu(false)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold block py-1"
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Student Profile Avatar */}
        <Link
          to="/profile"
          className="flex items-center gap-2.5 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-colors group"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/40"
          />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-semibold text-slate-900 leading-tight">{user.name}</p>
            <p className="text-[10px] font-medium text-blue-600">GPA {user.gpa.toFixed(2)}</p>
          </div>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
