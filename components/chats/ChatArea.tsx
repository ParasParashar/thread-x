"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SmallLoader from "../shared/SmallLoader";
import { format } from "date-fns";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import Image from "next/image";
interface Message {
  userId: string;
  currentUserId: string;
  content?: string;
  image?: string;
  createdAt?: any;
  senderId?: string;
}

const ChatArea = ({ userId, currentUserId }: Message) => {
  const [data, setData] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = messageRef.current;
    div?.scrollTo(0, div.scrollHeight);
  }, [data]);

  useEffect(() => {
    axios
      .post(`/api/conversations`, {
        userId,
        currentUserId,
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, [userId, currentUserId]);

  useEffect(() => {
    pusherClient.subscribe("common-channel");
    const messageHandler = (message: any) => {
      if (
        (message.senderId === currentUserId && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === currentUserId)
      ) {
        axios.post(`/api/conversations`, {
          userId,
          currentUserId,
        });
        setData((current: any) => {
          if (find(current, { id: message.id })) {
            return current;
          }
          return [...current, message];
        });
        setLoading(false);
      }
    };

    pusherClient.bind("message:new",messageHandler);

    return () => {
      pusherClient.unsubscribe("common-channel");
      pusherClient.unbind("message:new");
    };
  }, [userId,currentUserId]);

  return (
    <div
      className="flex-grow p-4
     min-h-[400px] max-h-[450px] bg-gradient-to-b from-[#272727] via-slate-950 to-red-500;
      border-[#272727] border-x-[5px]"
    >
      <div
        ref={messageRef}
        className="h-full relative 
        max-h-[400px] 
        overflow-y-auto scrollbar-custom-class overflow-x-hidden px-2 "
      >
        {loading ? (
          <p className="flex justify-center items-center h-[30vh]">
            <SmallLoader />
          </p>
        ) : data.length > 0 ? (
          data.map((id, index) => (
            <div
              key={index}
              className={`flex mb-2 ${
                id.senderId === currentUserId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  id.senderId === currentUserId
                    ? "bg-[#7070ff]/60 rounded-tr-2xl  rounded-tl-2xl rounded-bl-2xl "
                    : "bg-[#141e36] rounded-tr-2xl rounded-tl-2xl  rounded-br-2xl "
                } text-white px-3 py-2 min-w-[5rem] max-w-xs break-words overflow-wrap`}
              >
                {id.image && (
                  <div className="mb-2">
                    <div
                      className={`relative
                        lg:min-w-[15rem] lg:max-w-[30rem]
                        lg:min-h-[15rem] lg:max-h-[30rem]
                        md:min-w-[13rem] md:max-w-[27rem]
                        md:min-h-[13rem] md:max-h-[27rem]
                         min-w-[10rem] max-w-xs
                          min-h-[10rem] max-h-xs  
                           bg-gray-200 rounded-lg overflow-hidden ${
                             id.senderId === currentUserId
                               ? "float-right"
                               : "float-left"
                           }`}
                    >
                      <Image
                        src={id.image}
                        alt="Image"
                        layout="fill"
                        objectFit="cover"
                        className=" cursor-pointer 
                          hover:scale-110 
                          transition translate"
                      />
                    </div>
                  </div>
                )}
                {id.content}
                <div className="text-xs mt-1 text-neutral-200">
                  {format(new Date(id.createdAt), "p")}
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