import jwt from "jsonwebtoken";

export const genrateAccessToken = (userId) =>{
   return jwt.sign({userId},process.env.ACCESSTOKEN_SECRET,{expiresIn:"15min"})
};