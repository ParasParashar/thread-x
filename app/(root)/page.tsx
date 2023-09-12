"use server"
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export default async function Home() {
  const result = await fetchPosts(1,20);
  const user =await currentUser();
  if(!user) redirect('/sign-in')
  return (
    <>
      <section className="mt-9 felx flex-col gap-10 ">
        {result.posts.length === 0 ? (
          <p className="text-lg text-center font-mono">No threads</p>
        ):(
          <>
          {result.posts.map((post:any)=>(
            <ThreadCard
            key={post._id}
            id={post.id}
            currentUserId ={user?.id  || ""}
            parentId ={post.parentId}
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
    </>
  )
}