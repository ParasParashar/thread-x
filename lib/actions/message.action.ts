import { NextResponse } from "next/server";
import Message from "../models/message.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

export async function getUserConversation(currentUserId:string) {
    try {
        connectToDB();
        const user =await User.findOne({id:currentUserId});
        if(!user) throw new Error('User not found');
        const userConversation = await Message.find({
            $or:[
                {senderId:user._id},
                {reciverId:user._id}
            ]
        })
        console.log(userConversation);
        return userConversation;
        return NextResponse.json(userConversation);
    } catch (error:any) {
        throw new Error('Something Went Wrong'+error.message)
    }
    
}