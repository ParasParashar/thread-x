"use client";
import { SignOutButton, SignedIn, currentUser, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaCircle, FaRegUser, FaSearch, FaUser } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { RiHome6Fill, RiHome6Line } from "react-icons/ri";
import { MdGroups, MdOutlineGroups } from "react-icons/md";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchUser, getRequests } from "@/lib/actions/user.actions";

const LeftSideBar = () => {
  const [noReq, setNoreq] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await getRequests();
        if (request.followRequests.length > 0) {
          setNoreq(true);
        }
      } catch (error) {
        console.error(
          "Error Fetching data  Reload the page To solve!!!");
      }
    }

    fetchData();
  }, []);
  const router = useRouter();
  const pathName = usePathname();
  return (
    <section className="leftsidebar custom-scrollbar">
      <div className="flex flex-col w-full flex-1 gap-6 px-6">
        <Link href="/">
          <div
            className={`leftsidebar_link ${
              pathName === "/" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/" ? (
              <RiHome6Fill size={24} />
            ) : (
              <RiHome6Line size={24} />
            )}
            <p className="max-lg:hidden text-sm font-semibold">Home</p>
          </div>
        </Link>
        <Link href="/search">
          <div
            className={`leftsidebar_link ${
              pathName === "/search" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/search" ? (
              <FaSearch size={24} />
            ) : (
              <BsSearch size={24} />
            )}
            <p className="max-lg:hidden text-sm font-semibold">Search</p>
          </div>
        </Link>
        <Link href="/activity">
          <div
            className={`leftsidebar_link relative ${
              pathName === "/activity" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/activity" ? (
              <AiFillHeart size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
            <p className="max-lg:hidden text-sm font-semibold">Activity</p>
            {noReq && (
              <span className="text-blue-500 absolute top-[6px] left-[7px]">
                <FaCircle size={12} className="inline-block " />
              </span>
            )}
          </div>
        </Link>
        <Link href="/create-thread">
          <div
            className={`leftsidebar_link ${
              pathName === "/create-thread" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/create-thread" ? (
              <IoIosCreate size={24} />
            ) : (
              <IoCreateOutline size={24} />
            )}
            <p className="max-lg:hidden text-sm font-semibold">Create</p>
          </div>
        </Link>
        <Link href="/communities">
          <div
            className={`leftsidebar_link ${
              pathName === "/communities" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/communities" ? (
              <MdGroups size={24} />
            ) : (
              <MdOutlineGroups size={24} />
            )}
            <p className="max-lg:hidden text-sm font-semibold">Communities</p>
          </div>
        </Link>
        <Link href="/profile">
          <div
            className={`leftsidebar_link ${
              pathName === "/profile" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/profile" ? (
              <FaUser size={24} />
            ) : (
              <FaRegUser size={24} />
            )}
            <p className="max-lg:hidden text-sm font-semibold">Profile</p>
          </div>
        </Link>
        <div className="mt-10 pl-4">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <div className="flex cursor-pointer">
                <Image
                  src={"./assets/logout.svg"}
                  height={24}
                  width={24}
                  alt="Logout"
                />
                <p className="max-lg:hidden">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </section>
  );
};

export default LeftSideBar;
