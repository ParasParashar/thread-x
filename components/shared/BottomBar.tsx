"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { BiMessageDetail } from "react-icons/bi";
import MessageSlider from "./MessageSlider";
const BottomBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((item) => {
          const isActive =
            (pathName.includes(item.route) && item.route.length > 1) ||
            pathName === item.route;
          return (
            <Link
              key={item.route}
              href={item.route}
              className={`bottombar_link ${isActive && "bg-blue-500"} `}
            >
              <Image
                src={item.imgURL}
                width={24}
                height={24}
                alt={item.label}
              />
              <p className="max-sm:hidden text-sm font-semibold">
                {item.label.split(" ")[0]}
              </p>
            </Link>
          );
        })}
        <div className="bottombar_link">
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex flex-col items-center justify-center">
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
      </div>
    </section>
  );
};

export default BottomBar;
