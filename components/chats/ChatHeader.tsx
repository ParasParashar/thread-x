"use client";
import { useState, useEffect, useCallback } from "react";
import { pusherClient } from "@/lib/pusher";
import Image from "next/image";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteUsersChats } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import SmallLoader from "../shared/SmallLoader";

interface props {
  image: string;
  name: string;
  paramId: string;
  userId: string;
}

const ChatHeader = ({ image, name, paramId, userId }: props) => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [activeMembers, setActiveMembers] = useState<string[]>([]);
  const handleShow = () => {
    setIsShow(!isShow);
  };
  const handleDeleteChats = useCallback(async () => {
    setLoader(true);
    await deleteUsersChats(paramId);
    setLoader(false);
    setIsShow(false);
    router.refresh();
  }, [paramId, router]);


  useEffect(() => {
    pusherClient.connection.bind("error", (err: Error) => {
      console.error("Pusher Error:", err);
    });

    const channel = pusherClient.subscribe("presence-messenger");

    channel.bind("pusher:subscription_succeeded", (members: any) => {
      const memberIds = members.map((member: any) => member.id);
      setActiveMembers(memberIds);
      setIsUserActive(true);
    });

    channel.bind("pusher:member_added", (member: any) => {
      setActiveMembers((prevMembers) => [...prevMembers, member.id]);
      setIsUserActive(true);
    });

    channel.bind("pusher:member_removed", (member: any) => {
      setActiveMembers((prevMembers) =>
        prevMembers.filter((id) => id !== member.id)
      );
      setIsUserActive(false);
    });
  }, []);

  const isUserOnline = isUserActive;

  return (
    <nav className="bg-[#272727] p-1 px-3 rounded-t-lg flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative h-14 w-14 object-cover">
          <Link href={`/profile/${paramId}`}>
            <Image
              src={image}
              fill
              alt="Profile Image"
              className="rounded-full object-cover"
            />
          </Link>
        </div>
        <Link href={`/profile/${paramId}`}>
          <h2 className="text-left text-sm font-semibold">{name}</h2>
          {isUserOnline && (
            <span className="text-xs text-gray-600">Active</span>
          )}
        </Link>
      </div>
      <div className="relative cursor-pointer">
        <div 
        onClick={handleShow}
        className="p-2 rounded-full hover:bg-[#373737]">
          <BsThreeDotsVertical onClick={handleShow} size="20" />
        </div>
        {isShow && (
          <div className="flex flex-col justify-center shadow-lg px-3 py-2 bg-[#262626] absolute top-7 right-3 z-50 rounded-lg w-[210px]">
            {loader ? (
              <SmallLoader />
            ) : (
              <button
                onClick={handleDeleteChats}
                className="shadow-xl flex gap-1 items-center rounded-md text-sm cursor-pointer p-2 hover:text-red-500 text-white"
              >
                <RiDeleteBin6Line size={20}/>
                Delete from Everyone
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default ChatHeader;
