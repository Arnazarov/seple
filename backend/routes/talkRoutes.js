import express from 'express';
import {
  createTalk,
  fetchTalkByUserId,
} from '../controllers/talkController.js';

const router = express.Router();

router.route('/').post(createTalk);

router.route('/:id').get(fetchTalkByUserId);

export default router;
