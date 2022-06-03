import mongoose from 'mongoose';

const talkSchema = new mongoose.Schema(
  {
    members: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    ],
  },
  { timestamps: true }
);

const Talk = mongoose.model('Talk', talkSchema);

export default Talk;
