import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import User from './models/userModel.js'

dotenv.config()

const port = process.env.PORT || 8080

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie Parser Middleware
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API IS RUNNING')
})

// User routes
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port : ${port}`))

//change user's status to voted
app.patch('/voted', async (req, res) => {
  const { id } = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { canVote: false },
      { new: true }
    )
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' })
    }
    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server Error' })
  }
})

//resets all users' status to can 'vote' again
app.patch('/reset', async (req, res) => {
  try {
    const updatedUsers = await User.updateMany(
      { canVote: false },
      { canVote: true }
    )
    res.status(200).json({ msg: 'CanVote status reset for users' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server Error' })
  }
})
