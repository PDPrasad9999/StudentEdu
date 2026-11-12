import React, { useState } from 'react'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckSquare,
  BookOpen,
  CalendarCheck,
  AlertCircle
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import SessionModal from '../components/planner/SessionModal'
import AssignmentModal from '../components/assignments/AssignmentModal'
import { formatDate, formatTime } from '../utils/helpers'

export const CalendarView = () => {
  const { assignments, studySessions, subjects } = useApp()

  // Base calendar state around November 2026
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(10) // 0-indexed: 10 is November
  const [selectedDay, setSelectedDay] = useState(12)
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false)
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Days in month calculation
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()

  // Format date helper: YYYY-MM-DD
  const formatIsoDate = (day) => {
    const m = (currentMonth + 1).toString().padStart(2, '0')
    const d = day.toString().padStart(2, '0')
    return `${currentYear}-${m}-${d}`
  }

  const selectedDateStr = formatIsoDate(selectedDay)

  // Events on selected day
  const dayAssignments = assignments.filter((a) => a.dueDate === selectedDateStr)
  const daySessions = studySessions.filter((s) => s.date === selectedDateStr)

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Academic Calendar</h2>
          <p className="text-xs text-slate-500 mt-1">
            Track assignment due dates, scheduled focus blocks, and exam timelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={CalendarCheck}
            onClick={() => setIsSessionModalOpen(true)}
          >
            Schedule Block
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsAssignmentModalOpen(true)}
          >
            Add Deadline
          </Button>
        </div>
      </div>

      {/* Main Grid: Calendar (8 cols) + Selected Day Agenda (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid (8 cols) */}
        <div className="lg:col-span-8">
          <Card padding="p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900">
                  {monthNames[currentMonth]} {currentYear}
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  Semester 5
                </span>
              </div>

              <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setCurrentYear(2026)
                    setCurrentMonth(10)
                    setSelectedDay(12)
                  }}
                  className="px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-white rounded-lg transition-colors"
                >
                  Today
                </button>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-xs font-bold text-slate-400 uppercase tracking-wider py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Blank empty slots for offset */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[76px] rounded-xl bg-slate-50/40 opacity-40" />
              ))}

              {/* Real day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const dayNumber = i + 1
                const dayIso = formatIsoDate(dayNumber)
                const isSelected = selectedDay === dayNumber
                const isToday = currentYear === 2026 && currentMonth === 10 && dayNumber === 12

                const asgs = assignments.filter((a) => a.dueDate === dayIso)
                const sess = studySessions.filter((s) => s.date === dayIso)

                return (
                  <button
                    key={dayNumber}
                    onClick={() => setSelectedDay(dayNumber)}
                    className={`min-h-[82px] p-2 rounded-xl border text-left transition-all relative flex flex-col justify-between group ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                        : isToday
                        ? 'border-blue-300 bg-blue-50/20'
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                          isToday
                            ? 'bg-blue-600 text-white shadow-xs'
                            : isSelected
                            ? 'text-blue-700 font-extrabold'
                            : 'text-slate-700'
                        }`}
                      >
                        {dayNumber}
                      </span>
                    </div>

                    {/* Event pills on the day cell */}
                    <div className="space-y-1 mt-1">
                      {asgs.slice(0, 1).map((a) => (
                        <div
                          key={a.id}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 truncate"
                          title={a.title}
                        >
                          Due: {a.subjectCode}
                        </div>
                      ))}
                      {sess.slice(0, 1).map((s) => (
                        <div
                          key={s.id}
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 truncate"
                          title={s.title}
                        >
                          Study: {s.subjectCode}
                        </div>
                      ))}
                      {asgs.length + sess.length > 2 && (
                        <span className="text-[9px] font-medium text-slate-400 pl-0.5 block">
                          +{asgs.length + sess.length - 2} more
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Selected Day Agenda (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Selected Agenda
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  {formatDate(selectedDateStr)}
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-blue-600">
                  {dayAssignments.length + daySessions.length} Events
                </span>
              </div>
            </div>

            {/* Assignments due this day */}
            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                Deadlines Due ({dayAssignments.length})
              </h4>
              {dayAssignments.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No deadlines due on this date</p>
              ) : (
                <div className="space-y-2">
                  {dayAssignments.map((a) => (
                    <div
                      key={a.id}
                      className="p-2.5 rounded-xl border border-rose-200 bg-rose-50/40 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>{a.subjectCode}</span>
                        <span className="text-rose-600">{a.dueTime}</span>
                      </div>
                      <p className="font-medium text-slate-700 mt-0.5 truncate">{a.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Focus sessions on this day */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                Study Sessions ({daySessions.length})
              </h4>
              {daySessions.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No study sessions scheduled</p>
              ) : (
                <div className="space-y-2">
                  {daySessions.map((s) => (
                    <div
                      key={s.id}
                      className="p-2.5 rounded-xl border border-blue-200 bg-blue-50/40 text-xs"
                    >
                      <div className="flex items-center justify-between font-bold text-slate-800">
                        <span>{s.subjectCode}</span>
                        <span className="text-blue-700">
                          {formatTime(s.startTime)} - {formatTime(s.endTime)}
                        </span>
                      </div>
                      <p className="font-medium text-slate-700 mt-0.5 truncate">{s.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

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

export default CalendarView
