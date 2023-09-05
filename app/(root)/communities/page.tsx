import CommunityCard from "@/components/cards/CommunityCard";
import { fetchCommunities } from "@/lib/actions/community.action"


const page = async() => {  
  const allCommunities = await fetchCommunities({
    searchString:'',
    pageNumber:1,
    pageSize:20,
  });
  return (
    <>
      <h1 className="head-text font-light text-gray-600">Communities</h1>
      <section className='mt-9 flex flex-wrap gap-4'>
      {allCommunities.communities.length === 0 ?(
        <p className="head-text text-gray-700 text-center">
          No Communites Found
          </p>
      ):(
        <>
           {allCommunities.communities.map((community)=>(
        <CommunityCard
        key={community.id}
        id={community.id}
        name={community.name}
        username = {community.username}
        imgUrl ={community.image}
        bio ={community.bio}
        members={community.members}
        />
        ))}
        </>
      )}
      </section>
    </>
  )
}

export default page
