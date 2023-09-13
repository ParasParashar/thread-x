"use client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { IoSend } from "react-icons/io5";
import { HiPhotograph } from "react-icons/hi";
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

  //   return () => {
  //     socketInstance.disconnect();
  //   };
  // }, []);

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   socketInstance.emit("send-message", {
  //     content:message,
  //     userId,
  //     currentUserId
  //   });
  //   setMessage("");
  // }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    axios.post("/api/messages", {
      message,
      userId,
    });
    setMessage("");
  }
  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      userId: userId,
    });
  };
  return (
    <div className="flex items-center w-full bg-[#272727] text-white p-3 rounded-b-lg ">
      <CldUploadButton
        onUpload={handleUpload}
        uploadPreset="vyin2ao7"
        options={{ maxFiles: 1 }}
      >
        <HiPhotograph size={30} className="text-blue-400"/>
      </CldUploadButton>
      <form onSubmit={handleSubmit} className="flex items-center w-full ">
        <input
          type="text"
          className="w-full px-3 py-1 bg-[#272727] text-white focus:outline-none mx-2 focus:border-[#a2b8e0] border-b-[2px]"
          autoComplete={"off"}
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="p-2 text-center transition-colors hover:text- rounded-full   hover:bg-gray-500 bg-blue-300 flex items-center">
          <IoSend size={25} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
