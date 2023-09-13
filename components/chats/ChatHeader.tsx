'use client'
import { useState, useEffect } from "react";
import { pusherClient } from "@/lib/pusher";
import Image from "next/image";
import Link from "next/link";

interface props {
  image: string;
  name: string;
  paramId: string;
}

const ChatHeader = ({ image, name, paramId }: props) => {
  const [isUserActive, setIsUserActive] = useState(false);
  const [activeMembers, setActiveMembers] = useState<string[]>([]);

  useEffect(() => {
    pusherClient.connection.bind('error', (err:Error) => {
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
    <nav className="bg-[#272727] p-1 px-3 rounded-t-lg">
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
    </nav>
  );
};

export default ChatHeader;
