import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}
const ThreadsTab = async ({ currentUserId, accountId, accountType }: props) => {
  let result = await fetchUserPosts(accountId);
  if (!result) redirect("/");

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
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
