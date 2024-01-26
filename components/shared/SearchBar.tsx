"use client";
import { BsSearch } from "react-icons/bs";
import searchUser from "@/lib/actions/user.actions";
import { useEffect, useMemo, useState } from "react";
import SmallLoader from "./SmallLoader";
import { SheetClose } from "../ui/sheet";
import { debounce } from "@/lib/utils";
import dynamic from "next/dynamic";
import UserCardSkeleton from "../Loader/UserCardSkeleton";

type props = {
  type: "user" | "search";
};
const SearchBar = ({ type }: props) => {
  const [loader, setLoader] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<string[]>([]);
  const debouncedSearchUser = debounce(async (query: string) => {
    const searchResult = await searchUser(query);
    setResult(searchResult);
    setLoader(false);
  }, 500);
  useEffect(() => {
    async function fetchSearchUsers() {
      if (type === "user") {
        debouncedSearchUser(search);
        setResult([]);
      } else {
        if (search.length > 0) {
          const result = await searchUser(search);
          setResult(result);
        }
      }
      setLoader(false);
    }
    fetchSearchUsers();
  }, [search]);
  const UserCard = useMemo(
    () =>
      dynamic(() => import("@/components/cards/UserCard"), {
        loading: () => <UserCardSkeleton />,
        ssr: false,
      }),
    [search]
  );

  if (type === "search") {
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
              {result && result.length > 0
                ? result.slice(0, 2).map((user: any) => (
                    <SheetClose asChild>
                      <UserCard
                        key={user.id}
                        name={user.name}
                        imgUrl={user.image}
                        username={user.userName}
                        id={user.id}
                        personType="User"
                      />
                    </SheetClose>
                  ))
                : null}
            </>
          )}
        </div>
      </div>
    );
  }
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
              <h1 className="text-xl font-light text-gray-500 text-center">
                !!! No users Found
              </h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
