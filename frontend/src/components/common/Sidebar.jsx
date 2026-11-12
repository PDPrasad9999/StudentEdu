import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  CalendarCheck,
  BookOpen,
  CheckSquare,
  Calendar,
  FileText,
  Timer,
  BarChart3,
  Bell,
  User,
  GraduationCap,
  Flame,
  X
} from 'lucide-react'
import { useApp } from '../../context/AppContext'

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Study Planner', path: '/planner', icon: CalendarCheck },
  { name: 'Subjects', path: '/subjects', icon: BookOpen },
  { name: 'Assignments', path: '/assignments', icon: CheckSquare, badgeKey: 'assignments' },
  { name: 'Calendar', path: '/calendar', icon: Calendar },
  { name: 'Notes', path: '/notes', icon: FileText },
  { name: 'Pomodoro Timer', path: '/timer', icon: Timer },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Notifications', path: '/notifications', icon: Bell, badgeKey: 'notifications' },
  { name: 'Student Profile', path: '/profile', icon: User },
]

export const Sidebar = () => {
  const {
    user,
    notifications,
    assignments,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useApp()

  const unreadNotifs = notifications.filter((n) => n.unread).length
  const pendingAssignments = assignments.filter((a) => a.status === 'To Do' || a.status === 'In Progress').length

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileSidebarOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Logo Header */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-lg leading-tight tracking-tight">
                  Smart<span className="text-blue-600">Edu</span>
                </h1>
                <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Planner & Tracker
                </p>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)]">
            <div className="px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </div>

            {navItems.map((item) => {
              const Icon = item.icon
              const hasBadge =
                (item.badgeKey === 'notifications' && unreadNotifs > 0) ||
                (item.badgeKey === 'assignments' && pendingAssignments > 0)

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-blue-600'
                              : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      {/* Badges */}
                      {item.badgeKey === 'notifications' && unreadNotifs > 0 && (
                        <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-bold text-white bg-blue-600 rounded-full min-w-5">
                          {unreadNotifs}
                        </span>
                      )}
                      {item.badgeKey === 'assignments' && pendingAssignments > 0 && (
                        <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-medium text-slate-600 bg-slate-100 rounded-full min-w-5">
                          {pendingAssignments}
                        </span>
                      )}

                      {/* Active indicator bar */}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-md" />
                      )}
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer Widget: Study Streak */}
        <div className="p-3 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
                <span className="text-xs font-semibold tracking-wide uppercase text-blue-100">
                  Study Streak
                </span>
              </div>
              <span className="text-base font-extrabold">{user.currentStreak} Days</span>
            </div>
            <p className="text-[11px] text-blue-100 leading-relaxed">
              Target: {user.dailyGoalMinutes}m daily focus. Today: {user.todayFocusMinutes}m.
            </p>
            <div className="w-full bg-blue-900/40 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div
                className="bg-amber-300 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round((user.todayFocusMinutes / user.dailyGoalMinutes) * 100))}%`
                }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
