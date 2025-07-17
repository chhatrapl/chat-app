import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { genrateAccessToken } from "./genrateAccessToken.js";
import { genrateRefreshToken } from "./genrateRefreshToken.js";

export const genrateAccessAndRefreshToken = async (userId) =>{

 try {
       const user = await User.findById(userId);
       const accessToken = genrateAccessToken(user._id);
       const refreshToken = genrateRefreshToken(user._id);
       
       user.refreshToken = refreshToken;
       await user.save({validateBeforeSave:false});

       return{accessToken, refreshToken}
 } catch (error) {
 throw new Error("Something went wrong while generating tokens");
 }
};