"use client";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BiMessageDetail } from "react-icons/bi";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import MessageSlider from "./MessageSlider";
const LeftSideBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { userId } = useAuth();
  return (
    <section className="leftsidebar custom-scrollbar">
      <div className="flex flex-col w-full flex-1 gap-6 px-6">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`leftsidebar_link ${isActive && "bg-blue-500"} `}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={24}
                height={24}
              />
              <p className="max-lg:hidden">{item.label}</p>
            </Link>
          );
        })}
        <div className="leftsidebar_link">
          <Sheet>
            <SheetTrigger asChild>
            <div className="flex items-center justify-center">
                <BiMessageDetail
                  size={24}
                  className="font-light cursor-pointer"
                />
                <p className="max-sm:hidden text-sm font-semibold">Messages</p>
              </div>
            </SheetTrigger>
            <MessageSlider />
          </Sheet>
        </div>

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
