"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";
import { CgCommunity } from "react-icons/cg";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Model from "./Model";
import { Button } from "../ui/button";
const TopBar = () => {
  const router = useRouter();
  const { user } = useUser();
  if (!user) return null;
  return (
    <nav className="topbar">
      <Link
        href={"/"}
        className="
      flex items-center gap-4
      "
      >
        <CgCommunity size={52} className="text-blue-600" />
        <p className="text-light max-xs:hidden font-bold text-lg">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden"></div>
        <SignedIn>
          <div>
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <BiMenuAltRight size={40} 
                          className="hover:text-gray-600 text-[#262626] "
                  
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-dark-1">
                  <DropdownMenuLabel className="bg-dark-1">
                    Create Community
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <DialogTrigger asChild>
                      <div className="p-3 flex items-center  gap-3 cursor-pointer bg-dark-1 text-[#262626] hover:text-gray-600">
                        <AiOutlinePlus
                          size={30}
                          className="hover:text-gray-600 text-[#262626] "
                        />
                        <span className="text-lg font-light hover:font-bold transition font-mono ">
                          Create Community
                        </span>
                      </div>
                    </DialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuLabel className="bg-dark-1">
                    <div className="p-3 flex items-center  gap-3 cursor-pointer bg-dark-1 text-[#262626] hover:text-gray-600">
                      <SignedIn>
                        <SignOutButton
                          signOutCallback={() => router.push("/sign-in")}
                        >
                          <div className="flex cursor-pointer gap-3">
                            <PiSignOutBold
                              size={24}
                              className="hover:text-gray-600 text-[#262626] "
                            />
                            <span className="text-lg font-light hover:font-bold transition font-mono ">
                              Logout
                            </span>
                          </div>
                        </SignOutButton>
                      </SignedIn>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
              <Model
                imageUrl={user.imageUrl}
                name={user.firstName as string}
                username={user.username as string}
                userId={user.id}
              />
            </Dialog>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default TopBar;
