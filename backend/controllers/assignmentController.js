const Assignment = require('../models/Assignment')
const { getIsDbConnected } = require('../config/db')
const mockStore = require('../data/mockStore')

// @desc Get assignments
// @route GET /api/assignments
exports.getAssignments = async (req, res) => {
  try {
    const { subjectId, status, priority } = req.query
    if (getIsDbConnected()) {
      const filter = {}
      if (subjectId) filter.subjectId = subjectId
      if (status) filter.status = status
      if (priority) filter.priority = priority

      const assignments = await Assignment.find(filter).sort({ dueDate: 1 })
      return res.json(assignments)
    }

    let results = [...mockStore.assignments]
    if (subjectId) results = results.filter((a) => a.subjectId === subjectId)
    if (status) results = results.filter((a) => a.status === status)
    if (priority) results = results.filter((a) => a.priority === priority)
    return res.json(results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc Get single assignment
// @route GET /api/assignments/:id
exports.getAssignmentById = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const assignment = await Assignment.findById(req.params.id)
      if (!assignment) return res.status(404).json({ message: 'Assignment not found' })
      return res.json(assignment)
    }
    const found = mockStore.assignments.find((a) => a._id === req.params.id || a.id === req.params.id)
    if (!found) return res.status(404).json({ message: 'Assignment not found' })
    return res.json(found)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc Create assignment
// @route POST /api/assignments
exports.createAssignment = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const assignment = new Assignment(req.body)
      const saved = await assignment.save()
      return res.status(201).json(saved)
    }
    const created = {
      _id: `asg_${Date.now()}`,
      id: `asg_${Date.now()}`,
      progress: 0,
      subtasks: [],
      score: null,
      ...req.body,
    }
    mockStore.assignments.unshift(created)
    return res.status(201).json(created)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Update assignment
// @route PUT /api/assignments/:id
exports.updateAssignment = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      if (!updated) return res.status(404).json({ message: 'Assignment not found' })
      return res.json(updated)
    }
    const index = mockStore.assignments.findIndex((a) => a._id === req.params.id || a.id === req.params.id)
    if (index === -1) return res.status(404).json({ message: 'Assignment not found' })
    mockStore.assignments[index] = { ...mockStore.assignments[index], ...req.body }
    return res.json(mockStore.assignments[index])
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Delete assignment
// @route DELETE /api/assignments/:id
exports.deleteAssignment = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const deleted = await Assignment.findByIdAndDelete(req.params.id)
      if (!deleted) return res.status(404).json({ message: 'Assignment not found' })
      return res.json({ message: 'Assignment deleted successfully' })
    }
    mockStore.assignments = mockStore.assignments.filter((a) => a._id !== req.params.id && a.id !== req.params.id)
    return res.json({ message: 'Assignment deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
