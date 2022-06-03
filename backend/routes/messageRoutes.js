import express from 'express';
import {
  createMessage,
  fetchMessageByTalkId,
} from '../controllers/messageController.js';

const router = express.Router();

router.route('/').post(createMessage);

router.route('/:id').get(fetchMessageByTalkId);

export default router;
