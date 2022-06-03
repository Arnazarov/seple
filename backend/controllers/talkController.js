import Talk from '../models/talkModel.js';

// @desc    Create a conversation
// @route   POST /api/talk
// @access  Private
const createTalk = async (req, res) => {
  try {
    const talk = new Talk({
      members: [req.body.interlocutor1, req.body.interlocutor2],
    });

    const createdTalk = await talk.save();

    res.status(200).json(createdTalk);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// @desc    Fetch a conversation by user id
// @route   GET /api/talk/:id
// @access  Private
const fetchTalkByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const talk = await Talk.find({
      members: { $in: id },
    });

    if (talk) {
      res.status(200).json(talk);
    } else {
      res.status(400).json({ message: 'Conversation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export { createTalk, fetchTalkByUserId };
