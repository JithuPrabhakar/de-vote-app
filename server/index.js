const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

//Define a user model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    voter_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    canVote: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

//Add a user
app.post('/register', async (req, res) => {
  const { name, voter_id, password } = req.body
  const userExists = await User.findOne({ voter_id })
  if (userExists) {
    res.status(400).json({ msg: 'user already exists' })
  }
  const newUser = User.create({ name, voter_id, password })
  newUser
    .then((doc) => {
      res.status(200).json(doc)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'Server Error' })
    })
})

//Get all users
app.get('/users', async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

//Login user
app.post('/login', async (req, res) => {
  const { voter_id, password } = req.body
  try {
    const user = await User.findOne({ voter_id })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ msg: 'Invalid credentials' })
    }
    res.status(200).json({ user })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: 'Server Error' })
  }
})

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

app.listen(8080, () => {
  //MongoDB Connection
  mongoose
    .connect(
      'mongodb+srv://jp1234:jp1234@samplecluster.k1g075f.mongodb.net/d-vote-app'
    )
    .then(() => console.log('Connected to MongoDB'))
    .then(() => console.log('Server started at port 8080'))
    .catch((err) => console.error(err))
})
