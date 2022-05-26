import express from 'express'
import { getAllUsers, registerUser, authUser, getUserById, updateUserById, deleteUserById, followUser, unfollowUser } from '../controllers/userController.js'

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(registerUser);

router.route('/login')
    .post(authUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUserById) 
    .delete(deleteUserById);

router.route('/:id/follow')
    .put(followUser);

router.route('/:id/unfollow')
    .put(unfollowUser);

export default router;