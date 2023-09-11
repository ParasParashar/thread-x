import Message from "@/lib/models/message.model";
import { connectToDB } from "@/lib/mongoose";
import { pusherServer } from "@/lib/pusher";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const currentUserId = url.searchParams.get('currentUserId');
    try {
        connectToDB();
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