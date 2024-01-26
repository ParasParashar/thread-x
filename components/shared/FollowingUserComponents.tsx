import { findThreadOfUserFollowing } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import ThreadCardSkeletion from "@/components/Loader/ThreadCardSkeletion";

const FollowingUserComponents = async () => {
  const user: any | null = await currentUser();
  if (!user?.id) redirect("/sign-in");
  const followingResult = await findThreadOfUserFollowing(user.id);
  const ThreadCard = dynamic(() => import("@/components/cards/ThreadCard"), {
    loading: () => <ThreadCardSkeletion />,
    ssr: false,
  });
  return (
    <div>
      <section className="mt-9 felx flex-col gap-10 ">
        {followingResult.length === 0 ? (
          <p className="text-lg text-center font-mono">No threads</p>
        ) : (
          <>
            {followingResult.map((post: any) => (
              <ThreadCard
                key={post._id}
                id={post.id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                image={post.image}
                likes={post.likes}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default FollowingUserComponents;
