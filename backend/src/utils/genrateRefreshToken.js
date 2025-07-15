import jwt from "jsonwebtoken";

export const genrateRefreshToken = (userId)=>{
    return jwt.sign({userId},process.env.REFRESHTOKEN_SECRET,{expiresIn:"7d"})
};