import React, { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { useApp } from '../../context/AppContext'

export const SessionModal = ({ isOpen, onClose, sessionToEdit = null }) => {
  const { subjects, addStudySession, updateStudySession } = useApp()

  const [formData, setFormData] = useState({
    title: '',
    subjectId: '',
    date: '',
    startTime: '10:00',
    endTime: '11:30',
    durationMinutes: 90,
    notes: '',
  })

  useEffect(() => {
    if (sessionToEdit) {
      setFormData({
        title: sessionToEdit.title || '',
        subjectId: sessionToEdit.subjectId || (subjects[0]?.id || ''),
        date: sessionToEdit.date || '',
        startTime: sessionToEdit.startTime || '10:00',
        endTime: sessionToEdit.endTime || '11:30',
        durationMinutes: sessionToEdit.durationMinutes || 90,
        notes: sessionToEdit.notes || '',
      })
    } else {
      setFormData({
        title: '',
        subjectId: subjects[0]?.id || '',
        date: new Date().toISOString().split('T')[0],
        startTime: '14:00',
        endTime: '15:30',
        durationMinutes: 90,
        notes: '',
      })
    }
  }, [sessionToEdit, subjects, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedSub = subjects.find((s) => s.id === formData.subjectId)

    const payload = {
      title: formData.title,
      subjectId: formData.subjectId,
      subjectCode: selectedSub ? selectedSub.code : 'GEN',
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      durationMinutes: parseInt(formData.durationMinutes, 10) || 60,
      notes: formData.notes,
      status: 'Planned',
      completed: false,
    }

    if (sessionToEdit) {
      updateStudySession(sessionToEdit.id, payload)
    } else {
      addStudySession(payload)
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={sessionToEdit ? 'Edit Study Session' : 'Schedule Study Session'}
      subtitle="Dedicate focused blocks for maximum productivity"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {sessionToEdit ? 'Save Session' : 'Schedule Session'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Session Goal / Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Chapter 4 Practice Problems & Flashcards"
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
              Date *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Start Time
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              End Time
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Duration (Mins)
            </label>
            <input
              type="number"
              min="15"
              step="15"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Session Notes / Specific Topics
          </label>
          <textarea
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Key concepts to memorize, equations to practice..."
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </form>
    </Modal>
  )
}

export default SessionModal
