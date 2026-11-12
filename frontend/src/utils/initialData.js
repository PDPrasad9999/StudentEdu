export const initialUser = {
  id: 'usr_1',
  name: 'Alex Morgan',
  email: 'alex.morgan@university.edu',
  studentId: 'STD-2024-8842',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  university: 'Metropolitan Tech University',
  degree: 'Bachelor of Science',
  major: 'Computer Science & AI',
  semester: 'Semester 5 (Fall 2026)',
  academicYear: 'Junior Year',
  gpa: 3.84,
  targetGpa: 3.95,
  totalCredits: 78,
  targetCredits: 120,
  currentStreak: 12,
  longestStreak: 21,
  totalFocusHours: 142.5,
  dailyGoalMinutes: 180,
  todayFocusMinutes: 115,
  bio: 'Passionate CS student specializing in distributed systems and deep learning algorithms. Working hard towards graduate school admissions.',
  settings: {
    notificationsEnabled: true,
    emailAlerts: true,
    deadlineReminderDays: 2,
    pomodoroWorkMinutes: 25,
    pomodoroShortBreak: 5,
    pomodoroLongBreak: 15,
    ambientSound: 'none',
    soundVolume: 50,
  }
}

export const initialSubjects = [
  {
    id: 'sub_1',
    code: 'CS 301',
    name: 'Data Structures & Algorithms',
    instructor: 'Dr. Evelyn Vance',
    instructorEmail: 'e.vance@tech.edu',
    color: '#2563EB', // Blue
    bgLight: 'bg-blue-50',
    borderLight: 'border-blue-200',
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    room: 'Hall B - Tech Bldg 4',
    credits: 4,
    currentGrade: 94.5,
    letterGrade: 'A',
    progress: 75,
    syllabusLink: '#',
    notesCount: 8,
    assignmentsCount: 4,
    description: 'Comprehensive study of asymptotic complexity, trees, graphs, dynamic programming, and advanced hashing strategies.'
  },
  {
    id: 'sub_2',
    code: 'MATH 240',
    name: 'Linear Algebra & Matrix Theory',
    instructor: 'Prof. Marcus Chen',
    instructorEmail: 'm.chen@tech.edu',
    color: '#4F46E5', // Indigo
    bgLight: 'bg-indigo-50',
    borderLight: 'border-indigo-200',
    schedule: 'Tue, Thu 01:00 PM - 02:30 PM',
    room: 'Mathematics Pavilion 102',
    credits: 3,
    currentGrade: 88.0,
    letterGrade: 'B+',
    progress: 68,
    syllabusLink: '#',
    notesCount: 6,
    assignmentsCount: 3,
    description: 'Vector spaces, eigenvalues, eigenvectors, singular value decomposition (SVD), and applications in machine learning.'
  },
  {
    id: 'sub_3',
    code: 'CS 340',
    name: 'Database Management Systems',
    instructor: 'Dr. Sarah Al-Mansoor',
    instructorEmail: 's.mansoor@tech.edu',
    color: '#0284C7', // Sky
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-200',
    schedule: 'Tue, Fri 11:00 AM - 12:30 PM',
    room: 'Lab 305 - Engineering Hub',
    credits: 4,
    currentGrade: 96.0,
    letterGrade: 'A+',
    progress: 82,
    syllabusLink: '#',
    notesCount: 11,
    assignmentsCount: 3,
    description: 'Relational data modeling, SQL optimization, ACID transactions, NoSQL architectures, and distributed sharding.'
  },
  {
    id: 'sub_4',
    code: 'PHYS 210',
    name: 'Modern Quantum Physics',
    instructor: 'Dr. Richard Thorne',
    instructorEmail: 'r.thorne@tech.edu',
    color: '#0D9488', // Teal
    bgLight: 'bg-teal-50',
    borderLight: 'border-teal-200',
    schedule: 'Mon, Thu 03:00 PM - 04:30 PM',
    room: 'Science Center 401',
    credits: 3,
    currentGrade: 84.5,
    letterGrade: 'B',
    progress: 60,
    syllabusLink: '#',
    notesCount: 5,
    assignmentsCount: 2,
    description: 'Wave-particle duality, Schrödinger equation, wave packets, quantum tunneling, and atomic emission spectra.'
  },
  {
    id: 'sub_5',
    code: 'CS 350',
    name: 'Full-Stack Web Engineering',
    instructor: 'Prof. Karen Taylor',
    instructorEmail: 'k.taylor@tech.edu',
    color: '#7C3AED', // Violet
    bgLight: 'bg-violet-50',
    borderLight: 'border-violet-200',
    schedule: 'Wed, Fri 02:00 PM - 03:30 PM',
    room: 'Computing Lab 204',
    credits: 4,
    currentGrade: 98.0,
    letterGrade: 'A+',
    progress: 90,
    syllabusLink: '#',
    notesCount: 9,
    assignmentsCount: 5,
    description: 'Modern component-driven web frameworks, REST/GraphQL APIs, microservices, state management, and cloud CI/CD.'
  }
]

export const initialAssignments = [
  {
    id: 'asg_1',
    subjectId: 'sub_1',
    subjectCode: 'CS 301',
    subjectName: 'Data Structures & Algorithms',
    title: 'Implement Red-Black Tree & AVL Rotations',
    description: 'Create a benchmark comparing balancing time and lookup performance between AVL and Red-Black trees with 1,000,000 randomized insertions.',
    dueDate: '2026-11-14',
    dueTime: '23:59',
    priority: 'High',
    status: 'In Progress',
    progress: 65,
    estimatedMinutes: 240,
    tags: ['Algorithms', 'Trees', 'C++'],
    subtasks: [
      { id: 'st_1', title: 'Implement basic BST insertion', completed: true },
      { id: 'st_2', title: 'Add left & right tree rotations', completed: true },
      { id: 'st_3', title: 'Fix Red-Black double black recoloring cases', completed: false },
      { id: 'st_4', title: 'Generate benchmark CSV charts', completed: false }
    ],
    submissionFormat: 'GitHub Repository link + PDF Report',
    score: null,
    totalPoints: 100
  },
  {
    id: 'asg_2',
    subjectId: 'sub_3',
    subjectCode: 'CS 340',
    subjectName: 'Database Management Systems',
    title: 'Milestone 3: Query Optimizer & Indexing Benchmarks',
    description: 'Optimize complex analytical aggregations on a 20M row dataset. Document explain analyze query plans before and after B-tree vs Hash indexes.',
    dueDate: '2026-11-15',
    dueTime: '17:00',
    priority: 'High',
    status: 'To Do',
    progress: 20,
    estimatedMinutes: 180,
    tags: ['Databases', 'MongoDB', 'Indexing'],
    subtasks: [
      { id: 'st_21', title: 'Write indexing strategy documentation', completed: true },
      { id: 'st_22', title: 'Run EXPLAIN ANALYZE on cold cache', completed: false },
      { id: 'st_23', title: 'Verify composite index cardinality', completed: false }
    ],
    submissionFormat: 'SQL Scripts + Markdown Report',
    score: null,
    totalPoints: 50
  },
  {
    id: 'asg_3',
    subjectId: 'sub_2',
    subjectCode: 'MATH 240',
    subjectName: 'Linear Algebra & Matrix Theory',
    title: 'Problem Set 7: SVD Decomposition & Eigenfaces',
    description: 'Solve analytical proofs in Chapter 6. Apply PCA and SVD dimensionality reduction on the Yale Face Database dataset in Python.',
    dueDate: '2026-11-17',
    dueTime: '23:59',
    priority: 'Medium',
    status: 'To Do',
    progress: 10,
    estimatedMinutes: 150,
    tags: ['LinearAlgebra', 'PCA', 'MathProof'],
    subtasks: [
      { id: 'st_31', title: 'Proof of orthogonal projection matrix', completed: true },
      { id: 'st_32', title: 'Solve problems 6.1 through 6.8', completed: false },
      { id: 'st_33', title: 'Run Python notebook eigenfaces', completed: false }
    ],
    submissionFormat: 'LaTeX Compiled PDF',
    score: null,
    totalPoints: 100
  },
  {
    id: 'asg_4',
    subjectId: 'sub_5',
    subjectCode: 'CS 350',
    subjectName: 'Full-Stack Web Engineering',
    title: 'Sprint 2: SmartEdu Planner Component Library',
    description: 'Build responsive components, state management context, and API service integration for the student workspace portal.',
    dueDate: '2026-11-19',
    dueTime: '23:59',
    priority: 'Medium',
    status: 'In Progress',
    progress: 80,
    estimatedMinutes: 200,
    tags: ['React', 'Tailwind', 'Frontend'],
    subtasks: [
      { id: 'st_41', title: 'Design dashboard UI architecture', completed: true },
      { id: 'st_42', title: 'Integrate Pomodoro timer logic', completed: true },
      { id: 'st_43', title: 'Create interactive calendar view', completed: true },
      { id: 'st_44', title: 'Perform cross-device test', completed: false }
    ],
    submissionFormat: 'Live Demo URL + Vercel Deployment',
    score: null,
    totalPoints: 100
  },
  {
    id: 'asg_5',
    subjectId: 'sub_4',
    subjectCode: 'PHYS 210',
    subjectName: 'Modern Quantum Physics',
    title: 'Quantum Harmonic Oscillator Lab Writeup',
    description: 'Calculate hermite polynomial wavefunctions and compare probability densities for quantum vs classical turning points.',
    dueDate: '2026-11-22',
    dueTime: '18:00',
    priority: 'Low',
    status: 'To Do',
    progress: 0,
    estimatedMinutes: 120,
    tags: ['Quantum', 'PhysicsLab', 'Calculations'],
    subtasks: [
      { id: 'st_51', title: 'Gather experimental laser data', completed: false },
      { id: 'st_52', title: 'Graph potential energy curves', completed: false }
    ],
    submissionFormat: 'PDF Lab Report',
    score: null,
    totalPoints: 50
  },
  {
    id: 'asg_6',
    subjectId: 'sub_1',
    subjectCode: 'CS 301',
    subjectName: 'Data Structures & Algorithms',
    title: 'Midterm Coding Assessment: Graph Traversals',
    description: 'Dijkstra shortest path with Fibonacci heaps vs priority queues.',
    dueDate: '2026-11-08',
    dueTime: '23:59',
    priority: 'High',
    status: 'Graded',
    progress: 100,
    estimatedMinutes: 180,
    tags: ['Exam', 'Graphs'],
    subtasks: [
      { id: 'st_61', title: 'Passed all 25 hidden unit tests', completed: true }
    ],
    submissionFormat: 'Automated Grader',
    score: 98,
    totalPoints: 100
  },
  {
    id: 'asg_7',
    subjectId: 'sub_5',
    subjectCode: 'CS 350',
    subjectName: 'Full-Stack Web Engineering',
    title: 'Authentication & Session Security Audit',
    description: 'Implement JWT with refresh token rotation and CSRF mitigation.',
    dueDate: '2026-11-05',
    dueTime: '23:59',
    priority: 'Medium',
    status: 'Submitted',
    progress: 100,
    estimatedMinutes: 150,
    tags: ['Auth', 'Security'],
    subtasks: [
      { id: 'st_71', title: 'Write automated security tests', completed: true }
    ],
    submissionFormat: 'GitHub Pull Request',
    score: null,
    totalPoints: 100
  }
]

export const initialStudySessions = [
  {
    id: 'ses_1',
    subjectId: 'sub_1',
    subjectCode: 'CS 301',
    title: 'Red-Black Tree recoloring & code walk',
    date: '2026-11-12',
    startTime: '09:00',
    endTime: '10:30',
    durationMinutes: 90,
    completed: true,
    focusScore: 92,
    notes: 'Understood case 3 rotations and parent recoloring.',
    status: 'Completed'
  },
  {
    id: 'ses_2',
    subjectId: 'sub_3',
    subjectCode: 'CS 340',
    title: 'MongoDB Aggregation Pipeline Practice',
    date: '2026-11-12',
    startTime: '14:00',
    endTime: '15:30',
    durationMinutes: 90,
    completed: true,
    focusScore: 88,
    notes: 'Practiced $facet, $bucketAuto, and $lookup optimization.',
    status: 'Completed'
  },
  {
    id: 'ses_3',
    subjectId: 'sub_2',
    subjectCode: 'MATH 240',
    title: 'Eigenvalues & Diagonalization Proofs',
    date: '2026-11-12',
    startTime: '18:00',
    endTime: '19:15',
    durationMinutes: 75,
    completed: false,
    focusScore: null,
    notes: 'Review theorem 5.3 in textbook before problem set.',
    status: 'Planned'
  },
  {
    id: 'ses_4',
    subjectId: 'sub_5',
    subjectCode: 'CS 350',
    title: 'Full-Stack State Management Deep Dive',
    date: '2026-11-13',
    startTime: '10:00',
    endTime: '11:45',
    durationMinutes: 105,
    completed: false,
    focusScore: null,
    notes: 'Draft custom context hooks and cache syncing.',
    status: 'Planned'
  },
  {
    id: 'ses_5',
    subjectId: 'sub_4',
    subjectCode: 'PHYS 210',
    title: 'Schrödinger Equation 1D Box Simulation',
    date: '2026-11-13',
    startTime: '16:00',
    endTime: '17:30',
    durationMinutes: 90,
    completed: false,
    focusScore: null,
    notes: 'Calculate normalization constants.',
    status: 'Planned'
  },
  {
    id: 'ses_6',
    subjectId: 'sub_1',
    subjectCode: 'CS 301',
    title: 'Graph Dijkstra algorithm review',
    date: '2026-11-11',
    startTime: '11:00',
    endTime: '12:30',
    durationMinutes: 90,
    completed: true,
    focusScore: 95,
    notes: 'Practiced adjacency lists vs matrices memory overhead.',
    status: 'Completed'
  }
]

export const initialNotes = [
  {
    id: 'nt_1',
    subjectId: 'sub_1',
    subjectCode: 'CS 301',
    title: 'Mastering AVL vs Red-Black Trees',
    pinned: true,
    tags: ['DataStructures', 'Trees', 'Complexity'],
    updatedAt: '2026-11-11T16:20:00Z',
    content: `# AVL vs Red-Black Trees Summary

### Core Invariants
- **AVL Tree**: Stricter balance. Balance factor difference between left and right subtree heights is at most 1.
- **Red-Black Tree**: Relaxed balance. No two consecutive red nodes. Black-height is equal for all paths from root to leaves.

### Performance Comparison
- **Lookups**: AVL is faster because max height is strictly ~1.44 log2(N), whereas Red-Black is ~2.00 log2(N).
- **Insertions & Deletions**: Red-Black is faster because fewer rotations are required to restore invariants (at most 2 rotations for insert, 3 for delete).
- **Standard Library Choice**: C++ \`std::map\` and Java \`TreeMap\` use Red-Black trees due to faster write operations.`
  },
  {
    id: 'nt_2',
    subjectId: 'sub_3',
    subjectCode: 'CS 340',
    title: 'MongoDB Indexing Strategies & Query Optimization',
    pinned: true,
    tags: ['Databases', 'MongoDB', 'Performance'],
    updatedAt: '2026-11-10T14:10:00Z',
    content: `# MongoDB Indexing Best Practices

### ESR Rule (Equality, Sort, Range)
When designing compound indexes:
1. **Equality fields first**: Place exact filter fields like \`userId\`, \`status\`
2. **Sort fields second**: Fields used in \`.sort({ dueDate: 1 })\`
3. **Range fields last**: Fields evaluated with \`$gt\`, \`$lt\`, or regex.

### Covered Queries
A query is covered if:
- All fields in the query predicate are part of an index.
- All fields returned in the projection are in the same index.
- Execution plan will show \`totalDocsExamined: 0\`.`
  },
  {
    id: 'nt_3',
    subjectId: 'sub_2',
    subjectCode: 'MATH 240',
    title: 'Eigenvalues & Orthogonal Projections Formula Sheet',
    pinned: false,
    tags: ['Math', 'Formulas', 'ExamPrep'],
    updatedAt: '2026-11-09T18:45:00Z',
    content: `# Linear Algebra Key Formulas

### Characteristic Equation
\`\`\`
det(A - λI) = 0
\`\`\`

### Properties:
1. Sum of eigenvalues equals the trace of matrix A:
   $$\\sum \\lambda_i = \\text{tr}(A)$$
2. Product of eigenvalues equals the determinant:
   $$\\prod \\lambda_i = \\det(A)$$
3. If A is symmetric real, all eigenvalues are real, and eigenvectors from distinct eigenvalues are orthogonal.`
  },
  {
    id: 'nt_4',
    subjectId: 'sub_5',
    subjectCode: 'CS 350',
    title: 'React 18 Concurrent Features & State Synchronization',
    pinned: false,
    tags: ['React', 'Frontend', 'Architecture'],
    updatedAt: '2026-11-08T11:00:00Z',
    content: `# Modern React Patterns

- **useTransition**: Allows marking UI updates as non-urgent transitions to keep high-frequency interactions snappy.
- **useDeferredValue**: Defers updating a non-critical part of the UI until the main render completes.
- **Context API vs Zustand**: Use Context for low-to-medium frequency changes like themes, user authentication, and localized state containers.`
  }
]

export const initialNotifications = [
  {
    id: 'notif_1',
    title: 'Urgent Deadline Approaching',
    message: 'Your assignment "Implement Red-Black Tree" for CS 301 is due in less than 48 hours!',
    type: 'deadline',
    unread: true,
    timestamp: '2026-11-12T17:30:00Z',
    link: '/assignments'
  },
  {
    id: 'notif_2',
    title: 'Study Streak Milestone! 🔥',
    message: 'Congratulations! You reached a 12-day consecutive study streak. Keep the momentum going!',
    type: 'achievement',
    unread: true,
    timestamp: '2026-11-12T11:00:00Z',
    link: '/analytics'
  },
  {
    id: 'notif_3',
    title: 'Upcoming Study Session Reminder',
    message: 'Linear Algebra problem set review starts at 6:00 PM today.',
    type: 'session',
    unread: false,
    timestamp: '2026-11-12T10:00:00Z',
    link: '/planner'
  },
  {
    id: 'notif_4',
    title: 'Grade Released',
    message: 'Your grade for "Midterm Coding Assessment: Graph Traversals" has been posted: 98/100 (A+).',
    type: 'grade',
    unread: false,
    timestamp: '2026-11-09T14:20:00Z',
    link: '/subjects'
  }
]

export const initialAnalytics = {
  dailyFocusHours: [
    { day: 'Mon', hours: 4.2, target: 3.0 },
    { day: 'Tue', hours: 5.0, target: 3.0 },
    { day: 'Wed', hours: 3.5, target: 3.0 },
    { day: 'Thu', hours: 4.8, target: 3.0 },
    { day: 'Fri', hours: 2.5, target: 3.0 },
    { day: 'Sat', hours: 6.0, target: 3.0 },
    { day: 'Sun', hours: 3.8, target: 3.0 }
  ],
  subjectDistribution: [
    { subject: 'Data Structures (CS 301)', hours: 38, percentage: 32, color: '#2563EB' },
    { subject: 'Linear Algebra (MATH 240)', hours: 24, percentage: 20, color: '#4F46E5' },
    { subject: 'Database Systems (CS 340)', hours: 26, percentage: 22, color: '#0284C7' },
    { subject: 'Full-Stack Web (CS 350)', hours: 20, percentage: 17, color: '#7C3AED' },
    { subject: 'Modern Physics (PHYS 210)', hours: 11, percentage: 9, color: '#0D9488' }
  ],
  productivityScore: 94,
  completionRate: 88,
  totalSessionsCompleted: 64,
  avgFocusPerSessionMinutes: 52
}
