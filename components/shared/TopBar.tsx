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
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BiMessageDetail } from "react-icons/bi";
import MessageSlider from "./MessageSlider";

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
        {/* <CgCommunity size={52} className="text-blue-600" /> */}
        <img alt="Logo" src="/assets/threadx.png"  className="logo" />
        <p className="text-light font-serif max-xs:hidden font-bold text-lg">
          Thread X
        </p>
      </Link>
      <SignedIn>
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <div className="hover:text-gray-300 transition-colors text-gray-500 cursor-pointer p-2 hover:bg-[#2f2f2f] rounded-lg">
                <BiMessageDetail size={35} />
              </div>
            </SheetTrigger>
            <MessageSlider />
          </Sheet>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="hover:text-gray-300 transition-colors text-gray-500 cursor-pointer p-2 hover:bg-[#2f2f2f] rounded-lg">
                  <BiMenuAltRight size={40} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-dark-1">
                <DropdownMenuLabel className="bg-dark-1">
                  Create Community
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <DialogTrigger asChild>
                    <div className="p-3 flex font-light hover:font-bold transition font-mono  items-center  gap-3 cursor-pointer bg-dark-1 text-[#262626] hover:text-gray-600">
                      <AiOutlinePlus size={30} />
                      <span className="text-lg ">Create Community</span>
                    </div>
                  </DialogTrigger>
                </DropdownMenuItem>
                <DropdownMenuLabel className="bg-dark-1">
                  <div className="p-3 flex items-center  gap-3 cursor-pointer bg-dark-1 text-[#262626] hover:text-gray-600">
                    <SignedIn>
                      <SignOutButton
                        signOutCallback={() => router.push("/sign-in")}
                      >
                        <div className="p-3 flex font-light hover:font-bold transition font-mono  items-center  gap-3 cursor-pointer bg-dark-1 text-[#262626] hover:text-gray-600">
                          <PiSignOutBold size={30} />
                          <span className="text-lg ">Logout</span>
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
    </nav>
  );
};

export default TopBar;
