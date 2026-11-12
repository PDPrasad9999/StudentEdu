import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Check,
  CheckCheck,
  Clock,
  AlertTriangle,
  Award,
  CalendarCheck,
  Settings,
  Trash2,
  ExternalLink
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import { formatDate } from '../utils/helpers'

export const Notifications = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    user,
    updateUser
  } = useApp()

  const [activeTab, setActiveTab] = useState('ALL') // 'ALL' | 'UNREAD' | 'deadline' | 'achievement' | 'session'

  const filteredNotifs = notifications.filter((n) => {
    if (activeTab === 'UNREAD') return n.unread
    if (activeTab !== 'ALL') return n.type === activeTab
    return true
  })

  const unreadCount = notifications.filter((n) => n.unread).length

  const getIconForType = (type) => {
    switch (type) {
      case 'deadline':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />
      case 'achievement':
        return <Award className="w-5 h-5 text-amber-500" />
      case 'session':
        return <CalendarCheck className="w-5 h-5 text-blue-500" />
      default:
        return <Bell className="w-5 h-5 text-indigo-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Notification Center</h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time alerts for impending assignment deadlines, study reminders, and achievements.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            icon={CheckCheck}
            onClick={markAllNotificationsRead}
          >
            Mark All as Read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'ALL'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          onClick={() => setActiveTab('UNREAD')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'UNREAD'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          onClick={() => setActiveTab('deadline')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'deadline'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Deadlines
        </button>

        <button
          onClick={() => setActiveTab('achievement')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'achievement'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Achievements
        </button>

        <button
          onClick={() => setActiveTab('session')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'session'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Study Sessions
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <Card className="py-16 text-center text-slate-400">
            <Bell className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-base font-semibold text-slate-700">No notifications here</p>
            <p className="text-xs text-slate-400 mt-1">You are all caught up on all alerts!</p>
          </Card>
        ) : (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                n.unread
                  ? 'bg-blue-50/50 border-blue-200 shadow-xs'
                  : 'bg-white border-slate-200/90 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex-shrink-0 mt-0.5 sm:mt-0 shadow-2xs">
                  {getIconForType(n.type)}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                    {n.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                    <span className="text-[10px] text-slate-400 font-medium">
                      {new Date(n.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {n.message}
                  </p>
                </div>
              </div>

              {/* Action link */}
              {n.link && (
                <Link
                  to={n.link}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 self-end sm:self-center flex-shrink-0"
                >
                  <span>Go to action</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))
        )}
      </div>

      {/* Notification Preferences Card */}
      <Card>
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
          <Settings className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-sm text-slate-900">
            Notification & Alert Preferences
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">Email Deadline Alerts</span>
              <span className="text-slate-500">Receive email alerts 48h before due dates</span>
            </div>
            <input
              type="checkbox"
              checked={user.settings?.emailAlerts ?? true}
              onChange={(e) =>
                updateUser({
                  settings: { ...user.settings, emailAlerts: e.target.checked }
                })
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
            <div>
              <span className="font-bold text-slate-800 block">Browser Push Notifications</span>
              <span className="text-slate-500">Alerts when Pomodoro focus breaks end</span>
            </div>
            <input
              type="checkbox"
              checked={user.settings?.notificationsEnabled ?? true}
              onChange={(e) =>
                updateUser({
                  settings: { ...user.settings, notificationsEnabled: e.target.checked }
                })
              }
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
          </label>
        </div>
      </Card>
    </div>
  )
}

export default Notifications
