import express from 'express';
import {
  createPost,
  deletePost,
  fetchTimelinePosts,
  likePost,
  updatePost,
  fetchPost,
  fetchUserPosts,
} from '../controllers/postController.js';

const router = express.Router();

router.route('/').post(createPost);

router.route('/:id').get(fetchPost).put(updatePost).delete(deletePost);

router.route('/:id/like').put(likePost);

router.route('/timeline/:id').get(fetchTimelinePosts);

router.route('/profile/:username').get(fetchUserPosts);

export default router;
