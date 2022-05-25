import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: { type: String, min:3, max: 25, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, min:6, required: true},
    profileImg: { type: String, default: ""},
    coverImg: { type: String, default: ""},
    followers: { type: Array, default: []},
    following: { type: Array, default: []},
    isAdmin: { type: Boolean, default: false},
    desc: { type:String, max:50},
    currentCity: { type:String, max:50},
    hometown: { type: String, max:50},
    relationship: {type: Number, enum: [1, 2, 3]}
}, {timestamps: true});


// Hash password when it is modified or created
userSchema.pre('save',  async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.pre('findOneAndUpdate',  async function(next) {
    if (!this._update.password) {
        next();
    }

    const salt = await bcrypt.genSalt(12);
    this._update.password = await bcrypt.hash(this._update.password, salt);
})




const User = mongoose.model("User", userSchema);

export default User;