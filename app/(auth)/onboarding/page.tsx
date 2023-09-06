import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if(!user) return null;
  console.log(user.id);
  const userInfo = await fetchUser(user.id);
  // if(!userInfo.onboarded) redirect ('/onboarding'); 
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    userName: userInfo?.userName || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <main className="mx-auto flex-col flex justify-start px-10 py-20 max-w-3xl">
      <h1 className="text-3xl font-bold">Onboarding</h1>
      <p className="mt-3 test-lg">Complete your profile now to use Threads.</p>
      <Link href={'/'} className="text-right text-blue-700 hover:underline">Do it later</Link>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} title="Continue" />
      </section>
    </main>
  );
};

export default page;
