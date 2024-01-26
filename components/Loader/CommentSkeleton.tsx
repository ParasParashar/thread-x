"use client";

import { Skeleton } from "../ui/skeleton";

const CommentSkeleton = () => {
  return (
    <div className="p-2  rounded-lg opacity-10 items-center flex justify-between w-full">
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className=" w-16  h-9 rounded-[30px]" />
    </div>
  );
};

export default CommentSkeleton;
