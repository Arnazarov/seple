import express from 'express'
import { createPost, fetchPosts, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(createPost);

router.route('/:id')
    .put(updatePost);

export default router;