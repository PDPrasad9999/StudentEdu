const Subject = require('../models/Subject')
const { getIsDbConnected } = require('../config/db')
const mockStore = require('../data/mockStore')

// @desc Get all enrolled subjects
// @route GET /api/subjects
exports.getSubjects = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const subjects = await Subject.find().sort({ createdAt: -1 })
      return res.json(subjects)
    }
    return res.json(mockStore.subjects)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc Get single subject
// @route GET /api/subjects/:id
exports.getSubjectById = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const subject = await Subject.findById(req.params.id)
      if (!subject) return res.status(404).json({ message: 'Subject not found' })
      return res.json(subject)
    }
    const found = mockStore.subjects.find((s) => s._id === req.params.id || s.id === req.params.id)
    if (!found) return res.status(404).json({ message: 'Subject not found' })
    return res.json(found)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc Create new subject
// @route POST /api/subjects
exports.createSubject = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const subject = new Subject(req.body)
      const saved = await subject.save()
      return res.status(201).json(saved)
    }
    const newSubject = {
      _id: `sub_${Date.now()}`,
      id: `sub_${Date.now()}`,
      notesCount: 0,
      assignmentsCount: 0,
      progress: 0,
      currentGrade: 100,
      letterGrade: 'A',
      createdAt: new Date().toISOString(),
      ...req.body,
    }
    mockStore.subjects.unshift(newSubject)
    return res.status(201).json(newSubject)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Update subject
// @route PUT /api/subjects/:id
exports.updateSubject = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      if (!updated) return res.status(404).json({ message: 'Subject not found' })
      return res.json(updated)
    }
    const index = mockStore.subjects.findIndex((s) => s._id === req.params.id || s.id === req.params.id)
    if (index === -1) return res.status(404).json({ message: 'Subject not found' })
    mockStore.subjects[index] = { ...mockStore.subjects[index], ...req.body }
    return res.json(mockStore.subjects[index])
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Delete subject
// @route DELETE /api/subjects/:id
exports.deleteSubject = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const deleted = await Subject.findByIdAndDelete(req.params.id)
      if (!deleted) return res.status(404).json({ message: 'Subject not found' })
      return res.json({ message: 'Subject removed successfully' })
    }
    mockStore.subjects = mockStore.subjects.filter((s) => s._id !== req.params.id && s.id !== req.params.id)
    return res.json({ message: 'Subject removed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
