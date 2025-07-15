import mongoose, { Schema } from "mongoose";

 const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        index:true,
        unique:true,
        required:true
    },
    password:{
        type:String,
         required:true
    },
    profilePic:{
        type:String,
        required:true
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema);