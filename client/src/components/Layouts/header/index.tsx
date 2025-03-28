"use client";

import { SearchIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
// import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSidebarContext } from "../sidebar/sidebar-context";

export function Header() {
const { toggleSidebar, isMobile } = useSidebarContext();
const [isAuthenticated, setIsAuthenticated] = useState(false);
const router = useRouter();
useEffect(() => {
      const loggedInUser = localStorage.getItem("authenticated");
      if (loggedInUser) {
          setIsAuthenticated((loggedInUser as unknown) as boolean);
      } else {
          router.push("/");
      }
}, []);

return (

  isAuthenticated && <header style={{zIndex:"1"}} className=" top-0 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
      onClick={toggleSidebar}
      className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] "
    >
      <MenuIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </button> 

    {isMobile && (
      <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
        <Image
          src={"/images/logo/logo-icon.svg"}
          width={32}
          height={32}
          alt=""
          role="presentation"
        />
      </Link>
    )} 

    <div className="mx-auto w-full flex flex-col items-center  max-xl:hidden">
      <h1 className="mb-0.5  text-heading-5 font-bold text-dark dark:text-white">
        Dashboard
      </h1>
      <p className="font-medium">Next.js Admin Dashboard Solution</p>
    </div>

    <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
{/*       <div className="relative w-full max-w-[300px]">
        <input
          type="search"
          placeholder="Search"
          className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
        />

        <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
      </div> */}

      {/* <ThemeToggleSwitch /> */}

      {/* <Notification /> */}

      <div className="shrink-0">
        <UserInfo />
      </div> 
    </div>
  </header>
);
}
