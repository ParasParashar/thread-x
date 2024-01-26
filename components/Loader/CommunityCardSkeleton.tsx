"use client";

import { Skeleton } from "../ui/skeleton";

const CommunityCardSkeleton = () => {
  return (
    <article className="flex flex-col gap-y-6 w-96 opacity-10">
      <div className="flex gap-x-8 w-full items-center">
        <Skeleton className="h-12  w-14 rounded-full" />
        <div className="flex flex-col gap-y-1 w-full">
          <Skeleton className="h-3 w-1/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
      </div>
      <Skeleton className="w-full h-4 rounded-sm" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-1/6 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </article>
  );
};

export default CommunityCardSkeleton;
