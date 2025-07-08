import mongoose, { Schema } from "mongoose";

 const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    mobileNumber:{
        tyep:String,
        require:true,
        unique:true,
        index:true
    },
    profilePic:{
        type:String,
        require:true
    }
})

export const User = mongoose.model("User", userSchema);