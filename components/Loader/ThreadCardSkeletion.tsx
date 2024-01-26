"use client";
import { Skeleton } from "../ui/skeleton";

const ThreadCard = () => {
  return (
    <>
      <article
        className={`flex flex-col gap-y-3 w-full lg:w-8/12 xl:9/12 md:9/12  rounded-2xl p-7 mt-5  opacity-10`}
      >
        <div className="flex items-start justify-between  gap-x-3 ">
          <div className="flex gap-x-8 w-full items-center">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex flex-col gap-y-1 w-full">
              <Skeleton className="h-3 w-1/4 rounded-md" />
              <Skeleton className="h-4 w-1/2 rounded-md" />
            </div>
          </div>
        </div>

        <Skeleton className=" h-[200px] w-full md:h-[300px] lg:[350px] rounded-lg  ml-11" />
        <div className="flex gap-x-5  ml-12">
          <Skeleton className=" w-6 h-6 rounded-full" />
          <Skeleton className=" w-6 h-6 rounded-full" />
        </div>
      </article>
    </>
  );
};

export default ThreadCard;
