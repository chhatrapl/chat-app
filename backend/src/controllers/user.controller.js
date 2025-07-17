import { User } from "../models/user.model.js";
import { genrateAccessToken } from "../utils/genrateAccessToken.js";
import { genrateAccessAndRefreshToken } from "../utils/genrateAccessTokenAndRefreshToken.js";
import {genrateRefreshToken} from "../utils/genrateRefreshToken.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
      try {
         let {name, mobileNumber, password} = req.body;

         console.log(name)
         console.log("type", typeof name)
         console.log(password)
         console.log("type", typeof password)
         console.log(mobileNumber);
       console.log("type", typeof mobileNumber);

   if ([name, mobileNumber, password].some(field => typeof field !== "string" || field.trim() === "")) {
  console.log("All fields must be valid strings");
  return res.status(400).json({ success: false, message: "All fields must be non-empty strings" });
}
       
       const mobileRegex = /^[6-9]\d{9}$/;
        if(!mobileRegex.test(mobileNumber)){
         return res.status(401).json({success:false, message:"this is not a valid number"})
        };
      
        console.log("mobile number is valid");
 
         console.log("user checking....")
        const existingUser = await User.findOne({mobileNumber});
        if(existingUser){
         return res.status(409).json({ message:"user already existed with this number!"});
        };
   
        console.log("profilePic checking.....")
        const profilePicLocalPath = req.files?.profilePic[0]?.path;
        if(!profilePicLocalPath){
         return res.status(401).json({success:false, message:"profilePic is required!"})
        }
        console.log("profile pic thik hai ")
   
       try {
          const hashedPassword = await bcrypt.hash(password, 10);
     
          const user = await User.create({
           name,
           mobileNumber,
           profilePic:profilePicLocalPath,
           password:hashedPassword
          });
     
     
           const isProduction = process.env.NODE_ENV === "production";
     
     
           const accessToken = genrateAccessToken(user._id);
           console.log("accesstoken :" , accessToken);
     
            res.cookie("accesstoken", accessToken,{
              httpOnly:true,
              sameSite:"Strict",
              secure:isProduction,
              maxAge:15*60*60*1000
            });
     
            console.log("access cookie set successfully");
     
            const refreshToken = genrateRefreshToken(user._id);
            console.log("refreshtoken: ",refreshToken);
           res.cookie("refreshToken", refreshToken,{
              httpOnly:true,
              secure:isProduction,
              sameSite:"Strict",
              maxAge:7*24*60*60*1000
           })
           
           console.log("refreshtoken set successfully.");
     
     return res.status(201).json({
        success:true,   
         message:"user created successfully",
         user:{
           _id:user._id,
           name:user.name,
           mobileNumber:user.mobileNumber,
            profilePic: user.profilePic
         }
     })
     
       } catch (error) {
         return res.status(500).json(
            {
               success:false,
                message:"somthing went wrong user does not created!",
                 error: error.message || error.toString() || "Unknown error"
               }
            )
       }
   
      } catch (error) {
         return res.status(500).json({
            success:false,
            message:"somthing went wrong!",
            error: error.message || error.toString() || "Unknown error"
         })
      }


   };

 export const login = async (req, res) =>{
   try {
      
             const {mobileNumber, password} = req.body;
              console.log("type :", typeof mobileNumber);

             if([mobileNumber, password].some(field => typeof field !== "string" || field.trim() === "")){
                 console.log("All fields must be valid strings");
                 return res.status(400).json({ success: false, message: "All fields must be non-empty strings" });
             }
          
             const user = await User.findOne({mobileNumber});
   
             if(!user){
                      console.log("Theres no users with this mobile number!");
                 return res.status(400).json({ success: false, message: "Theres no users with this mobile number!" });
             }
   
             const isPasswordCorrect = await bcrypt.compare(password, user.password);
   
             if(!isPasswordCorrect){
                     console.log("password is incorrect!");
                 return res.status(400).json({ success: false, message: "password is incorrect!" });
             }
   
               const loggedInUser = await User.findOne({_id:user._id}).select("-password, -refreshToken");
   
               try {
                  const {accessToken, refreshToken} = await genrateAccessAndRefreshToken(user._id);
   
             const options = {
              httpOnly:true,
              secure:true
            }
   
            return res.status(201).cookie("accessToken", accessToken, options)
                                  .cookie("refreshToken", refreshToken, options)
                                  .json({
                                    success:true,
                                    message:"user loggedIn successfully.",
                                    user:loggedInUser, accessToken, refreshToken
                                  })
               } catch (error) {
                   return res.status(400).json({success:false, message:"somthing err in genrating tokens!"})
               }
   
   } catch (error) {
      
     return res.status(500).json({
      success:false,
      message:"something went wrong while login!",
      error: error.message || error.toString() || "unknown err"
     })
        
   }
   };