import express from 'express'
import {
  authUser,
  deleteUser,
  getUser,
  getUsers,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser).get(protect, getUser)
router.route('/auth').post(authUser)
router.route('/admin').get(protect, admin, getUsers)
router.route('/logout').post(logoutUser)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .put(protect, updateUserProfile)

export default router
