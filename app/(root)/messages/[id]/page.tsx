import ChatHeader from "@/components/chats/ChatHeader";
import ChatInput from "@/components/chats/ChatInput";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  const userInfo = await fetchUser(params.id);

  return (
    <div className="flex flex-col h-full justify-between rounded-md">
      <ChatHeader
        paramId={params.id}
        name={userInfo.name}
        image={userInfo.image}
      />
      <div className="flex-1 ">message chat</div>
      <ChatInput />
    </div>
  );
};

export default page;
