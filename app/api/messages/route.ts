import { fetchUser } from "@/lib/actions/user.actions";
import Message from "@/lib/models/message.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        connectToDB();
        const body = request.json();
        console.log(body);
        const user = await currentUser();
        if (!user) throw Error("user  not found");
        const userInfo = await User.findOne({ id: user.id });
        if (!userInfo) throw Error("user not found");
        const userConversation = await Message.find({
            $or: [
                { senderId: userInfo._id },
                { receiverId: userInfo._id }
            ]
        });
        // creating unique set of participant
        const uniqueParticipants: Set<string> = new Set();
        userConversation.forEach((message) => {
            uniqueParticipants.add(message.senderId.toString());
            uniqueParticipants.add(message.receiverId.toString());
        });
        //deleting userId from participant
        const userIdString = userInfo._id.toString();
        uniqueParticipants.delete(userIdString);
        const participantIds = Array.from(uniqueParticipants);
        const participantInfo = await User.find({ 
            _id: {
                $in: participantIds
            }
        })
        .select('id _id image name');
        return NextResponse.json(participantInfo);
    } catch (error: any) {
        throw new Error("Something Went Wrong" + error.message);
    }
}