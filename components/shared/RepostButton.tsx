"use client";
import { FaRetweet } from "react-icons/fa";
import { RiDeleteBackLine } from "react-icons/ri";
import useRepost from "@/app/hooks/useReposts";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

type props = {
  currentUserId: string;
  id: string;
};

const Repost = ({ currentUserId, id }: props) => {
  const router = useRouter();
  const { hasReposts, toggleReposts } = useRepost({ currentUserId, id });
  const handleButtonClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
      if (!currentUserId) {
        redirect("/sign-in");
        return;
      }
      await toggleReposts(e).then(()=>
        router.refresh()
      );
  };

  return (
    <div
      className="hover:bg-[#1e1e1e] relative rounded-full cursor-pointer p-1"
    >
      {hasReposts ? (
        <RiDeleteBackLine 
        onClick={(e: any) => handleButtonClick(e)}
        size={24} className="text-[#56567b]" />
      ) : (
        <FaRetweet
        onClick={(e: any) => handleButtonClick(e)}
        size={24} className="text-[#56567b]" />
      )}
    </div>
  );
};

export default Repost;
