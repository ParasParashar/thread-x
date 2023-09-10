import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

export default async function Page() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");
  const result = await fetchUsers({
    userId:user.id,
    searchString:'',
    pageNumber:1,
    pageSize:20
  });
  return (
    <section>
      <h1 className="head-text">Search</h1>
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0?(
            <p className="text-xl text-center">No User's Found</p>
        ):(
           <>
           {result.users.map((person)=>(
            <UserCard
            key={person.id}
            id={person.id}
            name={person.name}
            username={person.userName}
            imgUrl={person.image}
            personType='User'
            />
           ))}
           </>
        )}
      </div>
    </section>
  )
}


