import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import Community from "@/lib/models/community.model";
import dynamic from "next/dynamic";
import PostThreadSkeleton from "@/components/Loader/PostThreadSkeleton";
async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const communityIdsAsStrings = userInfo.communities.map((id: any) => id._id);
  const userDataPromises = communityIdsAsStrings.map((communityId: any) =>
    Community.findById(communityId)
  );
  const userData = await Promise.all(userDataPromises);

  const PostThread = dynamic(() => import("@/components/forms/PostThread"), {
    loading: () => <PostThreadSkeleton />,
    ssr: false,
  });
  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo._id} userCommunityId={userData} />
    </>
  );
}

export default Page;
