const StudySession = require('../models/StudySession')
const { getIsDbConnected } = require('../config/db')
const mockStore = require('../data/mockStore')

// @desc Get study sessions
// @route GET /api/sessions
exports.getSessions = async (req, res) => {
  try {
    const { date, subjectId } = req.query
    if (getIsDbConnected()) {
      const filter = {}
      if (date) filter.date = date
      if (subjectId) filter.subjectId = subjectId

      const sessions = await StudySession.find(filter).sort({ startTime: 1 })
      return res.json(sessions)
    }

    let results = [...mockStore.sessions]
    if (date) results = results.filter((s) => s.date === date)
    if (subjectId) results = results.filter((s) => s.subjectId === subjectId)
    return res.json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc Create study session block
// @route POST /api/sessions
exports.createSession = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const session = new StudySession(req.body)
      const saved = await session.save()
      return res.status(201).json(saved)
    }
    const created = {
      _id: `ses_${Date.now()}`,
      id: `ses_${Date.now()}`,
      completed: false,
      focusScore: null,
      status: 'Planned',
      ...req.body,
    }
    mockStore.sessions.unshift(created)
    return res.status(201).json(created)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Update study session
// @route PUT /api/sessions/:id
exports.updateSession = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const updated = await StudySession.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      if (!updated) return res.status(404).json({ message: 'Session not found' })
      return res.json(updated)
    }
    const index = mockStore.sessions.findIndex((s) => s._id === req.params.id || s.id === req.params.id)
    if (index === -1) return res.status(404).json({ message: 'Session not found' })
    mockStore.sessions[index] = { ...mockStore.sessions[index], ...req.body }
    return res.json(mockStore.sessions[index])
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Delete study session
// @route DELETE /api/sessions/:id
exports.deleteSession = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const deleted = await StudySession.findByIdAndDelete(req.params.id)
      if (!deleted) return res.status(404).json({ message: 'Session not found' })
      return res.json({ message: 'Session deleted' })
    }
    mockStore.sessions = mockStore.sessions.filter((s) => s._id !== req.params.id && s.id !== req.params.id)
    return res.json({ message: 'Session deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
