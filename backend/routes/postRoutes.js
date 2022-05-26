import express from 'express'
import { createPost, deletePost, fetchPosts, likePost, updatePost, fetchPost } from '../controllers/postController.js';

const router = express.Router();

router.route('/')
    .get(fetchPosts)
    .post(createPost);

router.route('/:id')
    .get(fetchPost)
    .put(updatePost)
    .delete(deletePost);

router.route('/:id/like')
    .put(likePost);

export default router;