const User = require('../models/User')
const { getIsDbConnected } = require('../config/db')
const mockStore = require('../data/mockStore')

// @desc Get student profile
// @route GET /api/user/profile
exports.getProfile = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      let user = await User.findOne()
      if (!user) {
        user = await User.create(mockStore.userProfile)
      }
      return res.json(user)
    }
    return res.json(mockStore.userProfile)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc Update student profile
// @route PUT /api/user/profile
exports.updateProfile = async (req, res) => {
  try {
    if (getIsDbConnected()) {
      let user = await User.findOne()
      if (!user) {
        user = new User(req.body)
        await user.save()
        return res.json(user)
      }

      const updated = await User.findByIdAndUpdate(user._id, req.body, {
        new: true,
        runValidators: true,
      })
      return res.json(updated)
    }
    mockStore.userProfile = { ...mockStore.userProfile, ...req.body }
    return res.json(mockStore.userProfile)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
