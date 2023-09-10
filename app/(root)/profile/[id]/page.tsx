import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  fetchUser,
  fetchUserPosts,
  filterUserFollowers,
  filterUserFollowing,
  getUserReplies,
} from "@/lib/actions/user.actions";
import { profileTabs } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import {TbMessage2} from 'react-icons/tb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import CommunityCard from "@/components/cards/CommunityCard";
import { userCommunity } from "@/lib/actions/community.action";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadCard from "@/components/cards/ThreadCard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import FollowersModel from "@/components/shared/FollowersModel";
import FollowAndUnfollow from "@/components/shared/FollowAndUnfollow";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const currentUserDetails = await fetchUser(user.id);
  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const userReplies = await getUserReplies(userInfo._id);
  const totalParentThreads = await fetchUserPosts(userInfo.id);
  const userCommunityFind = await userCommunity(userInfo._id);
  const followers = await filterUserFollowers(userInfo._id);
  const CurrnetUserfollowings = await filterUserFollowing(
    currentUserDetails._id
  );
  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <ProfileHeader
            accountId={userInfo.id}
            authUserId={user.id}
            name={userInfo.name}
            username={userInfo.userName}
            imgUrl={userInfo.image}
            bio={userInfo.bio}
          />
          <Dialog>
            <DialogTrigger asChild>
              <p className="ml-1 rounded-sm text-gray-500 font-semibold hover:text-gray-600 px-2 py-1 cursor-pointer flex gap-4">
                {followers.map((user, index) => (
                  <Image
                    key={user.id}
                    width="20"
                    height="20"
                    src={user.image}
                    alt="Followers User Profile"
                    className={`${
                      index !== 0 && "-ml-2"
                    } rounded-full object-cover`}
                  />
                ))}
                <span className="text-gray-400 font-light ">
                  {followers.length}
                </span>
                Followers
              </p>
            </DialogTrigger>
            <FollowersModel userId={userInfo._id} id={user.id} />
          </Dialog>
            </div>
          <div className="flex gap-5 items-center p-2">

        {user.id !== userInfo.id && (
          <>
          <FollowAndUnfollow currentUserId={user.id} followUserId={params.id} />
          <Link href={`/messages/${params.id}`} className="unfollow-button">
            <TbMessage2 className='mr-1'/>
            Message
            </Link>
          </>
          )}
          </div>
          </div>
      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                <p className="max-sm:hidden text-gray-400">{tab.label}</p>
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm text-white bg-gray-500 px-2 py-1">
                    {totalParentThreads?.threads?.length}
                  </p>
                )}
                {tab.label === "Replies" && (
                  <p className="ml-1 rounded-sm text-white bg-gray-500 px-2 py-1">
                    {userReplies?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full"
            >
              {tab.value === "threads" && (
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />
              )}
              {tab.value === "replies" && (
                <>
                  {userReplies.length === 0 && (
                    <section>
                      <h1 className="head-text text-center text-gray-600">
                        {userInfo?.name} don't make any reply to anyone.
                      </h1>
                    </section>
                  )}
                  {userReplies.map((tab: any) => (
                    <div key={`reply-${tab._id}`} className="w-full relative">
                      <Link href={`/thread/${tab.parentId}`}>
                        <span className="text-sm z-4 bg-slate-900/80 text-gray-500 hover:text-gray-300 transition hover:bg-slate-800 p-2 rounded-lg absolute right-2 bottom-3 flex items-center">
                          <FiExternalLink size={20} />
                          Original Thread
                        </span>
                      </Link>
                      <ThreadCard
                        key={tab._id}
                        id={tab.id}
                        currentUserId={userInfo._id || ""}
                        parentId={tab.parentId}
                        content={tab.text}
                        author={tab.author}
                        community={tab.community}
                        createdAt={tab.createdAt}
                        comments={tab.children}
                        image={tab.image}
                        likes={tab.likes}
                      />
                    </div>
                  ))}
                </>
              )}
              {tab.value === "community" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    {userCommunityFind?.length > 0 && (
                      <>
                        <h1 className="head-text text-center text-gray-600">
                          Communities Created by {userInfo.name}
                        </h1>
                        <section className="mt-5 flex flex-wrap gap-4">
                          {userCommunityFind?.map((community: any) => (
                            <div
                              key={community.id}
                              className="grid grid-cols-2 gap-4"
                            >
                              <div>
                                <CommunityCard
                                  id={community.id}
                                  name={community.name}
                                  username={community.username}
                                  imgUrl={community.image}
                                  bio={community.bio}
                                  members={community.members}
                                />
                              </div>
                            </div>
                          ))}
                        </section>
                      </>
                    )}
                  </div>

                  {userInfo.communities.length === 0 ? (
                    <section className="flex justify-center flex-col gap-3 h-28 mt-10 items-center">
                      <h1 className="head-text text-center text-gray-600">
                        Currently, {userInfo.name} is not a member of any
                        Community
                      </h1>
                      {user.id === userInfo.id && (
                        <Link
                          href={"/communities"}
                          className="bg-blue-500 hover:bg-blue-700 p-2 rounded-lg shadow-lg"
                        >
                          Join any
                        </Link>
                      )}
                    </section>
                  ) : (
                    <div>
                      <h1 className="head-text text-gray-600 text-center">
                        Communities join by {userInfo.name}
                      </h1>
                      {userInfo.communities.map((activity: any) => (
                        <Link
                          key={activity.id}
                          href={`/communities/${activity._id}`}
                        >
                          <article className="activity-card justify-between mt-5">
                            <div className="flex gap-3">
                              <Image
                                src={activity.image}
                                alt="Profile Photo"
                                width={30}
                                height={30}
                                className="rounded-full object-contain"
                              />
                              <p className="text-lg">
                                <span className="text-blue-500">
                                  {activity.name}
                                </span>
                              </p>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

export default Page;
