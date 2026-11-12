import React, { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { useApp } from '../../context/AppContext'

const COLOR_OPTIONS = [
  '#2563EB', // Blue
  '#4F46E5', // Indigo
  '#0284C7', // Sky
  '#0D9488', // Teal
  '#7C3AED', // Violet
  '#E11D48', // Rose
  '#D97706', // Amber
  '#059669', // Emerald
]

export const SubjectModal = ({ isOpen, onClose, subjectToEdit = null }) => {
  const { addSubject, updateSubject } = useApp()

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    instructor: '',
    instructorEmail: '',
    color: '#2563EB',
    schedule: '',
    room: '',
    credits: 3,
    description: '',
  })

  useEffect(() => {
    if (subjectToEdit) {
      setFormData({
        code: subjectToEdit.code || '',
        name: subjectToEdit.name || '',
        instructor: subjectToEdit.instructor || '',
        instructorEmail: subjectToEdit.instructorEmail || '',
        color: subjectToEdit.color || '#2563EB',
        schedule: subjectToEdit.schedule || '',
        room: subjectToEdit.room || '',
        credits: subjectToEdit.credits || 3,
        description: subjectToEdit.description || '',
      })
    } else {
      setFormData({
        code: '',
        name: '',
        instructor: '',
        instructorEmail: '',
        color: '#2563EB',
        schedule: 'Mon, Wed 10:00 AM',
        room: 'Hall A',
        credits: 3,
        description: '',
      })
    }
  }, [subjectToEdit, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      ...formData,
      credits: parseInt(formData.credits, 10) || 3,
    }

    if (subjectToEdit) {
      updateSubject(subjectToEdit.id, payload)
    } else {
      addSubject(payload)
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={subjectToEdit ? 'Edit Subject' : 'Enroll New Subject'}
      subtitle="Organize course info, instructor contact, and credits"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {subjectToEdit ? 'Update Subject' : 'Add Subject'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Course Code *
            </label>
            <input
              type="text"
              required
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              placeholder="e.g. CS 301"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Subject Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Data Structures & Algorithms"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Instructor Name
            </label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              placeholder="e.g. Dr. Evelyn Vance"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Instructor Email
            </label>
            <input
              type="email"
              value={formData.instructorEmail}
              onChange={(e) => setFormData({ ...formData, instructorEmail: e.target.value })}
              placeholder="e.g. prof@university.edu"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Schedule Days/Time
            </label>
            <input
              type="text"
              value={formData.schedule}
              onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
              placeholder="Mon, Wed 10:00 AM"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Classroom / Room
            </label>
            <input
              type="text"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              placeholder="Hall B - Tech Bldg"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Credit Hours
            </label>
            <input
              type="number"
              min="1"
              max="6"
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Color Palette Picker */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Subject Color Tag
          </label>
          <div className="flex items-center gap-3">
            {COLOR_OPTIONS.map((c) => (
              <button
                type="button"
                key={c}
                onClick={() => setFormData({ ...formData, color: c })}
                style={{ backgroundColor: c }}
                className={`w-7 h-7 rounded-full transition-transform focus:outline-none ${
                  formData.color === c ? 'scale-125 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-110'
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Course Overview
          </label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Key syllabus objectives, midterm dates..."
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </form>
    </Modal>
  )
}

export default SubjectModal
