import { Message } from "../models/message.model.js";


export const getAllMessages = async (req, res) => {
    const sender = req.user._id;
    const reciever = req.params._id;

    try {
        const messages = await Message.find({
            $or:[ 
                { sender:sender, receiver:reciever },
                {sender:reciever, receiver:sender}       
            ]
        }).sort({createdAte:1})

        return res.status(201).json({
            success:true,
            messages
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            messages:"somthing went wrong",
            error:error.message
        })
    }
};

export const deleteMessage = async (req, res)=>{
  const user = req.user._id;
//  console.log("user : ",user)
  const msgId = req.params._id;
  //console.log("msgId : ", msgId)
  const msg = await Message.findById(msgId);
  //console.log("msg : ", msg)

  const sender = msg.sender;
  //console.log("sender : ", sender);

try {
      
        const deletedMsg = await Message.findByIdAndDelete(msgId);
        res.status(201).json({
            success:true,
            message:"Message deleted"
        })
      
        return res.status(401).json({
            success:false,
            message:"you cant delete this msg"
        })
      
} catch (error) {
    return res.status(500).json({
        success:false,
        message:"somthing went wrong",error, 
    })
}
};