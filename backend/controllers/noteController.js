const Note = require('../models/Note')
const { getIsDbConnected } = require('../config/db')
const mockStore = require('../data/mockStore')

// @desc Get notes
// @route GET /api/notes
exports.getNotes = async (req, res) => {
  try {
    const { subjectId, tag } = req.query
    if (getIsDbConnected()) {
      const filter = {}
      if (subjectId) filter.subjectId = subjectId
      if (tag) filter.tags = tag

      const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 })
      return res.json(notes)
    }

    let results = [...mockStore.notes]
    if (subjectId) results = results.filter((n) => n.subjectId === subjectId)
    if (tag) results = results.filter((n) => n.tags?.includes(tag))
    return res.json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc Create note
// @route POST /api/notes
exports.createNote = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const note = new Note(req.body)
      const saved = await note.save()
      return res.status(201).json(saved)
    }
    const created = {
      _id: `nt_${Date.now()}`,
      id: `nt_${Date.now()}`,
      pinned: false,
      updatedAt: new Date().toISOString(),
      ...req.body,
    }
    mockStore.notes.unshift(created)
    return res.status(201).json(created)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Update note
// @route PUT /api/notes/:id
exports.updateNote = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const updated = await Note.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      if (!updated) return res.status(404).json({ message: 'Note not found' })
      return res.json(updated)
    }
    const index = mockStore.notes.findIndex((n) => n._id === req.params.id || n.id === req.params.id)
    if (index === -1) return res.status(404).json({ message: 'Note not found' })
    mockStore.notes[index] = { ...mockStore.notes[index], ...req.body, updatedAt: new Date().toISOString() }
    return res.json(mockStore.notes[index])
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Delete note
// @route DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const deleted = await Note.findByIdAndDelete(req.params.id)
      if (!deleted) return res.status(404).json({ message: 'Note not found' })
      return res.json({ message: 'Note deleted' })
    }
    mockStore.notes = mockStore.notes.filter((n) => n._id !== req.params.id && n.id !== req.params.id)
    return res.json({ message: 'Note deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
