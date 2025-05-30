import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const {username, email, profilePic, password, confirmPassword} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({
                error: "Password doesn't match"
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                error : "Email is already in use"
            });
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            profilePic,
            password: hashedPassword,
        });

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res);

            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else{
            return res.status(400).json({error: "Invalid user details"});
        }
    } catch (error) {
        console.log("Error in register controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid email or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
        });
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}