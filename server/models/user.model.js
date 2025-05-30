import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    }
});

const User = mongoose.model("User", userSchema);

export default User;