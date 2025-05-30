import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.SECRET_KEY, {
        expiresIn: "10d",
    });

    res.cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NOD_ENV !== "development",
    });
};

export default generateTokenAndSetCookie;