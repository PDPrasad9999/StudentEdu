import React from 'react'
import { Clock, CheckCircle2, Circle, ArrowRight, CalendarPlus } from 'lucide-react'
import Card, { CardHeader } from '../common/Card'
import Badge from '../common/Badge'
import Button from '../common/Button'
import { formatTime } from '../../utils/helpers'

export const ScheduleTimeline = ({ sessions = [], onToggleComplete, onAddSession }) => {
  // Sort sessions by start time
  const sorted = [...sessions].sort((a, b) => (a.startTime > b.startTime ? 1 : -1))

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <CardHeader
          title="Today's Study Plan"
          subtitle="Scheduled focus sessions for optimal memory retention"
          icon={Clock}
          action={
            <Button
              size="sm"
              variant="secondary"
              icon={CalendarPlus}
              onClick={onAddSession}
            >
              Add Block
            </Button>
          }
        />

        {sorted.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <Clock className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-medium">No study sessions scheduled for today</p>
            <p className="text-xs text-slate-400 mt-1">Plan your day to stay focused and hit your goals</p>
          </div>
        ) : (
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {sorted.map((session) => (
              <div
                key={session.id}
                className="relative group transition-all"
              >
                {/* Timeline node */}
                <button
                  onClick={() => onToggleComplete?.(session.id)}
                  className="absolute -left-6 top-1 transform -translate-x-1/2 bg-white rounded-full focus:outline-none transition-transform group-hover:scale-125"
                  title={session.completed ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {session.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                  )}
                </button>

                {/* Session Card content */}
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    session.completed
                      ? 'bg-slate-50/70 border-slate-200/60 opacity-75'
                      : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="xs">
                        {session.subjectCode}
                      </Badge>
                      <span className="text-xs font-semibold text-slate-500">
                        {formatTime(session.startTime)} - {formatTime(session.endTime)}
                      </span>
                    </div>

                    <span className="text-xs text-slate-400 font-medium">
                      {session.durationMinutes} mins
                    </span>
                  </div>

                  <h4
                    className={`text-sm font-semibold mt-1.5 ${
                      session.completed ? 'line-through text-slate-500' : 'text-slate-800'
                    }`}
                  >
                    {session.title}
                  </h4>

                  {session.notes && (
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1 italic">
                      "{session.notes}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          Completed:{' '}
          <strong className="text-slate-700">
            {sorted.filter((s) => s.completed).length}/{sorted.length}
          </strong>
        </span>
        <span className="text-blue-600 font-medium">Keep up the great work!</span>
      </div>
    </Card>
  )
}

export default ScheduleTimeline
