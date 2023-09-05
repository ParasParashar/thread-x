import Thread from "@/lib/models/thread.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const body =await request.json();
    const {currentUserId,id} = body;
    try {
        connectToDB();
        const user = await User.findOne({id:currentUserId});
        if(!user) throw new Error('User Not found');
        const thread = await Thread.findOne({
            _id: id,
            author: { $ne: user._id }
          });
          
        if(!thread) throw new Error('Thread Not found');
       const hasReposts = user.reposts.includes(thread);
       if(!hasReposts){
        user.reposts.push(thread._id);
       }
       await user.save();
       NextResponse.json(user);
    } catch (error:any) {
        throw new Error("Something Went Wrong")
    }
}
export async function DELETE(request:Request) {
    const body =await request.json();
    const {currentUserId,id} = body;
    try {   connectToDB();
        const user = await User.findOne({id:currentUserId});
        if(!user) throw new Error('User Not found');
        const thread = await Thread.findById(id);
        if(!thread) throw new Error('Thread Not found');
      const updateUser = await User.updateOne({_id:user._id},{
        $pull:{reposts:thread._id}
       });
       NextResponse.json(updateUser);}
       catch(error:any){
        console.error('something went Wrong',error)
       }
}