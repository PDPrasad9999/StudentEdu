const mongoose = require('mongoose')

let isDbConnected = false
let cachedPromise = null

const connectDB = async () => {
  // If already connected, reuse connection
  if (mongoose.connection.readyState === 1) {
    isDbConnected = true
    return true
  }

  const uri = process.env.MONGODB_URI

  // Check for common template placeholders or unreplaced angle brackets
  const isPlaceholder =
    !uri ||
    uri.includes('<') ||
    uri.includes('USERNAME:PASSWORD') ||
    uri.includes('yourcluster.mongodb.net') ||
    uri.includes('cluster0.xxxx')

  if (isPlaceholder) {
    console.log('\n======================================================')
    console.log('ℹ️  MongoDB Atlas Setup Notice:')
    console.log('   The MONGODB_URI in environment variables currently has placeholder values or angle brackets <>.')
    console.log('   The backend is running in Graceful Fallback Mode so APIs still work.')
    console.log('   👉 To connect your live MongoDB Atlas cloud database:')
    console.log('      1. Go to https://cloud.mongodb.com and create a free M0 cluster.')
    console.log('      2. Add a Database User (username & password).')
    console.log('      3. In Network Access, allow IP 0.0.0.0/0 (allow access from anywhere).')
    console.log('      4. Click "Connect" -> "Drivers" -> Copy your connection string.')
    console.log('      5. Paste it in MONGODB_URI replacing <username> and <password> (without < >).')
    console.log('======================================================\n')
    return false
  }

  if (!cachedPromise) {
    console.log('⏳ Connecting to MongoDB Atlas...')
    cachedPromise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000, // 5s timeout
      })
      .then((conn) => {
        isDbConnected = true
        console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`)
        return true
      })
      .catch((error) => {
        cachedPromise = null
        isDbConnected = false
        console.log('\n======================================================')
        console.log(`⚠️  Could not reach MongoDB Atlas (${error.message})`)
        console.log('   Common reasons:')
        console.log('   1. Invalid username or password in MONGODB_URI')
        console.log('   2. Network Access: IP not whitelisted in Atlas (Add 0.0.0.0/0)')
        console.log('   3. Internet / firewall restriction')
        console.log('   👉 Backend is staying online in Fallback Mode.')
        console.log('======================================================\n')
        return false
      })
  }

  return await cachedPromise
}

const getIsDbConnected = () => isDbConnected && mongoose.connection.readyState === 1

module.exports = { connectDB, getIsDbConnected }
