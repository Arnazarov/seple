import express from 'express'
import { getAllUsers, registerUser } from '../controllers/userController.js'

const router = express.Router();

router.route('/')
    .get(getAllUsers)
    .post(registerUser);

export default router;