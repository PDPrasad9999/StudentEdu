const Notification = require('../models/Notification')
const { getIsDbConnected } = require('../config/db')
const mockStore = require('../data/mockStore')

// @desc Get notifications
// @route GET /api/notifications
exports.getNotifications = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const notifs = await Notification.find().sort({ timestamp: -1 })
      return res.json(notifs)
    }
    return res.json(mockStore.notifications)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc Mark notification as read
// @route PATCH /api/notifications/:id/read
exports.markAsRead = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      const notif = await Notification.findByIdAndUpdate(
        req.params.id,
        { unread: false },
        { new: true }
      )
      if (!notif) return res.status(404).json({ message: 'Notification not found' })
      return res.json(notif)
    }
    const target = mockStore.notifications.find((n) => n._id === req.params.id || n.id === req.params.id)
    if (target) target.unread = false
    return res.json(target || { message: 'Marked read' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Mark all notifications as read
// @route PATCH /api/notifications/read-all
exports.markAllAsRead = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      await Notification.updateMany({ unread: true }, { unread: false })
      return res.json({ message: 'All notifications marked as read' })
    }
    mockStore.notifications.forEach((n) => {
      n.unread = false
    })
    return res.json({ message: 'All notifications marked as read' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
