import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.action";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AiOutlinePlus } from "react-icons/ai";
import { currentUser } from "@clerk/nextjs";
import Model from "@/components/shared/Model";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const allCommunities = await fetchCommunities();
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="head-text font-light text-gray-600">Communities</h1>
        <Dialog>
          <DialogTrigger asChild>
            <div className="p-3 flex font-light hover:font-bold transition font-mono  items-center  gap-3 cursor-pointer text-gray-400 hover:text-gray-600">
              <AiOutlinePlus size={30} />
              <span className="text-lg ">Create </span>
            </div>
          </DialogTrigger>
          <Model
            imageUrl={user.imageUrl}
            name={user.firstName as string}
            username={user.username as string}
            userId={user.id}
          />
        </Dialog>
      </div>
      <section className="mt-9 flex flex-wrap gap-4">
        {allCommunities.length === 0 ? (
          <p className="head-text text-gray-700 text-center">
           !!! No Communites Found
          </p>
        ) : (
          <>
            {allCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default page;
