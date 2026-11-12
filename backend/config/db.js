const mongoose = require('mongoose')

let isDbConnected = false

const connectDB = async () => {
  const uri = process.env.MONGODB_URI

  // Check for common template placeholders
  const isPlaceholder =
    !uri ||
    uri.includes('<username>') ||
    uri.includes('USERNAME:PASSWORD') ||
    uri.includes('yourcluster.mongodb.net') ||
    uri.includes('cluster0.xxxx')

  if (isPlaceholder) {
    console.log('\n======================================================')
    console.log('ℹ️  MongoDB Atlas Setup Notice:')
    console.log('   The MONGODB_URI in backend/.env currently has placeholder values.')
    console.log('   (e.g., USERNAME:PASSWORD@yourcluster.mongodb.net)')
    console.log('   The backend is running in Graceful Fallback Mode so APIs still work.')
    console.log('   👉 To connect your live MongoDB Atlas cloud database:')
    console.log('      1. Go to https://cloud.mongodb.com and create a free M0 cluster.')
    console.log('      2. Add a Database User (username & password).')
    console.log('      3. In Network Access, allow IP 0.0.0.0/0 (allow access from anywhere).')
    console.log('      4. Click "Connect" -> "Drivers" -> Copy your connection string.')
    console.log('      5. Paste it in backend/.env replacing MONGODB_URI.')
    console.log('======================================================\n')
    return false
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...')
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // 5s timeout instead of hanging 30s
    })
    isDbConnected = true
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`)
    return true
  } catch (error) {
    isDbConnected = false
    console.log('\n======================================================')
    console.log(`⚠️  Could not reach MongoDB Atlas (${error.message})`)
    console.log('   Common reasons:')
    console.log('   1. Invalid username or password in backend/.env')
    console.log('   2. Network Access: IP not whitelisted in Atlas (Add 0.0.0.0/0)')
    console.log('   3. Internet / firewall restriction')
    console.log('   👉 Backend is staying online in Fallback Mode.')
    console.log('======================================================\n')
    return false
  }
}

const getIsDbConnected = () => isDbConnected && mongoose.connection.readyState === 1

module.exports = { connectDB, getIsDbConnected }
