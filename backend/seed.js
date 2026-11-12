const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Subject = require('./models/Subject')
const Assignment = require('./models/Assignment')
const StudySession = require('./models/StudySession')
const Note = require('./models/Note')
const User = require('./models/User')
const Notification = require('./models/Notification')

dotenv.config()

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI
    if (!uri || uri.includes('<username>')) {
      console.error('❌ Please set MONGODB_URI in backend/.env before seeding.')
      process.exit(1)
    }

    await mongoose.connect(uri)
    console.log(' Connected to MongoDB Atlas. Seeding initial data...')

    // Clear old data
    await Subject.deleteMany({})
    await Assignment.deleteMany({})
    await StudySession.deleteMany({})
    await Note.deleteMany({})
    await User.deleteMany({})
    await Notification.deleteMany({})

    // Seed User
    const user = await User.create({
      name: 'Alex Morgan',
      email: 'alex.morgan@university.edu',
      studentId: 'STD-2024-8842',
      university: 'Metropolitan Tech University',
      degree: 'Bachelor of Science',
      major: 'Computer Science & AI',
      semester: 'Semester 5 (Fall 2026)',
      gpa: 3.84,
      targetGpa: 3.95,
      totalCredits: 78,
      targetCredits: 120,
      currentStreak: 12,
      longestStreak: 21,
      totalFocusHours: 142.5,
      dailyGoalMinutes: 180,
      todayFocusMinutes: 115,
      bio: 'Passionate CS student specializing in distributed systems and deep learning algorithms.',
    })

    // Seed Subjects
    const sub1 = await Subject.create({
      code: 'CS 301',
      name: 'Data Structures & Algorithms',
      instructor: 'Dr. Evelyn Vance',
      instructorEmail: 'e.vance@tech.edu',
      color: '#2563EB',
      schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
      room: 'Hall B - Tech Bldg 4',
      credits: 4,
      currentGrade: 94.5,
      letterGrade: 'A',
      progress: 75,
      notesCount: 8,
      assignmentsCount: 4,
    })

    const sub2 = await Subject.create({
      code: 'MATH 240',
      name: 'Linear Algebra & Matrix Theory',
      instructor: 'Prof. Marcus Chen',
      instructorEmail: 'm.chen@tech.edu',
      color: '#4F46E5',
      schedule: 'Tue, Thu 01:00 PM - 02:30 PM',
      room: 'Mathematics Pavilion 102',
      credits: 3,
      currentGrade: 88.0,
      letterGrade: 'B+',
      progress: 68,
      notesCount: 6,
      assignmentsCount: 3,
    })

    const sub3 = await Subject.create({
      code: 'CS 340',
      name: 'Database Management Systems',
      instructor: 'Dr. Sarah Al-Mansoor',
      instructorEmail: 's.mansoor@tech.edu',
      color: '#0284C7',
      schedule: 'Tue, Fri 11:00 AM - 12:30 PM',
      room: 'Lab 305 - Engineering Hub',
      credits: 4,
      currentGrade: 96.0,
      letterGrade: 'A+',
      progress: 82,
      notesCount: 11,
      assignmentsCount: 3,
    })

    // Seed Assignments
    await Assignment.create([
      {
        subjectId: sub1._id,
        subjectCode: 'CS 301',
        subjectName: 'Data Structures & Algorithms',
        title: 'Implement Red-Black Tree & AVL Rotations',
        description: 'Create a benchmark comparing balancing time and lookup performance.',
        dueDate: '2026-11-14',
        dueTime: '23:59',
        priority: 'High',
        status: 'In Progress',
        progress: 65,
        estimatedMinutes: 240,
        tags: ['Algorithms', 'Trees'],
        subtasks: [
          { title: 'Implement basic BST insertion', completed: true },
          { title: 'Add left & right tree rotations', completed: true },
        ],
      },
      {
        subjectId: sub3._id,
        subjectCode: 'CS 340',
        subjectName: 'Database Management Systems',
        title: 'Milestone 3: Query Optimizer & Indexing Benchmarks',
        description: 'Optimize complex analytical aggregations on a 20M row dataset.',
        dueDate: '2026-11-15',
        dueTime: '17:00',
        priority: 'High',
        status: 'To Do',
        progress: 20,
        estimatedMinutes: 180,
        tags: ['Databases', 'MongoDB'],
      },
    ])

    // Seed Study Sessions
    await StudySession.create([
      {
        subjectId: sub1._id,
        subjectCode: 'CS 301',
        title: 'Red-Black Tree recoloring & code walk',
        date: '2026-11-12',
        startTime: '09:00',
        endTime: '10:30',
        durationMinutes: 90,
        completed: true,
        focusScore: 92,
        notes: 'Understood case 3 rotations and parent recoloring.',
        status: 'Completed',
      },
      {
        subjectId: sub3._id,
        subjectCode: 'CS 340',
        title: 'MongoDB Aggregation Pipeline Practice',
        date: '2026-11-12',
        startTime: '14:00',
        endTime: '15:30',
        durationMinutes: 90,
        completed: true,
        focusScore: 88,
        notes: 'Practiced $facet, $bucketAuto, and $lookup optimization.',
        status: 'Completed',
      },
    ])

    // Seed Notifications
    await Notification.create([
      {
        title: 'Urgent Deadline Approaching',
        message: 'Your assignment "Implement Red-Black Tree" for CS 301 is due in less than 48 hours!',
        type: 'deadline',
        unread: true,
        link: '/assignments',
      },
      {
        title: 'Study Streak Milestone! 🔥',
        message: 'Congratulations! You reached a 12-day consecutive study streak.',
        type: 'achievement',
        unread: true,
        link: '/analytics',
      },
    ])

    console.log('✅ Successfully seeded MongoDB database!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

seedData()
