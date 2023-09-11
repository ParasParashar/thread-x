"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SmallLoader from "./SmallLoader";
import {
  SheetClose,
} from "@/components/ui/sheet";
const SliderBox = () => {
  const router = useRouter();
  const [UserConversation, setUserConversation] = useState<any>([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    axios.post("/api/messages").then((res) => {
      setUserConversation(res.data);
      setLoader(false);
    });
  }, []);
  return (
    <div>
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
                      className="flex items-center gap-2 rounded-md bg-dark-2 px-7 py-4 border-[#262626] border-y-[3px] hover:bg-[#464646]"
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
                      <span className="text-lg font-semibold text-gray-500 ">
                        {user.name}
                      </span>
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
