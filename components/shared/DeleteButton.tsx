"use client";
import { RiDeleteBin2Line } from "react-icons/ri";
import { deleteThread } from "@/lib/actions/thread.action";
import { deleteCommunity } from "@/lib/actions/community.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface props {
  currentUserId?: string;
  threadId?: string;
  type: "community" | "user";
  communityId?: string;
}
const DeleteButton = ({ currentUserId, threadId, type, communityId }: props) => {
  const router = useRouter();
  const handleDelete = async (currentUserId: string, threadId: string) => {
    await deleteThread(currentUserId, threadId);
    toast.success('Thread Deleted Successfully');
    router.refresh();
  };

  const handleDeleteCommunity = async (communityId: string) => {
    await deleteCommunity(communityId);
    toast.success('Community Deleted Successfully')
    router.refresh();
  };

  return (
    <div>
      {type === "user" ? (
        <RiDeleteBin2Line
          onClick={() => handleDelete(currentUserId || '', threadId || '')}
          size={30}
          className="absolute top-2 mb-3 z-10 right-3 cursor-pointer text-gray-400 hover:text-rose-500"
        />
      ) : (
        <RiDeleteBin2Line
          onClick={() => handleDeleteCommunity(communityId || '')}
          size={30}
          className=" mb-3 z-10 cursor-pointer text-gray-400 hover:text-rose-500"
        />
      )}
    </div>
  );
};

export default DeleteButton;
