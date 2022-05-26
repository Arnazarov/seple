import express from 'express'
import { createPost, deletePost, fetchPosts, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(createPost);

router.route('/:id')
    .put(updatePost)
    .delete(deletePost);

export default router;