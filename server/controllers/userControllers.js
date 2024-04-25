import { generateToken } from '../utils/generateToken.js'
import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

// @desc    Register a new user
// @route   POST /api/users/login
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, voter_id, password } = req.body

  const userExists = await User.findOne({ voter_id })

  if (userExists) {
    res.status(400)
    throw new Error('user already exists')
  }

  const user = await User.create({
    name,
    voter_id,
    password,
  })

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      name: name,
      voter_id: voter_id,
      password: password,
      isAdmin: user.isAdmin,
      canVote: user.canVote,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
})

// @desc    Auth user & get token
// @route   POST /api/users
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { voter_id, password } = req.body

  const user = await User.findOne({ voter_id })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      name: user.name,
      voter_id: user.voter_id,
      isAdmin: user.isAdmin,
      canVote: user.canVote,
    })
  } else {
    res.status(401)
    throw new Error('invalid email and password')
  }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({ message: 'Logged Out Successfully' })
})

// @desc    Get User
// @route   Get /api/users/
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// @desc    Get Users
// @route   Get /api/users/admin
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false })
  res.status(200).json(users)
})

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.gender = req.body.gender || user.gender
    user.phone = req.body.phone || user.phone

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      phone: updatedUser.phone,
      gender: updatedUser.gender,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    delete suer
// @route   DELETE /api/users/admin
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    if (user.isAdmin) {
      res.status(400)
      throw new Error('Cannot delte admin user')
    }
    await User.deleteOne({ _id: user._id })
    res.json({ message: 'User removed' })
  } else {
    res.status(4041)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  logoutUser,
  getUser,
  updateUserProfile,
  deleteUser,
  getUsers,
}
