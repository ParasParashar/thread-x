import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import Community from "@/lib/models/community.model";
async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const communityIdsAsStrings = userInfo.communities.map(
    (id:any) => id._id
    );
    const userDataPromises = communityIdsAsStrings.map((communityId:any)=>
      Community.findById(communityId)
    );
    const userData = await Promise.all(userDataPromises);
  return (
    <>
      <h1 className='head-text'>Create Thread</h1>
      <PostThread
       userId={userInfo._id}
       userCommunityId={userData}
        />
    </>
  );
}

export default Page;