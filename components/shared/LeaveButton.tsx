"use client"

import {removeUserFromCommunity } from "@/lib/actions/community.action";
import { useRouter } from "next/navigation";

interface Buttonprops{
    id: string;
    members:string ;
}
const LeaveButton = ({id,members}:Buttonprops) => {
  const router= useRouter();
      const onLeaveCommunity=async() => {
        await removeUserFromCommunity(members,id);
        router.refresh();
     };
  return (
          
    <button
    onClick={onLeaveCommunity}
    className="bg-blue-950 hover:bg-slate-700 hover:text-white text-sm text-gray-400 p-2 rounded-full cursor-pointer font-serif">
    Leave 
  </button>
  )
}

export default LeaveButton
