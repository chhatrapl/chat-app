import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
import {genrateAccessAndRefreshToken} from "../utils/genrateAccessTokenAndRefreshToken.js"

export const refreshAccessToken = async (req, res)=>{

    const incomingRefreshToken = req.cookies.refreshToken;
    if(!incomingRefreshToken){
    return res.status(401).json({
    success: false,
    message: "Unauthorized request: No refresh token provided"
    });
    }

   try {
    
      const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESHTOKEN_SECRET);
//      console.log("decodedtoken", decodedToken)

      const userId = decodedToken.userId;
  //    console.log("userId from backend", userId);

      const user = await User.findById(userId);
      if (!user) {
   return res.status(404).json({
    success: false,
    message: "User not found"
  });
}


      if(user){
        const {accessToken, refreshToken} = await genrateAccessAndRefreshToken(userId);
               const isProduction = process.env.NODE_ENV === "production";

               const option1 = {
                httpOnly:true,
                secure:isProduction,
                sameSite:"Strict",
                maxAge:15*60*1000
               }

               const option2 = {
                httpOnly:true,
                secure:isProduction,
                sameSite:"Strict",
                maxAge:7*24*60*60*1000
               }

               return res.status(201).cookie("accessToken", accessToken, option1)
                                     .cookie("refreshToken", refreshToken, option2)
                                     .json({
                                        success:true,
                                        message:"token refreshed successfully",
                                     })
      }

   } catch (error) {
      console.error("Token refresh failed:", error);
  return res.status(500).json({
    success: false,
    message: "Internal server error while refreshing token",
  });
   }


}