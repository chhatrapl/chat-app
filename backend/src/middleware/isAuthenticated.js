import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isAuthenticated = async (req, res, next)=>{

   try {
     const token = req.cookies?.accessToken ||  req.headers["authorization"]?.replace("Bearer ", "");
 
     if(!token){
        return res.status(401).json({
             sucess:false, 
             message:"token does not exist!"
         })
     }
 
     const decodeToken = jwt.verify(token, process.env.ACCESSTOKEN_SECRET);

     //console.log("decodedtoken : ", decodeToken);
 
     const user = await User.findById(decodeToken.userId).select("-password -refreshToken");
      
     //console.log(user);

     if(!user){
         return res.status(401).json({
             success:false,
             message:"invalid accessToken!"
         })
     };
 
     req.user = user;
     next();
 
   } catch (error) {
    return res.status(500).json({
        success:false,
        message:"somthing went wrong while Auhtorization!",
        error:error.message || error.toString()
    })
   }
};