import Image from "next/image";
import { currentUser } from "@clerk/nextjs";

import { communityTabs } from "@/constants";

import UserCard from "@/components/cards/UserCard";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {MdGroups2} from 'react-icons/md'
import { fetchCommunityDetails } from "@/lib/actions/community.action";
import CommunityMessages from "@/components/chats/CommunityMessages";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  const communityDetails = await fetchCommunityDetails(params.id);
  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.createdBy.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type='Community'
      />

      <div className=''>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-gray-500 text-white px-2 py-1'>
                    {communityDetails.threads.length}
                  </p>
                )}
                {tab.label === "Members" && (
                  <p className='ml-1 rounded-sm bg-gray-500 text-white px-2 py-1'>
                    {communityDetails.members.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
            <TabsTrigger value="messages" className="tab">
               <MdGroups2
                  size={28}
                  className='object-contain text-[#545470] '
                />
                <p className='max-sm:hidden'>Messages</p>
              </TabsTrigger>
          </TabsList>

          <TabsContent value='threads' className='w-full '>
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>

          <TabsContent value='messages' className='mt-3 w-full '>
              <CommunityMessages
              id={params.id}
              currentUserId={userInfo._id}
              />
          </TabsContent>

          <TabsContent value='members' className='mt-9 w-full '>
            <section className='mt-9 flex flex-col gap-10'>
              {communityDetails.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.userName}
                  imgUrl={member.image}
                  personType='User'
                />
              ))}
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

export default Page;