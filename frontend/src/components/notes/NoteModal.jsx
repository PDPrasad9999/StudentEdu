import React, { useState, useEffect } from 'react'
import Modal from '../common/Modal'
import Button from '../common/Button'
import { useApp } from '../../context/AppContext'

export const NoteModal = ({ isOpen, onClose, noteToEdit = null }) => {
  const { subjects, addNote, updateNote } = useApp()

  const [formData, setFormData] = useState({
    title: '',
    subjectId: '',
    tags: '',
    content: '',
  })

  useEffect(() => {
    if (noteToEdit) {
      setFormData({
        title: noteToEdit.title || '',
        subjectId: noteToEdit.subjectId || (subjects[0]?.id || ''),
        tags: noteToEdit.tags?.join(', ') || '',
        content: noteToEdit.content || '',
      })
    } else {
      setFormData({
        title: '',
        subjectId: subjects[0]?.id || '',
        tags: 'Notes, Revision',
        content: '',
      })
    }
  }, [noteToEdit, subjects, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const selectedSub = subjects.find((s) => s.id === formData.subjectId)

    const payload = {
      title: formData.title,
      subjectId: formData.subjectId,
      subjectCode: selectedSub ? selectedSub.code : 'GEN',
      tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      content: formData.content,
    }

    if (noteToEdit) {
      updateNote(noteToEdit.id, payload)
    } else {
      addNote(payload)
    }
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={noteToEdit ? 'Edit Study Note' : 'Create Study Note'}
      subtitle="Summaries, formulas, and revision flashcards"
      maxWidth="max-w-2xl"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {noteToEdit ? 'Save Note' : 'Create Note'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Note Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Master Theorem & Recurrence Relations"
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Associated Subject *
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
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g. ExamPrep, Algorithms, Theory"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Content & Key Insights (Markdown supported)
          </label>
          <textarea
            rows={8}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your study notes, definitions, proof steps, or code snippets..."
            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
          />
        </div>
      </form>
    </Modal>
  )
}

export default NoteModal
