const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const { connectDB, getIsDbConnected } = require('./config/db')

// Load environment variables
dotenv.config()

const app = express()

// Connect to MongoDB Atlas (non-blocking, graceful fallback)
connectDB()

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbConnected = getIsDbConnected()
  res.json({
    status: 'online',
    appName: 'SmartEdu API',
    database: dbConnected ? 'MongoDB Atlas (Connected)' : 'Fallback Mock Mode (Ready for MongoDB Atlas)',
    isDbConnected: dbConnected,
    timestamp: new Date().toISOString()
  })
})

// Route Handlers
app.use('/api/subjects', require('./routes/subjectRoutes'))
app.use('/api/assignments', require('./routes/assignmentRoutes'))
app.use('/api/sessions', require('./routes/studySessionRoutes'))
app.use('/api/notes', require('./routes/noteRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/analytics', require('./routes/analyticsRoutes'))
app.use('/api/notifications', require('./routes/notificationRoutes'))

// 404 Catch-all handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Endpoint not found: ${req.originalUrl}` })
})

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  console.error('Server Error:', err.message)
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
})

let PORT = parseInt(process.env.PORT, 10) || 5000

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`🚀 SmartEdu Backend Server running on port ${port}`)
    console.log(`📡 API Base URL: http://localhost:${port}/api`)
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️  Port ${port} is currently in use, automatically trying port ${port + 1}...`)
      startServer(port + 1)
    } else {
      console.error('Server error:', err)
    }
  })
}

startServer(PORT)
