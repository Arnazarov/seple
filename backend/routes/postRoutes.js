import express from 'express'
import { createPost, deletePost, fetchPosts, likePost, updatePost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(createPost);

router.route('/:id')
    .put(updatePost)
    .delete(deletePost);

router.route('/:id/like')
    .put(likePost);

export default router;