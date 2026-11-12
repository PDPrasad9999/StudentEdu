import React from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, Clock, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'
import Card, { CardHeader } from '../common/Card'
import Badge from '../common/Badge'
import { formatDate, getDaysRemaining, getPriorityColor } from '../../utils/helpers'

export const UrgentDeadlines = ({ assignments = [] }) => {
  // Filter active assignments and sort by due date ascending
  const upcoming = assignments
    .filter((a) => a.status !== 'Graded' && a.status !== 'Submitted')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5)

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <CardHeader
          title="Upcoming Deadlines"
          subtitle="Prioritized assignments sorted by urgency"
          icon={AlertCircle}
          action={
            <Link
              to="/assignments"
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          }
        />

        {upcoming.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <CheckCircle2 className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
            <p className="text-sm font-medium">All caught up!</p>
            <p className="text-xs text-slate-400 mt-1">No pending assignment deadlines</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcoming.map((asg) => {
              const countdown = getDaysRemaining(asg.dueDate)
              const priority = getPriorityColor(asg.priority)

              return (
                <div
                  key={asg.id}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="indigo" size="xs">
                          {asg.subjectCode}
                        </Badge>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${priority.bg} ${priority.text} ${priority.border}`}
                        >
                          {asg.priority} Priority
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 truncate">
                        {asg.title}
                      </h4>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
                          countdown.isOverdue
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : countdown.isUrgent
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-50 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        {countdown.text}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Due {formatDate(asg.dueDate)}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${asg.progress || 0}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      {asg.progress || 0}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          Total pending: <strong className="text-slate-800">{upcoming.length}</strong> tasks
        </span>
        <Link
          to="/assignments"
          className="text-blue-600 hover:underline font-medium"
        >
          Manage submissions &rarr;
        </Link>
      </div>
    </Card>
  )
}

export default UrgentDeadlines
