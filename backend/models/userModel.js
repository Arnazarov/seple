import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, min:3, max: 25, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min:6, required: true},
    profileImg: { type: String, default: ""},
    coverImg: { type: String, default: ""},
    followers: { type: Array, default: []},
    following: { type: Array, default: []},
    isAdmin: { type: Boolean, default: false}
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;