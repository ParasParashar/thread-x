"use client";

import { Skeleton } from "../ui/skeleton";

const ActivityCardSkeleton = () => {
  return (
    <article className="flex items-center gap-x-2 px-7 py-4 opacity-10">
      <Skeleton className="rounded-full w-10 h-10" />
      <Skeleton className="h-4 rounded-md w-[240px]" />
    </article>
  );
};

export default ActivityCardSkeleton;
