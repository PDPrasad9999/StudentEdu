const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Alex Morgan',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    studentId: {
      type: String,
      default: 'STD-2024-8842',
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    },
    university: {
      type: String,
      default: 'Metropolitan Tech University',
    },
    degree: {
      type: String,
      default: 'Bachelor of Science',
    },
    major: {
      type: String,
      default: 'Computer Science & AI',
    },
    semester: {
      type: String,
      default: 'Semester 5 (Fall 2026)',
    },
    academicYear: {
      type: String,
      default: 'Junior Year',
    },
    gpa: {
      type: Number,
      default: 3.84,
    },
    targetGpa: {
      type: Number,
      default: 3.95,
    },
    totalCredits: {
      type: Number,
      default: 78,
    },
    targetCredits: {
      type: Number,
      default: 120,
    },
    currentStreak: {
      type: Number,
      default: 12,
    },
    longestStreak: {
      type: Number,
      default: 21,
    },
    totalFocusHours: {
      type: Number,
      default: 142.5,
    },
    dailyGoalMinutes: {
      type: Number,
      default: 180,
    },
    todayFocusMinutes: {
      type: Number,
      default: 115,
    },
    bio: {
      type: String,
      default: '',
    },
    settings: {
      notificationsEnabled: { type: Boolean, default: true },
      emailAlerts: { type: Boolean, default: true },
      deadlineReminderDays: { type: Number, default: 2 },
      pomodoroWorkMinutes: { type: Number, default: 25 },
      pomodoroShortBreak: { type: Number, default: 5 },
      pomodoroLongBreak: { type: Number, default: 15 },
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
