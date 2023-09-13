import { pusherServer } from "@/lib/pusher";
import { currentUser } from "@clerk/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    try {
        const user = await currentUser();
        if (!user) throw new Error("Something Went Wrong");
        const socketId = request.body.socket_id;
        const channel = request.body.channel_name;
        const data = {
            user_id: user.id,
        };
        const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
        return response.send(authResponse);
    } catch (error:any) {
        throw new Error('pusher server error',error.message)
    }
  
}