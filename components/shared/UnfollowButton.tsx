"use client";

import { unfollowUser } from "@/lib/actions/user.actions";
import { useCallback } from "react";

type props = {
  currentUserId: string;
  followUserId: string;
};
const UnfollowButton = ({ currentUserId, followUserId }: props) => {
    const handleUnfollow =useCallback(async()=>{
        await unfollowUser(currentUserId,followUserId);
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
