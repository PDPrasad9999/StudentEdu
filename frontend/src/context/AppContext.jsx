import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  initialUser,
  initialSubjects,
  initialAssignments,
  initialStudySessions,
  initialNotes,
  initialNotifications,
  initialAnalytics
} from '../utils/initialData'
import {
  SubjectsAPI,
  AssignmentsAPI,
  StudySessionsAPI,
  NotesAPI,
  UserAPI,
  NotificationsAPI
} from '../services/api'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  // Load state from localStorage or initialData
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smartedu_user')
    return saved ? JSON.parse(saved) : initialUser
  })

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem('smartedu_subjects')
    return saved ? JSON.parse(saved) : initialSubjects
  })

  const [assignments, setAssignments] = useState(() => {
    const saved = localStorage.getItem('smartedu_assignments')
    return saved ? JSON.parse(saved) : initialAssignments
  })

  const [studySessions, setStudySessions] = useState(() => {
    const saved = localStorage.getItem('smartedu_sessions')
    return saved ? JSON.parse(saved) : initialStudySessions
  })

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('smartedu_notes')
    return saved ? JSON.parse(saved) : initialNotes
  })

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('smartedu_notifications')
    return saved ? JSON.parse(saved) : initialNotifications
  })

  const [analytics, setAnalytics] = useState(initialAnalytics)

  // System & Navigation state
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking') // 'connected' | 'offline' | 'checking'

  // Pomodoro Timer State
  const [timerMode, setTimerMode] = useState('work') // 'work' | 'shortBreak' | 'longBreak'
  const [timeLeft, setTimeLeft] = useState(25 * 60)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(4)
  const [timerSubjectId, setTimerSubjectId] = useState('sub_1')
  const [ambientSound, setAmbientSound] = useState('none') // 'none' | 'rain' | 'cafe' | 'lofi'

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('smartedu_user', JSON.stringify(user))
  }, [user])

  useEffect(() => {
    localStorage.setItem('smartedu_subjects', JSON.stringify(subjects))
  }, [subjects])

  useEffect(() => {
    localStorage.setItem('smartedu_assignments', JSON.stringify(assignments))
  }, [assignments])

  useEffect(() => {
    localStorage.setItem('smartedu_sessions', JSON.stringify(studySessions))
  }, [studySessions])

  useEffect(() => {
    localStorage.setItem('smartedu_notes', JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem('smartedu_notifications', JSON.stringify(notifications))
  }, [notifications])

  // Try checking backend connectivity on startup
  useEffect(() => {
    let isMounted = true
    const checkBackend = async () => {
      try {
        const res = await UserAPI.getProfile()
        if (isMounted && res) {
          setBackendStatus('connected')
        }
      } catch (err) {
        if (isMounted) {
          setBackendStatus('offline')
        }
      }
    }
    checkBackend()
    return () => { isMounted = false }
  }, [])

  // Pomodoro countdown timer tick
  useEffect(() => {
    let interval = null
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isTimerRunning) {
      // Completed timer cycle
      setIsTimerRunning(false)
      if (timerMode === 'work') {
        const nextCount = completedPomodoros + 1
        setCompletedPomodoros(nextCount)
        // Add to student's focus minutes
        setUser((prev) => ({
          ...prev,
          todayFocusMinutes: prev.todayFocusMinutes + 25,
          totalFocusHours: parseFloat((prev.totalFocusHours + 25 / 60).toFixed(1))
        }))
        // Trigger notification
        addNotification({
          title: 'Pomodoro Completed! 🍅',
          message: 'Great focus session! Take a 5-minute break to recharge your mind.',
          type: 'achievement',
          link: '/timer'
        })
        setTimerMode('shortBreak')
        setTimeLeft(5 * 60)
      } else {
        setTimerMode('work')
        setTimeLeft(25 * 60)
      }
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timeLeft, timerMode, completedPomodoros])

  // Timer controls
  const startTimer = () => setIsTimerRunning(true)
  const pauseTimer = () => setIsTimerRunning(false)
  const resetTimer = (mode = timerMode) => {
    setIsTimerRunning(false)
    setTimerMode(mode)
    if (mode === 'work') setTimeLeft((user.settings?.pomodoroWorkMinutes || 25) * 60)
    else if (mode === 'shortBreak') setTimeLeft((user.settings?.pomodoroShortBreak || 5) * 60)
    else if (mode === 'longBreak') setTimeLeft((user.settings?.pomodoroLongBreak || 15) * 60)
  }

  // Subject Actions
  const addSubject = async (newSubject) => {
    const created = {
      id: `sub_${Date.now()}`,
      notesCount: 0,
      assignmentsCount: 0,
      progress: 0,
      currentGrade: 100,
      letterGrade: 'A',
      ...newSubject
    }
    setSubjects((prev) => [created, ...prev])
    try {
      if (backendStatus === 'connected') await SubjectsAPI.create(created)
    } catch (e) {
      console.warn('Backend sync failed, stored locally:', e.message)
    }
  }

  const updateSubject = async (id, updatedFields) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)))
    try {
      if (backendStatus === 'connected') await SubjectsAPI.update(id, updatedFields)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const deleteSubject = async (id) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id))
    // Also remove or clean up associated assignments/notes
    setAssignments((prev) => prev.filter((a) => a.subjectId !== id))
    setNotes((prev) => prev.filter((n) => n.subjectId !== id))
    try {
      if (backendStatus === 'connected') await SubjectsAPI.delete(id)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  // Assignment Actions
  const addAssignment = async (newAsg) => {
    const created = {
      id: `asg_${Date.now()}`,
      progress: 0,
      subtasks: [],
      score: null,
      ...newAsg
    }
    setAssignments((prev) => [created, ...prev])
    // Update subject assignments count
    if (newAsg.subjectId) {
      setSubjects((prev) =>
        prev.map((s) => (s.id === newAsg.subjectId ? { ...s, assignmentsCount: s.assignmentsCount + 1 } : s))
      )
    }
    try {
      if (backendStatus === 'connected') await AssignmentsAPI.create(created)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const updateAssignment = async (id, updatedFields) => {
    setAssignments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updatedFields } : a)))
    try {
      if (backendStatus === 'connected') await AssignmentsAPI.update(id, updatedFields)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const deleteAssignment = async (id) => {
    const asg = assignments.find((a) => a.id === id)
    setAssignments((prev) => prev.filter((a) => a.id !== id))
    if (asg?.subjectId) {
      setSubjects((prev) =>
        prev.map((s) => (s.id === asg.subjectId ? { ...s, assignmentsCount: Math.max(0, s.assignmentsCount - 1) } : s))
      )
    }
    try {
      if (backendStatus === 'connected') await AssignmentsAPI.delete(id)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const toggleSubtask = (assignmentId, subtaskId) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id !== assignmentId) return a
        const updatedSubtasks = a.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        )
        const completedCount = updatedSubtasks.filter((st) => st.completed).length
        const progress = Math.round((completedCount / updatedSubtasks.length) * 100)
        return {
          ...a,
          subtasks: updatedSubtasks,
          progress,
          status: progress === 100 ? 'Submitted' : progress > 0 ? 'In Progress' : 'To Do'
        }
      })
    )
  }

  // Study Sessions
  const addStudySession = async (session) => {
    const created = {
      id: `ses_${Date.now()}`,
      completed: false,
      focusScore: null,
      ...session
    }
    setStudySessions((prev) => [created, ...prev])
    try {
      if (backendStatus === 'connected') await StudySessionsAPI.create(created)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const updateStudySession = async (id, updatedFields) => {
    setStudySessions((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)))
    try {
      if (backendStatus === 'connected') await StudySessionsAPI.update(id, updatedFields)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const deleteStudySession = async (id) => {
    setStudySessions((prev) => prev.filter((s) => s.id !== id))
    try {
      if (backendStatus === 'connected') await StudySessionsAPI.delete(id)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const toggleSessionComplete = (id) => {
    setStudySessions((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        const isNowCompleted = !s.completed
        return {
          ...s,
          completed: isNowCompleted,
          status: isNowCompleted ? 'Completed' : 'Planned',
          focusScore: isNowCompleted ? Math.floor(85 + Math.random() * 15) : null
        }
      })
    )
  }

  // Notes
  const addNote = async (note) => {
    const created = {
      id: `nt_${Date.now()}`,
      pinned: false,
      updatedAt: new Date().toISOString(),
      ...note
    }
    setNotes((prev) => [created, ...prev])
    if (note.subjectId) {
      setSubjects((prev) =>
        prev.map((s) => (s.id === note.subjectId ? { ...s, notesCount: s.notesCount + 1 } : s))
      )
    }
    try {
      if (backendStatus === 'connected') await NotesAPI.create(created)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const updateNote = async (id, updatedFields) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, ...updatedFields, updatedAt: new Date().toISOString() } : n
      )
    )
    try {
      if (backendStatus === 'connected') await NotesAPI.update(id, updatedFields)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const deleteNote = async (id) => {
    const note = notes.find((n) => n.id === id)
    setNotes((prev) => prev.filter((n) => n.id !== id))
    if (note?.subjectId) {
      setSubjects((prev) =>
        prev.map((s) => (s.id === note.subjectId ? { ...s, notesCount: Math.max(0, s.notesCount - 1) } : s))
      )
    }
    try {
      if (backendStatus === 'connected') await NotesAPI.delete(id)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const togglePinNote = (id) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)))
  }

  // User Profile
  const updateUser = async (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }))
    try {
      if (backendStatus === 'connected') await UserAPI.updateProfile(updatedFields)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  // Notifications
  const addNotification = (notif) => {
    const created = {
      id: `notif_${Date.now()}`,
      unread: true,
      timestamp: new Date().toISOString(),
      ...notif
    }
    setNotifications((prev) => [created, ...prev])
  }

  const markNotificationRead = async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
    try {
      if (backendStatus === 'connected') await NotificationsAPI.markAsRead(id)
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  const markAllNotificationsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
    try {
      if (backendStatus === 'connected') await NotificationsAPI.markAllAsRead()
    } catch (e) {
      console.warn('Backend sync failed:', e.message)
    }
  }

  return (
    <AppContext.Provider
      value={{
        // Data states
        user,
        updateUser,
        subjects,
        addSubject,
        updateSubject,
        deleteSubject,
        assignments,
        addAssignment,
        updateAssignment,
        deleteAssignment,
        toggleSubtask,
        studySessions,
        addStudySession,
        updateStudySession,
        deleteStudySession,
        toggleSessionComplete,
        notes,
        addNote,
        updateNote,
        deleteNote,
        togglePinNote,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        analytics,
        // UI & navigation states
        searchQuery,
        setSearchQuery,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        backendStatus,
        // Pomodoro Timer states
        timerMode,
        timeLeft,
        isTimerRunning,
        completedPomodoros,
        timerSubjectId,
        ambientSound,
        setTimerSubjectId,
        setAmbientSound,
        startTimer,
        pauseTimer,
        resetTimer,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
