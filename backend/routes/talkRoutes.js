import express from 'express';
import {
  createTalk,
  fetchTalkByUserId,
  fetchTalkByUsersId,
} from '../controllers/talkController.js';

const router = express.Router();

router.route('/').post(createTalk);

router.route('/:id').get(fetchTalkByUserId);

router.route('/find/:fid/:sid').get(fetchTalkByUsersId);

export default router;
