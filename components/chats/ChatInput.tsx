"use client";
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
let socketInstance: any;

interface Props {
  userId: string;
  currentUserId: string;
}

const ChatInput = ({ userId, currentUserId }: Props) => {
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   socketInstance = io(process.env.NEXT_PUBLIC_SITE_URL!, {
  //     path: "/api/socket/socket",
  //     addTrailingSlash: false,
  //   });
  useEffect(() => {
    socketInstance = io( {
      path: "/api/socket/socket",
      addTrailingSlash: false,
    });
    
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    socketInstance.emit("send-message", {
      content:message,
      userId,
      currentUserId
    });
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full bg-[#272727] text-white px-1 py-2"
    >
      <input
        type="text"
        className="w-full px-3 py-2 bg-[#272727] text-white focus:outline-none focus:border-[#d7d0d0] border-b-[2px]"
        autoComplete={"off"}
        required
        value={message}
        onChange={(e: any) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button className="p-1 rounded-lg text-gray-400 hover:bg-[#353535] flex items-center">
        <span className="max-sm:hidden mr-2">Send</span>
        <IoSend size={25} />
      </button>
    </form>
  );
};

export default ChatInput;
