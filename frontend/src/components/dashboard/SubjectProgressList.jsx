import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, ChevronRight, FileText, CheckSquare } from 'lucide-react'
import Card, { CardHeader } from '../common/Card'
import Badge from '../common/Badge'

export const SubjectProgressList = ({ subjects = [] }) => {
  return (
    <Card>
      <CardHeader
        title="Enrolled Subjects & Grades"
        subtitle="Course academic standing and syllabus milestones"
        icon={BookOpen}
        action={
          <Link
            to="/subjects"
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
          >
            <span>Manage All</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((sub) => (
          <div
            key={sub.id}
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all bg-white flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: `${sub.color}15`, color: sub.color }}
                >
                  {sub.code}
                </span>

                <div className="text-right">
                  <span className="text-sm font-bold text-slate-800">
                    {sub.currentGrade ? `${sub.currentGrade}%` : 'N/A'}
                  </span>
                  <span className="text-xs font-semibold text-blue-600 ml-1">
                    ({sub.letterGrade || 'A'})
                  </span>
                </div>
              </div>

              <h4 className="font-semibold text-sm text-slate-900 line-clamp-1 mb-1">
                {sub.name}
              </h4>
              <p className="text-xs text-slate-500 mb-3">{sub.instructor}</p>
            </div>

            <div>
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Syllabus Covered</span>
                  <span className="font-semibold text-slate-700">{sub.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${sub.progress}%`,
                      backgroundColor: sub.color || '#2563EB'
                    }}
                  />
                </div>
              </div>

              {/* Counts footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <CheckSquare className="w-3 h-3 text-slate-400" />
                  {sub.assignmentsCount} assignments
                </span>
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3 text-slate-400" />
                  {sub.notesCount} notes
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SubjectProgressList
