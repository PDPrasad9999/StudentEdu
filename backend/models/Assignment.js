const mongoose = require('mongoose')

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
})

const assignmentSchema = new mongoose.Schema(
  {
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    },
    subjectCode: {
      type: String,
      required: true,
    },
    subjectName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: [true, 'Assignment title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    dueDate: {
      type: String,
      required: [true, 'Due date is required'],
    },
    dueTime: {
      type: String,
      default: '23:59',
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['To Do', 'In Progress', 'Submitted', 'Graded'],
      default: 'To Do',
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    estimatedMinutes: {
      type: Number,
      default: 120,
    },
    tags: [String],
    subtasks: [subtaskSchema],
    submissionFormat: {
      type: String,
      default: '',
    },
    score: {
      type: Number,
      default: null,
    },
    totalPoints: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Assignment', assignmentSchema)
