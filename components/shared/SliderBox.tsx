"use client";
import Link from "next/link";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SmallLoader from "./SmallLoader";
import {
  SheetClose,
} from "@/components/ui/sheet";
import { getUserConversations } from "@/lib/actions/user.actions";
const SliderBox = () => {
  const [UserConversation, setUserConversation] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
     async function getData(){
      const data = await getUserConversations();
      setUserConversation(data)
      setLoader(false)
    }
    getData();
  }, []);
  return (
    <div className="mt-5">
      {loader ? (
        <div className="flex items-center justify-center h-[60vh]">
          <SmallLoader />
        </div>
      ) : (
        <>
          {UserConversation.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <h1 className="head-text text-center break-words text-2xl text-gray-600">
                !!!Currently You don't have any previous conversations with anyone
              </h1>
            </div>
          ) : (
            <>
              {UserConversation.map((user: any, index: any) => (
                <div key={index} className="mt-3 ">
                  <SheetClose asChild>
                    <Link
                      className="flex items-center gap-2 rounded-2xl p-4 border-[#262626] border-y-[5px] hover:text-white transition-colors hover:bg-[#464646] bg-[#25262970] text-gray-500 "
                      href={`/messages/${user.id}`}
                    >
                      <div className="relative h-12 w-12 object-cover">
                        <Image
                          fill
                          src={user.image}
                          alt="User Profile Photo"
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="text-lg font-semibold">
                        {user.name}
                      </p>
                      <p className="text-xs font-light">
                        started a conversations
                      </p>

                    </Link>
                  </SheetClose>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SliderBox;
