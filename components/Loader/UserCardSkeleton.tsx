"use client";

import { Skeleton } from "../ui/skeleton";

const UserCardSkeleton = () => {
  return (
    <article className="flex items-center justify-between opacity-10">
      <div className="flex gap-x-3 items-center">
        <Skeleton className="rounded-full w-14 h-14" />
        <div className="flex flex-col gap-y-2">
          <Skeleton className="h-4 rounded-md w-[80px]" />
          <Skeleton className="h-3 rounded-md w-[120px]" />
        </div>
      </div>
      <Skeleton className="rounded-full h-6 w-6 " />
    </article>
  );
};

export default UserCardSkeleton;
