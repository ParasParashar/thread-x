import Community from "@/lib/models/community.model";
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
        const { message, image, communityId } = body;
        const user = await currentUser();
        if (!user) throw Error("user  not found");
        const userInfo = await User.findOne({ id: user.id });
        if (!userInfo) throw Error("user not found");
        if(userInfo.communities.includes(communityId)){
            const community = await Community.findOne({ _id: communityId });
            if (!community) throw Error("Community not found");
            const newCommunityMessage = await Message.create({
                content: message,
                senderId: userInfo._id,
                communityId: community._id,
                image: image
            });
            // community.messages.push(newCommunityMessage);
            // community.save();
            // sending user data with community 
            const communityMessages = await Message.findOne(
                { communityId: community._id }
            ).populate({
                path: 'senderId',
                model: User,
                select: 'image name id _id'
            }).sort({ createdAt: -1 });
            await pusherServer.trigger(communityId, 'message:community', communityMessages);
            return NextResponse.json(newCommunityMessage);
        }
    } catch (error: any) {
        throw new Error("Something Went Wrong" + error.message);
    }
}