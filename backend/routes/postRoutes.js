import express from 'express';
import {
  createPost,
  deletePost,
  fetchPosts,
  likePost,
  updatePost,
  fetchPost,
} from '../controllers/postController.js';

const router = express.Router();

router.route('/').post(createPost);

router.route('/:id').get(fetchPost).put(updatePost).delete(deletePost);

router.route('/:id/like').put(likePost);

router.route('/timeline/:id').get(fetchPosts);

export default router;
