"use server";
import ThreadCard from "@/components/cards/ThreadCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchPosts,
  findThreadOfUserFollowing,
} from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const result = await fetchPosts(1, 20);
  const followingResult = await findThreadOfUserFollowing(user.id);
  return (
    <Tabs defaultValue="forYou">
      <div className="w-56 mx-auto ">
        <TabsList className="tab w-56 justify-center ">
          <TabsTrigger value="forYou" className="tab">
            For you
          </TabsTrigger>
          <TabsTrigger value="followings" className="tab">
            Followings
          </TabsTrigger>
        </TabsList>
      </div>
      <div>
        <TabsContent value="forYou" className="mt-9 w-full">
          <section className="mt-9 felx flex-col gap-10 ">
            {result.posts.length === 0 ? (
              <p className="text-lg text-center font-mono">No threads</p>
            ) : (
              <>
                {result.posts.map((post: any) => (
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
        </TabsContent>
        <TabsContent value="followings">
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
        </TabsContent>
      </div>
    </Tabs>
  );
}
