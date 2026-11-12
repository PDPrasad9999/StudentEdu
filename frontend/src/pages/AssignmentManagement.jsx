import React, { useState } from 'react'
import {
  CheckSquare,
  Plus,
  LayoutGrid,
  List,
  Filter,
  Search,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit2,
  ChevronRight,
  MoreVertical,
  Layers
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import AssignmentModal from '../components/assignments/AssignmentModal'
import {
  formatDate,
  getDaysRemaining,
  getPriorityColor,
  getStatusColor
} from '../utils/helpers'

const STATUSES = ['To Do', 'In Progress', 'Submitted', 'Graded']

export const AssignmentManagement = () => {
  const {
    assignments,
    subjects,
    updateAssignment,
    deleteAssignment,
    toggleSubtask
  } = useApp()

  const [viewMode, setViewMode] = useState('kanban') // 'kanban' | 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('ALL')
  const [selectedPriority, setSelectedPriority] = useState('ALL')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [assignmentToEdit, setAssignmentToEdit] = useState(null)

  // Filter assignments
  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject =
      selectedSubject === 'ALL' || a.subjectId === selectedSubject
    const matchesPriority =
      selectedPriority === 'ALL' || a.priority === selectedPriority
    return matchesSearch && matchesSubject && matchesPriority
  })

  const handleStatusChange = (assignmentId, newStatus) => {
    updateAssignment(assignmentId, {
      status: newStatus,
      progress: newStatus === 'Submitted' || newStatus === 'Graded' ? 100 : newStatus === 'In Progress' ? 50 : 0
    })
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Assignment Tracker & Deadlines</h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize coursework milestones, deliverables, and submissions across all enrolled subjects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table / List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => {
              setAssignmentToEdit(null)
              setIsModalOpen(true)
            }}
          >
            Add Assignment
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assignments or tags..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-700"
            >
              <option value="ALL">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-700"
            >
              <option value="ALL">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* View Mode 1: Kanban Board */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {STATUSES.map((status) => {
            const statusAssignments = filteredAssignments.filter((a) => a.status === status)

            return (
              <div
                key={status}
                className="bg-slate-100/70 rounded-2xl p-4 border border-slate-200/80 flex flex-col"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        status === 'To Do'
                          ? 'bg-slate-400'
                          : status === 'In Progress'
                          ? 'bg-blue-500 animate-pulse'
                          : status === 'Submitted'
                          ? 'bg-indigo-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <h3 className="font-bold text-sm text-slate-800">{status}</h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                    {statusAssignments.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {statusAssignments.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/40">
                      No assignments
                    </div>
                  ) : (
                    statusAssignments.map((asg) => {
                      const countdown = getDaysRemaining(asg.dueDate)
                      const priority = getPriorityColor(asg.priority)

                      return (
                        <div
                          key={asg.id}
                          className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <Badge variant="indigo" size="xs">
                              {asg.subjectCode}
                            </Badge>

                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${priority.bg} ${priority.text} ${priority.border}`}
                            >
                              {asg.priority}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-semibold text-sm text-slate-900 leading-snug">
                              {asg.title}
                            </h4>
                            {asg.description && (
                              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                                {asg.description}
                              </p>
                            )}
                          </div>

                          {/* Subtasks checklist if present */}
                          {asg.subtasks && asg.subtasks.length > 0 && (
                            <div className="space-y-1.5 pt-1 border-t border-slate-100">
                              <span className="text-[10px] uppercase font-bold text-slate-400">
                                Subtasks ({asg.subtasks.filter((s) => s.completed).length}/{asg.subtasks.length})
                              </span>
                              {asg.subtasks.slice(0, 3).map((st) => (
                                <label
                                  key={st.id}
                                  className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900"
                                >
                                  <input
                                    type="checkbox"
                                    checked={st.completed}
                                    onChange={() => toggleSubtask(asg.id, st.id)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                                  />
                                  <span className={st.completed ? 'line-through text-slate-400' : ''}>
                                    {st.title}
                                  </span>
                                </label>
                              ))}
                            </div>
                          )}

                          {/* Due Date & Urgency */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                            <span
                              className={`font-semibold inline-flex items-center gap-1 ${
                                countdown.isOverdue
                                  ? 'text-rose-600'
                                  : countdown.isUrgent
                                  ? 'text-amber-600'
                                  : 'text-slate-500'
                              }`}
                            >
                              <Clock className="w-3 h-3" />
                              {countdown.text}
                            </span>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  setAssignmentToEdit(asg)
                                  setIsModalOpen(true)
                                }}
                                className="p-1 rounded text-slate-400 hover:text-slate-700"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteAssignment(asg.id)}
                                className="p-1 rounded text-slate-400 hover:text-rose-600"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Quick Move Status Selector */}
                          <div className="pt-2">
                            <select
                              value={asg.status}
                              onChange={(e) => handleStatusChange(asg.id, e.target.value)}
                              className="w-full text-[11px] font-medium py-1 px-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 focus:outline-none"
                            >
                              <option value="To Do">Move to: To Do</option>
                              <option value="In Progress">Move to: In Progress</option>
                              <option value="Submitted">Move to: Submitted</option>
                              <option value="Graded">Move to: Graded</option>
                            </select>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* View Mode 2: Table / List View */
        <Card padding="p-0" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4">Subject</th>
                  <th className="py-3.5 px-4">Assignment Title</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Progress</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredAssignments.map((asg) => {
                  const countdown = getDaysRemaining(asg.dueDate)
                  const priority = getPriorityColor(asg.priority)
                  const statusColor = getStatusColor(asg.status)

                  return (
                    <tr key={asg.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-700">
                        <Badge variant="indigo" size="xs">
                          {asg.subjectCode}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                        {asg.title}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-700 block">
                          {formatDate(asg.dueDate)}
                        </span>
                        <span
                          className={`text-[10px] font-bold ${
                            countdown.isOverdue
                              ? 'text-rose-600'
                              : countdown.isUrgent
                              ? 'text-amber-600'
                              : 'text-slate-400'
                          }`}
                        >
                          {countdown.text}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border ${priority.bg} ${priority.text} ${priority.border}`}
                        >
                          {asg.priority}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border ${statusColor.bg} ${statusColor.text} ${statusColor.border}`}
                        >
                          {asg.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 w-36">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${asg.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium">
                            {asg.progress || 0}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setAssignmentToEdit(asg)
                              setIsModalOpen(true)
                            }}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteAssignment(asg.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Assignment Modal */}
      <AssignmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setAssignmentToEdit(null)
        }}
        assignmentToEdit={assignmentToEdit}
      />
    </div>
  )
}

export default AssignmentManagement
