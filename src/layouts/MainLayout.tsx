import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav.tsx";
import { UserType, UserLevel } from "../types/index.tsx";
import useUser from "../hooks/useUser.tsx"

type SideNavItemType = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  current: boolean;
};

const simpleSideNavItems: SideNavItemType[] = [
  { title: "Home", path: "/home", current: false },
  { title: "Posts", path: "/posts", current: false },
  { title: "Leave", path: "/leave", current: false },
  { title: "Account", path: "/account", current: false },
];

const adminSideNavItems: SideNavItemType[] = [
  { title: "Dashboard", path: "/admin/dashboard", current: false },
]

const MainLayout: React.FC = () => {
  const { user } = useUser()
  const { level } = user as UserType

  return (
    <div className="w-screen h-screen grid xl:grid-cols-[1fr_4fr] 2xl:grid-cols-[1fr_6fr]">
      <nav>
        {
          level === UserLevel.Admin ? <SideNav props={adminSideNavItems}/> : <SideNav props={simpleSideNavItems} />
        }  
      </nav>
      <main className=" my-3 mr-3 rounded-lg overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
