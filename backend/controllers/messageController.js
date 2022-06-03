import Message from '../models/messageModel.js';

// @desc    Create a message
// @route   POST /api/message
// @access  Private
const createMessage = async (req, res) => {
  try {
    const message = new Message(req.body);

    const createdMessage = await message.save();

    res.status(200).json(createdMessage);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// @desc    Fetch a message by talk id
// @route   GET /api/message/:id
// @access  Private
const fetchMessageByTalkId = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await Message.find({
      talkID: id,
    });
    if (messages) {
      res.status(200).json(messages);
    } else {
      res.status(400).json({ message: 'Message not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { createMessage, fetchMessageByTalkId };
