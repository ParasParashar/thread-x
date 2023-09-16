"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaRegUser, FaSearch, FaUser } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { RiHome6Fill, RiHome6Line } from "react-icons/ri";
import { MdGroups, MdOutlineGroups } from "react-icons/md";

const BottomBar = () => {
  const pathName = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        <Link href="/">
          <div
            className={`bottombar_link ${
              pathName === "/" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/" ? (
              <RiHome6Fill size={24} />
            ) : (
              <RiHome6Line size={24} />
            )}
            <p className="max-sm:hidden text-sm font-semibold">Home</p>
          </div>
        </Link>
        <Link href="/search">
          <div
            className={`bottombar_link ${
              pathName === "/search" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/search" ? (
              <FaSearch size={24} />
            ) : (
              <BsSearch size={24} />
            )}
            <p className="max-sm:hidden text-sm font-semibold">Search</p>
          </div>
        </Link>
        <Link href="/activity">
          <div
            className={`bottombar_link ${
              pathName === "/activity" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/activity" ? (
              <AiFillHeart size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
            <p className="max-sm:hidden text-sm font-semibold">Activity</p>
          </div>
        </Link>
        <Link href="/create-thread">
          <div
            className={`bottombar_link ${
              pathName === "/create-thread" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/create-thread" ? (
              <IoIosCreate size={24} />
            ) : (
              <IoCreateOutline size={24} />
            )}
            <p className="max-sm:hidden text-sm font-semibold">Create</p>
          </div>
        </Link>
        <Link href="/communities">
          <div
            className={`bottombar_link ${
              pathName === "/communities" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/communities" ? (
              <MdGroups size={24} />
            ) : (
              <MdOutlineGroups size={24} />
            )}
            <p className="max-sm:hidden text-sm font-semibold">Communities</p>
          </div>
        </Link>
        <Link href="/profile">
          <div
            className={`bottombar_link ${
              pathName === "/profile" ? "text-white" : "text-gray-400"
            }`}
          >
            {pathName === "/profile" ? (
              <FaUser size={24} />
            ) : (
              <FaRegUser size={24} />
            )}
            <p className="max-sm:hidden text-sm font-semibold">Profile</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default BottomBar;
