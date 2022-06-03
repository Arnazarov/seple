import express from 'express';
import {
  getAllUsers,
  registerUser,
  authUser,
  getUserById,
  updateUserById,
  deleteUserById,
  followUser,
  unfollowUser,
  getFriends,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUserById).post(registerUser);

router.route('/all').get(getAllUsers);

router.route('/login').post(authUser);

router.route('/:id').put(updateUserById).delete(deleteUserById);

router.route('/:id/follow').put(followUser);

router.route('/:id/unfollow').put(unfollowUser);

router.route('/friends/:id').get(getFriends);

export default router;
