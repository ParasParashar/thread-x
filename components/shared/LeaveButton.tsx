"use client";

import { removeUserFromCommunity } from "@/lib/actions/community.action";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface Buttonprops {
  id: string;
  members: string;
}
const LeaveButton = ({ id, members }: Buttonprops) => {
  const router = useRouter();

  const onLeaveCommunity = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        await removeUserFromCommunity(members, id);
        toast.success("Success");
        router.refresh();
      } catch (error) {
        toast.error("something went wrong");
      }
    },
    []
  );

  return (
    <button
      onClick={onLeaveCommunity}
      className="bg-blue-950 hover:bg-slate-700 hover:text-white text-sm text-gray-400 p-2 rounded-full cursor-pointer font-serif"
    >
      Leave
    </button>
  );
};

export default LeaveButton;
