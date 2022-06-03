import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    talkID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Talk',
    },
    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: { type: String },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
