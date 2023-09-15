"use client";
import { BsSearch } from "react-icons/bs";
import searchUser from "@/lib/actions/user.actions";
import { useEffect, useState } from "react";
import UserCard from "../cards/UserCard";
import SmallLoader from "./SmallLoader";

type props = {
  type: "user" | "search";
  userId?: string;
};
const SearchBar = ({ type, userId }: props) => {
  const [loader, setLoader] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    
    async function fetchSearchUsers() {
    if(type === 'user'){
        const result = await searchUser(search);
        setResult(result);
        setLoader(false);
      }else{
        setResult([]);
        if(search.length > 0){
          const result = await searchUser(search);
          setResult(result);
        }
        setLoader(false);  
      }
    }
    fetchSearchUsers();
  }, [search]);
  return (
    <div>
      <div className="flex items-center bg-[#353535f1] p-3 rounded-lg">
        {isSearchActive && (
          <BsSearch size={30} className="text-gray-200 mr-2" />
        )}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsSearchActive(true)}
          onBlur={() => setIsSearchActive(false)}
          placeholder="Search...."
          className="w-full text-lg text-white bg-transparent outline-none"
        />
      </div>
      <div className="mt-5 flex flex-col gap-9">
        {loader ? (
          <div className="flex items-center justify-center h-[20vh]">

          <SmallLoader />
          </div>
        ) : (
          <>
            {result && result.length > 0 ? (
              result
                .slice(0, 3)
                .map((user: any) => (
                  <UserCard
                    name={user.name}
                    imgUrl={user.image}
                    username={user.userName}
                    id={user.id}
                    personType="User"
                  />
                ))
            ) : (
              type === 'user' ?(
              <h1 className="text-xl font-light text-gray-500 text-center">
                !!! No users Found
              </h1>
              ):(
                null
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
