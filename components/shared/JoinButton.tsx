"use client"

import { addMemberToCommunity } from "@/lib/actions/community.action";
import { useRouter } from "next/navigation";

interface joinButtonprops{
    id: string;
    members:string[] ;
}
const JoinButton = ({id,members}:joinButtonprops) => {
  const router = useRouter();
    const onJoinCommunity=async() => {
        await addMemberToCommunity(id,members);
        router.refresh();
     };
  return (
          
    <button
    onClick={onJoinCommunity}
    className="bg-blue-800 hover:bg-blue-600 hover:text-white text-sm text-gray-400 p-2 rounded-full cursor-pointer font-serif">
    Join
  </button>
  )
}

export default JoinButton
