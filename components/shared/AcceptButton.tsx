"use client";

import { acceptsFriendRequests } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface props {
  acceptId: string;
  userId: string;
}
const AcceptButton = ({ acceptId, userId }: props) => {
  const router = useRouter();
  const handleFriendRequest = async (
    userId: string,
    acceptId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await acceptsFriendRequests(userId, acceptId);
    toast.success('Friend Request Accepted');
    router.refresh();

  };
  return (
    <button
      className="follow-button"
      onClick={(e) => handleFriendRequest(userId, acceptId, e)}
    >
      Accept
    </button>
  );
};

export default AcceptButton;
