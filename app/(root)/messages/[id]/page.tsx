import ChatHeader from "@/components/chats/ChatHeader";
import ChatInput from "@/components/chats/ChatInput";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import io from "socket.io-client";
import React from "react";
import { redirect } from "next/navigation";
import ChatArea from "@/components/chats/ChatArea";

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const currentUserInfo =await fetchUser(user.id);
  const userInfo = await fetchUser(params.id);

  return (
    <div className="flex flex-col rounded-lg">
      <ChatHeader
        paramId={params.id}
        name={userInfo.name}
        image={userInfo.image}
        userId={userInfo.id}
      />
      <ChatArea currentUserId={currentUserInfo._id} userId={userInfo._id} />
      <ChatInput currentUserId={currentUserInfo._id} userId={userInfo._id} type="chat" />
    </div>
  );
};

export default Page;
