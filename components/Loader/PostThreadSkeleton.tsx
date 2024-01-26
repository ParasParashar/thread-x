"use client";

import { Skeleton } from "../ui/skeleton";

const PostThreadSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-5 w-full p-2 opacity-10">
      <Skeleton className="w-full mt-20 h-[200px] rounded-md" />
      <Skeleton className="w-full h-[30px] rounded-md" />
      <Skeleton className="w-full h-[300px] rounded-md" />
    </div>
  );
};

export default PostThreadSkeleton;
