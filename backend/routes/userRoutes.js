import express from 'express'
import { getAllUsers, registerUser, authUser, getUserById, updateUserById } from '../controllers/userController.js'

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(registerUser);

router.route('/login')
    .post(authUser);

router.route('/:id')
    .get(getUserById)
    .put(updateUserById) 
    .delete();

export default router;