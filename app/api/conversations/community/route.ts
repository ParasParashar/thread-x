import Community from "@/lib/models/community.model";
import Message from "@/lib/models/message.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
) {
    try {
        connectToDB();
        const body = await request.json();
        const { currentUserId, communityId } = body;
        const community = await Community.findOne({ _id: communityId });
        if (!community) throw new Error("Community not found");
        const communityMessages = await Message.find(
            { communityId: community._id }
        ).populate({
            path: 'senderId',
            model: User,
            select: 'image name id _id'
        });

        return NextResponse.json(communityMessages);
    } catch (error: any) {
        throw new Error('something Went Wrong' + error.message)
    }

}
