"use client";

import { Skeleton } from "../ui/skeleton";

const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-y- w-full p-1 opacity-10">
      <div className="flex gap-x-8 w-full items-center">
        <Skeleton className="h-20 w-28 rounded-full" />
        <div className="flex flex-col gap-y-1 w-full">
          <Skeleton className="h-5 w-[109px] rounded-md" />
          <Skeleton className="h-5  w-[200px] rounded-md" />
        </div>
      </div>
      <Skeleton className="w-[200px] h-6 rounded-md mt-4" />
    </div>
  );
};

export default ProfileHeaderSkeleton;
