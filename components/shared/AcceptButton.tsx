"use client";

import { acceptsFriendRequests } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

interface props{
    acceptId:string
    userId:string
}
const AcceptButton = ({acceptId,userId}:props) => {
    const router = useRouter();
  const handleFriendRequest = async (userId:string,acceptId:string) => {
    await acceptsFriendRequests(userId, acceptId);
    router.refresh();
  };
  return (
    <button
      className="follow-button"
      onClick={() => handleFriendRequest(userId,acceptId)}
    >
      Accept
    </button>
  );
};

export default AcceptButton;
