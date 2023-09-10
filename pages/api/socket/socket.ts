import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { NextApiResponseServerIo } from "@/types";
import Message from "@/lib/models/message.model";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/socket";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket: Socket) => {
      console.log("A user connected");

      socket.on("send-message", async (obj: any) => {
        // console.log("Received a Message data:", obj)
        //storing data to db
        await Message.create({
          senderId: obj.currentUserId,
          receiverId: obj.userId,
          content: obj.content
        });
        // emitting receiver
        io.emit("receive-message", obj);
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });
  }

  res.end();
};

export default ioHandler;


