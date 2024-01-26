import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  fetchUser,
  getActivity,
  getRequests,
} from "@/lib/actions/user.actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import AcceptButton from "@/components/shared/AcceptButton";
import dynamic from "next/dynamic";
import ActivityCardSkeleton from "@/components/Loader/ActivityCardSkeleton";

async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const activity = await getActivity(userInfo._id);
  const request = await getRequests();
  const ActivityCard = dynamic(
    () => import("@/components/cards/ActivityCard"),
    {
      loading: () => <ActivityCardSkeleton />,
      ssr: false,
    }
  );
  return (
    <section>
      <h1 className="head-text font-light text-gray-600">Activity</h1>

      <Tabs defaultValue="replies" className="w-full">
        <TabsList className="tab">
          <TabsTrigger value="replies" className="tab">
            Replies
          </TabsTrigger>
          <TabsTrigger value="requests" className="tab">
            Friend Request
            {request.followRequests.length > 0 && (
              <span className="ml-1 rounded-sm text-white bg-gray-500 px-2 py-1">
                {request.followRequests.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="replies" className="mt-9 w-full ">
          <section className="flex flex-col mt-10 gap-5">
            {activity.length > 0 ? (
              <>
                {activity.map((activity) => (
                  <Link key={activity.id} href={`/thread/${activity.parentId}`}>
                    <ActivityCard
                      image={activity.author.image}
                      name={activity.author.name}
                    />
                  </Link>
                ))}
              </>
            ) : (
              <>
                <p className="text-center text-lg text-gray-700">
                  No such Activity
                </p>
                <p className="text-center text-sm text-gray-700">
                  !!!No one is replied to your thread.
                </p>
              </>
            )}
          </section>
        </TabsContent>

        <TabsContent value="requests" className="w-full text-light-1">
          <section className="flex flex-col mt-10 gap-5">
            {request.followRequests.length > 0 ? (
              <>
                {request.followRequests.map((user: any) => (
                  <article className="activity-card justify-between">
                    <Link key={user.id} href={`/profile/${user.id}`}>
                      <div className="flex items-center gap-2">
                        <Image
                          src={user.image}
                          alt="Profile Photo"
                          width={24}
                          height={24}
                          className="rounded-full object-cover"
                        />
                        <p className="text-sm">
                          <span className="text-blue-500">{user.name}</span>
                          {"     "}
                          gives you a friend request.
                        </p>
                      </div>
                    </Link>
                    <AcceptButton userId={userInfo._id} acceptId={user._id} />
                  </article>
                ))}
              </>
            ) : (
              <>
                <p className="text-center text-lg text-gray-600">
                  !!! No Friend's Requests found.....
                </p>
              </>
            )}
          </section>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default page;
