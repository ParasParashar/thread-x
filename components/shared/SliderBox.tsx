import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SmallLoader from "./SmallLoader";
import { getUserConversations } from "@/lib/actions/user.actions";
import toast from "react-hot-toast";
import { SheetClose } from "../ui/sheet";

const SliderBox = () => {
  const [data, setData] = useState<any>({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getUserConversations();
        setData(response);
        setLoader(false);
      } catch (error) {
        toast.error('Error Fetching data !!!')
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-5">
      {loader ? (
        <div className="flex items-center justify-center h-[60vh]">
          <SmallLoader />
        </div>
      ) : (
        <>
          {data.participantInfo && data.participantInfo.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <h1 className="head-text text-center break-words text-2xl text-gray-600">
                !!!Currently You don't have any previous conversations with anyone
              </h1>
            </div>
          ) : (
            <>
              {data.participantInfo &&
                data.participantInfo.map((participant: any, index: any) => (
                  <div key={index} className="mt-3">
                      <SheetClose asChild>
                    <Link
                      className="flex items-center gap-2 rounded-2xl p-4 border-[#262626] border-y-[5px] hover:text-white transition-colors hover:bg-[#464646] bg-[#25262970] text-gray-500"
                      href={`/messages/${participant.id}`}
                    >
                      <div className="relative h-12 w-12 object-cover">
                        <Image
                          fill
                          src={participant.image}
                          alt="User Profile Photo"
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="text-lg font-semibold">{participant.name}</p>
                      <p className="text-xs font-light">started a conversation</p>
                    </Link>
                    </SheetClose>
                  </div>
                ))}
              {data.communityInfo &&
                data.communityInfo.map((community: any, index: any) => (
                  <div key={index} className="mt-3">
                      <SheetClose asChild>
                    <Link
                      className="flex items-center gap-2 rounded-2xl p-4 border-[#262626] border-y-[5px] hover:text-white transition-colors hover:bg-[#464646] bg-[#25262970] text-gray-500"
                      href={`/communities/${community._id}`}
                    >
                      <div className="relative h-12 w-12 object-cover">
                        <Image
                          fill
                          src={community.image} 
                          alt="Community Photo"
                          className="object-cover rounded-full"
                        />
                      </div>
                      <p className="text-lg font-semibold">{community.name}</p>
                      <p className="text-xs font-light">Active in Community</p>
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
