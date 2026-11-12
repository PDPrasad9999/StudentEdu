const express = require('express')
const router = express.Router()
const {
  getNotifications,
  markAsRead,
  markAllAsRead,
} = require('../controllers/notificationController')

router.route('/').get(getNotifications)
router.route('/read-all').patch(markAllAsRead)
router.route('/:id/read').patch(markAsRead)

module.exports = router
