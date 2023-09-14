import Message from "@/lib/models/message.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose"
import { pusherServer } from "@/lib/pusher";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
) {
    try {
        connectToDB();
        const body = await request.json();
        const { message, userId ,image} = body;
        const user = await currentUser();
        if (!user) throw Error("user  not found");
        const userInfo = await User.findOne({ id: user.id });
        if (!userInfo) throw Error("user not found");
        const convertatorUserInfo = await User.findOne({ _id: userId });
        if (!convertatorUserInfo) throw Error("user not found");
        const newMessage = await Message.create({
            content: message,
            senderId: userInfo._id,
            receiverId: convertatorUserInfo._id,
            image:image
        });
        // using pusher for real times data
        await pusherServer.trigger(userId, 'message:new', newMessage);
        return NextResponse.json(newMessage);
    } catch (error: any) {
        throw new Error("Something Went Wrong" + error.message);
    }
}