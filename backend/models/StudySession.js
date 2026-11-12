const mongoose = require('mongoose')

const studySessionSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
    subjectCode: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Session title is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    startTime: {
      type: String,
      default: '10:00',
    },
    endTime: {
      type: String,
      default: '11:30',
    },
    durationMinutes: {
      type: Number,
      default: 90,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    focusScore: {
      type: Number,
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Planned', 'Completed', 'Skipped'],
      default: 'Planned',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('StudySession', studySessionSchema)
