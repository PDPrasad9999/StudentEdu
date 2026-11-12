import React, { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { useApp } from '../../context/AppContext'

export const AssignmentModal = ({ isOpen, onClose, assignmentToEdit = null }) => {
  const { subjects, addAssignment, updateAssignment } = useApp()

  const [formData, setFormData] = useState({
    title: '',
    subjectId: '',
    description: '',
    dueDate: '',
    dueTime: '23:59',
    priority: 'Medium',
    status: 'To Do',
    estimatedMinutes: 120,
    submissionFormat: '',
    tags: '',
  })

  useEffect(() => {
    if (assignmentToEdit) {
      setFormData({
        title: assignmentToEdit.title || '',
        subjectId: assignmentToEdit.subjectId || (subjects[0]?.id || ''),
        description: assignmentToEdit.description || '',
        dueDate: assignmentToEdit.dueDate || '',
        dueTime: assignmentToEdit.dueTime || '23:59',
        priority: assignmentToEdit.priority || 'Medium',
        status: assignmentToEdit.status || 'To Do',
        estimatedMinutes: assignmentToEdit.estimatedMinutes || 120,
        submissionFormat: assignmentToEdit.submissionFormat || '',
        tags: assignmentToEdit.tags?.join(', ') || '',
      })
    } else {
      setFormData({
        title: '',
        subjectId: subjects[0]?.id || '',
        description: '',
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        dueTime: '23:59',
        priority: 'Medium',
        status: 'To Do',
        estimatedMinutes: 120,
        submissionFormat: 'PDF or Code Repo',
        tags: 'Homework, Priority',
      })
    }
  }, [assignmentToEdit, subjects, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedSub = subjects.find((s) => s.id === formData.subjectId)

    const payload = {
      title: formData.title,
      subjectId: formData.subjectId,
      subjectCode: selectedSub ? selectedSub.code : 'GEN',
      subjectName: selectedSub ? selectedSub.name : 'General',
      description: formData.description,
      dueDate: formData.dueDate,
      dueTime: formData.dueTime,
      priority: formData.priority,
      status: formData.status,
      estimatedMinutes: parseInt(formData.estimatedMinutes, 10) || 60,
      submissionFormat: formData.submissionFormat,
      tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    }

    if (assignmentToEdit) {
      updateAssignment(assignmentToEdit.id, payload)
    } else {
      addAssignment(payload)
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={assignmentToEdit ? 'Edit Assignment' : 'Create New Assignment'}
      subtitle="Track your coursework deliverables and deadlines"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {assignmentToEdit ? 'Save Changes' : 'Create Assignment'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Assignment Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Implement Red-Black Tree"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject *
            </label>
            <select
              value={formData.subjectId}
              onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.code} - {sub.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Due Time
            </label>
            <input
              type="time"
              value={formData.dueTime}
              onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Submitted">Submitted</option>
              <option value="Graded">Graded</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description & Instructions
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Key requirements, rubric notes, questions to answer..."
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Time (Minutes)
            </label>
            <input
              type="number"
              min="15"
              step="15"
              value={formData.estimatedMinutes}
              onChange={(e) => setFormData({ ...formData, estimatedMinutes: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. Lab, Project, Python"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AssignmentModal
