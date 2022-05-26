import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
    desc: {type: String, max: 500},
    img: {type: String},
    likes: {type: Array, default: []}
}, {timestamps: true});


const Post = mongoose.model("Post", postSchema);

export default Post;