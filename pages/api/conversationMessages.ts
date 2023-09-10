import Message from "@/lib/models/message.model";
import { connectToDB } from "@/lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    const {userId,currentUserId} = req.query;
    try {
        connectToDB();
        const messages = await Message.find({
            $or:[
                {senderId:currentUserId,receiverId:userId},
                {senderId:userId,receiverId:currentUserId}
            ]
        });
        res.status(200).json(messages);
    } catch (error:any) {
        throw new Error('something Went Wrong'+error.message)
    }
    
}