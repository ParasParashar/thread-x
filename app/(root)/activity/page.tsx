import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import Link from "next/link";

async function page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const activity = await getActivity(userInfo._id);
  return (
    <section>
      <h1 className="head-text">Activity</h1>
      <section className="flex flex-col mt-10 gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((activity) => (
              <Link key={activity.id} href={`/thread/${activity.parentId}`}>
                <article className="activity-card">
                  <Image
                    src={activity.author.image}
                    alt="Profile Photo"
                    width={20}
                    height={20}
                    className="rounded-full object-contain"
                  />
                  <p className="text-sm">
                    <span className="text-blue-500">
                      {activity.author.name}
                    </span>{"     "}
                    replied to your thread.
                  </p>
                </article>
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
    </section>
  );
}

export default page;
