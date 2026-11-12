const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, 'Subject code is required'],
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      trim: true,
    },
    instructor: {
      type: String,
      default: '',
    },
    instructorEmail: {
      type: String,
      default: '',
      trim: true,
      lowercase: true,
    },
    color: {
      type: String,
      default: '#2563EB',
    },
    schedule: {
      type: String,
      default: '',
    },
    room: {
      type: String,
      default: '',
    },
    credits: {
      type: Number,
      default: 3,
    },
    currentGrade: {
      type: Number,
      default: 90,
    },
    letterGrade: {
      type: String,
      default: 'A',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    notesCount: {
      type: Number,
      default: 0,
    },
    assignmentsCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Subject', subjectSchema)
