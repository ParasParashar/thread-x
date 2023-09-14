"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SmallLoader from "../shared/SmallLoader";
import { format } from "date-fns";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { formatTimestamp } from "@/lib/utils";
import { fetchUser } from "@/lib/actions/user.actions";

interface Message {
  communityId: string;
  currentUserId: string;
  content?: string;
  image?: string;
  createdAt?: any;
  senderId?: any;
}

const ChatArea = ({ communityId, currentUserId }: Message) => {
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const div = messageRef.current;
    div?.scrollTo(0, div.scrollHeight);
  }, [data]);

  useEffect(() => {
    axios
      .post(`/api/conversations/community`, {
        communityId,
        currentUserId,
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        setLoading(false);
      });
  }, [communityId, currentUserId]);

  useEffect(() => {
    pusherClient.subscribe(communityId);
    const handleMessage = (message: any) => {
      axios.post(`/api/conversations/community`, {
        communityId,
        currentUserId,
      });
      setData((current: any) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      setLoading(false);
    };
    pusherClient.bind("message:community", handleMessage);
    return () => {
      pusherClient.unsubscribe(communityId);
      pusherClient.unbind("message:community", handleMessage);
    };
  }, [communityId]);

  return (
    <div className="flex-grow p-4 rounded-t-lg min-h-[400px] max-h-[450px] bg-gradient-to-b from-[#272727] via-slate-950 to-[#262626] border-[#272727] border-x-[5px]">
      <div
        ref={messageRef}
        className="h-full relative max-h-[400px] overflow-y-auto scrollbar-custom-class overflow-x-hidden px-2"
      >
        {loading ? (
          <p className="flex justify-center items-center h-[30vh]">
            <SmallLoader />
          </p>
        ) : data.length > 0 ? (
          data.map((message, index) => (
            <div
              key={index}
              className={`flex flex-row mb-2 gap-1 ${
                message.senderId._id === currentUserId
                  ? "justify-end "
                  : "justify-start"
              }`}
            >
              {message.senderId?.image && message.senderId?.name && (
                <div className="flex flex-col gap-1">
                  <div className="relative w-12 h-12 object-cover">
                    <Image
                      src={message.senderId?.image}
                      alt="Sender Profile"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    {message.senderId?.name}
                  </div>
                </div>
              )}
              <div
                className={`${
                  message.senderId._id === currentUserId
                    ? "bg-[#473a63a6]/60 rounded-tr-2xl  rounded-tl-2xl rounded-bl-2xl "
                    : "bg-[#141e36] rounded-tr-2xl rounded-tl-2xl  rounded-br-2xl "
                } text-white px-3 py-2 min-w-[5rem] max-w-xs break-words overflow-wrap`}
              >
                {message.image && (
                  <div className="mb-2">
                    <Image
                      src={message.image}
                      alt="Image"
                      layout="fill"
                      objectFit="cover"
                      className="cursor-pointer hover:scale-110 transition translate"
                    />
                  </div>
                )}
                {message.content}
                <div className="text-xs mt-1 text-neutral-200">
                  {formatTimestamp(message.createdAt)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="head-text text-gray-600 font-light text-center">
            !!No Messages
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatArea;
