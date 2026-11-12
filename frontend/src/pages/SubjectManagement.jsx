import React, { useState } from 'react'
import {
  BookOpen,
  Plus,
  Search,
  User,
  Mail,
  MapPin,
  Clock,
  Award,
  FileText,
  CheckSquare,
  Edit2,
  Trash2,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import SubjectModal from '../components/subjects/SubjectModal'

export const SubjectManagement = () => {
  const { subjects, assignments, notes, deleteSubject } = useApp()

  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [subjectToEdit, setSubjectToEdit] = useState(null)
  const [selectedSubjectDetail, setSelectedSubjectDetail] = useState(null)

  const filteredSubjects = subjects.filter((s) => {
    const term = searchTerm.toLowerCase()
    return (
      s.code.toLowerCase().includes(term) ||
      s.name.toLowerCase().includes(term) ||
      s.instructor.toLowerCase().includes(term)
    )
  })

  // Total credits sum
  const totalCredits = subjects.reduce((sum, s) => sum + (s.credits || 0), 0)

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Enrolled Subjects & Courses</h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage course syllabi, instructor info, credit distribution, and academic standings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700">
            <span>Enrolled Credits: <strong>{totalCredits} hrs</strong></span>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => {
              setSubjectToEdit(null)
              setIsModalOpen(true)
            }}
          >
            Add Subject
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by code, subject title, or instructor..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-400"
        />
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((sub) => {
          const subAssignments = assignments.filter((a) => a.subjectId === sub.id)
          const subNotes = notes.filter((n) => n.subjectId === sub.id)

          return (
            <Card
              key={sub.id}
              hover
              className="flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Colored top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: sub.color || '#2563EB' }}
              />

              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md inline-block mb-1"
                      style={{
                        backgroundColor: `${sub.color || '#2563EB'}15`,
                        color: sub.color || '#2563EB'
                      }}
                    >
                      {sub.code}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                      {sub.name}
                    </h3>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-extrabold text-slate-900">
                      {sub.currentGrade ? `${sub.currentGrade}%` : 'N/A'}
                    </span>
                    <span className="text-xs font-bold text-blue-600 block">
                      Grade {sub.letterGrade || 'A'}
                    </span>
                  </div>
                </div>

                {/* Details list */}
                <div className="space-y-1.5 text-xs text-slate-600 mb-4">
                  {sub.instructor && (
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{sub.instructor}</span>
                    </div>
                  )}

                  {sub.instructorEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <a
                        href={`mailto:${sub.instructorEmail}`}
                        className="text-blue-600 hover:underline truncate"
                      >
                        {sub.instructorEmail}
                      </a>
                    </div>
                  )}

                  {sub.schedule && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{sub.schedule}</span>
                    </div>
                  )}

                  {sub.room && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{sub.room} ({sub.credits} Credits)</span>
                    </div>
                  )}
                </div>

                {/* Syllabus Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Syllabus Completion</span>
                    <strong className="text-slate-800">{sub.progress}%</strong>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${sub.progress}%`,
                        backgroundColor: sub.color || '#2563EB'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer with counts and actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <CheckSquare className="w-3.5 h-3.5 text-blue-500" />
                    {subAssignments.length}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" />
                    {subNotes.length}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setSubjectToEdit(sub)
                      setIsModalOpen(true)
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Edit Subject"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete subject ${sub.code}? All linked assignments and notes will also be removed.`)) {
                        deleteSubject(sub.id)
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Subject"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Subject Modal */}
      <SubjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSubjectToEdit(null)
        }}
        subjectToEdit={subjectToEdit}
      />
    </div>
  )
}

export default SubjectManagement
