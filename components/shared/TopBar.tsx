'use client'
import { SignOutButton ,OrganizationSwitcher,SignedIn} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {dark} from '@clerk/themes'
import { useRouter } from "next/navigation";
const TopBar = () => {
  const router = useRouter();
  return (
    <nav className="topbar">
      <Link
        href={"/"}
        className="
      flex items-center gap-4
      "
      >
        <Image src="./assets/logo.svg" alt="Logo" width={28} height={28} />
        <p className="text-light max-xs:hidden font-bold text-lg">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn >
            <SignOutButton
            signOutCallback={()=>router.push('/sign-in')}
            >
              <div className="flex cursor-pointer">
                <Image src={'./assets/logout.svg'} height={24} width={24} alt="Logout"/>
              </div>
            </SignOutButton>
          </SignedIn>
          </div>
          <OrganizationSwitcher appearance={
            {
            baseTheme:dark,
              elements:{
            organizationSwitcherTrigger:'py-2 px-4'
          }}}/>
      </div>
    </nav>
  );
};

export default TopBar;
