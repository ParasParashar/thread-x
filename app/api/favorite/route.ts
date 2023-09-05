import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    connectToDB();
    const body = await request.json();
    const { currentUserId, id } = body;
    const user = await User.findOne({ id: currentUserId });
    if (!user) throw new Error('User Not Found');
    const thread = await Thread.findOne({ _id: id });
    const hasFavorite = user.favorite.includes(id);
    if (hasFavorite) {
        user.favorite = user.favorite.filter((id: any) => id !== id);
        thread.likes = thread.likes.filter((id: any) => id !== user._id);
    } else {
        user.favorite.push(id);
        thread.likes.push(user._id);
    }
    await user.save();
    await thread.save();
    return NextResponse.json({ user, thread });
}
export async function DELETE(request: Request) {
    connectToDB();
    const body = await request.json();
    const { currentUserId, id } = body;
    const user = await User.findOne({ id: currentUserId });
    if (!user) throw new Error('User Not Found');
    const updateUser = await User.updateOne({ _id: user._id }, {
        $pull: { favorite: id }
    })
    const updateThread = await Thread.updateOne({ _id: id }, {
        $pull: { likes: user._id }
    });
    return NextResponse.json({ updateUser, updateThread });
}