"use client";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  filterUserFollowers,
  filterUserFollowing,
} from "@/lib/actions/user.actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FollowAndUnfollow from "./FollowAndUnfollow";

interface ModelProps {
  userId: string;
  id: string;
}
const FollowersModel = ({ userId ,id }: ModelProps) => {
  const [followers, setFollowers] = useState<any>([]);
  const [userFollowing, setUserFollowing] = useState<any>([]);
  useEffect(() => {
    async function getFollowers() {
      const followers = await filterUserFollowers(userId);
      setFollowers(followers);
    }

    if (userId) {
      getFollowers();
    }
  }, [userId]);

  useEffect(() => {
    async function getFollowing() {
      const follow = await filterUserFollowing(userId);
      setUserFollowing(follow);
    }

    if (userId) {
      getFollowing();
    }
  }, [userId]);
  return (
    <DialogContent className="bg-[#1d1c1c] max-sm:h-screen max-sm:w-full">
      <DialogHeader>
        <div className="mt-9">
          <Tabs defaultValue="threads" className="w-full">
            <TabsList className="tab">
              <TabsTrigger value="followers" className="tab">
                <p className="text-[#f3f5f7] hover:text-gray-600">Followers</p>
              </TabsTrigger>
              <TabsTrigger value="following" className="tab">
                <p className="text-[#f3f5f7] hover:text-gray-600">Following</p>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="followers" className="mt-9 w-full ">
              {followers.length > 0 ? (
                <>
                  {followers.map((user: any) => (
                    <div className="flex items-center justify-between gap-6 p-2 border-t-[5px] border-t-[#3e3d3d] rounded-2xl">
                    <Link href={`/profile/${user.id}`}>
                        <div
                          key={user.id}
                          className="mt-2 flex items-center gap-3"
                        >
                          <Image
                            width="35"
                            height="35"
                            src={user.image}
                            alt="Following User Profile"
                            className="rounded-full object-cover"
                          />
                          <span className="text-gray-300 font-bold hover:text-gray-600 text-lg">
                            {user.name}
                          </span>
                        </div>
                      </Link>
                      {id !== user.id && (
                        <FollowAndUnfollow
                        currentUserId={id}
                        followUserId={user.id}
                      />
                      )}
                      
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <h1 className="head-text text-lg text-gray-500 text-center">
                    !! No followers
                  </h1>
                </>
              )}
            </TabsContent>
            <TabsContent value="following" className="mt-9 w-full ">
              {userFollowing.length > 0 ? (
                <>
                  {userFollowing.map((user: any) => (
                    <div className="flex items-center justify-between gap-6 p-2 border-t-[5px] border-t-[#3e3d3d] rounded-2xl">
                    <Link href={`/profile/${user.id}`}>
                      <div
                        key={user.id}
                        className="mt-2 flex items-center gap-3"
                      >
                        <Image
                          width="35"
                          height="35"
                          src={user.image}
                          alt="Following User Profile"
                          className="rounded-full object-cover"
                        />
                        <span className="text-gray-300 font-bold hover:text-gray-600 text-lg">
                          {user.name}
                        </span>
                      </div>
                    </Link>
                    {id !== user.id && (
                        <FollowAndUnfollow
                        currentUserId={id}
                        followUserId={user.id}
                      />
                      )}
                 </div>
                  ))}
                </>
              ) : (
                <>
                  <h1 className="head-text text-lg text-gray-500 text-center">
                    !! No following.
                  </h1>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default FollowersModel;
