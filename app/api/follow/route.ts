import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request ) {
    try {
        connectToDB();
        const body = await request.json();
        const { currentUserId, followUserId } = body;
        const user = await User.findOne({ id: currentUserId });
        if (!user) throw new Error('User not found');
        const followUser = await User.findOne({ id: followUserId });
        const hasFollowRequest = followUser.followRequests.includes(user._id);
        if(!hasFollowRequest){
            followUser.followRequests.push(user._id);
        }
        await followUser.save();
        return NextResponse.json(followUser);
    } catch (error:any) {
        throw new Error(error.message+'Error')
    }

}
export async function DELETE(request: Request ) {
    try {
        connectToDB();
        const body = await request.json();
        const { currentUserId, followUserId } = body;
        const user = await User.findOne({ id: currentUserId });
        if (!user) throw new Error('User not found');
        const followUser = await User.findOne({ id: followUserId });
        if(followUser.followRequests.includes(user._id)){
            await followUser.update({pull:{followRequests:user._id}});
        };
        revalidatePath('/profile'+followUserId)
        return NextResponse.json(followUser);
    } catch (error:any) {
        throw new Error(error.message+'Error')
    }

}