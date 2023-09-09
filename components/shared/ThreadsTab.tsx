import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.action";
import Link from "next/link";

interface props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: props) => {
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
     redirect("/");
    return null; 
  }

  if (!result || result.threads.length === 0) {
    return (
      <section className="flex justify-center flex-col gap-3 h-28 mt-10  items-center">
        <h1 className="head-text text-gray-600">No Threads</h1>
      </section>
    );
  }

  return (
    <section>
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread.id}
          currentUserId={currentUserId || ""}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
          image={thread.image}
          likes={thread.likes}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
