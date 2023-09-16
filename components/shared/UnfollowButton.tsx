"use client";

import { unfollowUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

type props = {
  currentUserId: string;
  followUserId: string;
};
const UnfollowButton = ({ currentUserId, followUserId }: props) => {
  const router =useRouter();
    const handleUnfollow =useCallback(async(e:React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
        await unfollowUser(currentUserId,followUserId);
        toast.success('Unfollow Successfully')
        router.refresh();
    },[]);
  return (
    <div>
      <button 
      onClick={handleUnfollow}
       className="unfollow-button">Unfollow</button>
    </div>
  );
};

export default UnfollowButton;
