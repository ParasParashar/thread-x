import Message from "@/lib/models/message.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
) {
    try {
        connectToDB();
        const body = await request.json();
        const {currentUserId,userId} =body;
        const messages = await Message.find({
            $or:[
                {senderId:currentUserId,receiverId:userId},
                {senderId:userId,receiverId:currentUserId}
            ]
        });
        return NextResponse.json(messages);
    } catch (error:any) {
        throw new Error('something Went Wrong'+error.message)
    }
    
}
