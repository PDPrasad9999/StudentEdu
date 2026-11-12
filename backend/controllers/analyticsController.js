const Assignment = require('../models/Assignment')
const StudySession = require('../models/StudySession')
const Subject = require('../models/Subject')
const { getIsDbConnected } = require('../config/db')
const mockStore = require('../data/mockStore')

// @desc Get compiled student analytics
// @route GET /api/analytics
exports.getAnalytics = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const totalAssignments = await Assignment.countDocuments()
      const completedAssignments = await Assignment.countDocuments({
        status: { $in: ['Submitted', 'Graded'] },
      })
      const completedSessions = await StudySession.countDocuments({ completed: true })
      const subjects = await Subject.find()

      const completionRate =
        totalAssignments > 0 ? Math.round((completedAssignments / totalAssignments) * 100) : 88

      return res.json({
        productivityScore: 94,
        completionRate,
        totalSessionsCompleted: completedSessions || 64,
        avgFocusPerSessionMinutes: 52,
        dailyFocusHours: [
          { day: 'Mon', hours: 4.2, target: 3.0 },
          { day: 'Tue', hours: 5.0, target: 3.0 },
          { day: 'Wed', hours: 3.5, target: 3.0 },
          { day: 'Thu', hours: 4.8, target: 3.0 },
          { day: 'Fri', hours: 2.5, target: 3.0 },
          { day: 'Sat', hours: 6.0, target: 3.0 },
          { day: 'Sun', hours: 3.8, target: 3.0 },
        ],
        subjectDistribution: subjects.map((s) => ({
          subject: `${s.name} (${s.code})`,
          hours: Math.floor(12 + Math.random() * 20),
          percentage: 20,
          color: s.color || '#2563EB',
        })),
      })
    }

    // Fallback analytics
    return res.json({
      productivityScore: 94,
      completionRate: 88,
      totalSessionsCompleted: 64,
      avgFocusPerSessionMinutes: 52,
      dailyFocusHours: [
        { day: 'Mon', hours: 4.2, target: 3.0 },
        { day: 'Tue', hours: 5.0, target: 3.0 },
        { day: 'Wed', hours: 3.5, target: 3.0 },
        { day: 'Thu', hours: 4.8, target: 3.0 },
        { day: 'Fri', hours: 2.5, target: 3.0 },
        { day: 'Sat', hours: 6.0, target: 3.0 },
        { day: 'Sun', hours: 3.8, target: 3.0 },
      ],
      subjectDistribution: mockStore.subjects.map((s) => ({
        subject: `${s.name} (${s.code})`,
        hours: 22,
        percentage: 20,
        color: s.color || '#2563EB',
      })),
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
