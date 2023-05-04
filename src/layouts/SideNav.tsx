import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo";
import { IsStaff, UserType } from "../types";

type SideNavItemType = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  current: boolean;
};

interface SideNavProps {
  itemList: SideNavItemType[];
  currentUser: UserType;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SideNav: React.FC<SideNavProps> = ({ itemList, currentUser }) => {
  const location = useLocation();
  const [navItems, setNavItems] = useState(() => {
    return itemList.map((item, index) => {
      if (location.pathname.toLowerCase() === "/admin") {
        if (index === 0) return { ...item, current: true };
      }
      if (location.pathname.includes(item.path.toLowerCase()))
        return { ...item, current: true };
      return item;
    });
  });

  function handleClick(title: string) {
    const newNavItems = [...navItems];
    newNavItems.map((item) => {
      if (item.current) {
        item.current = false;
      }
      if (item.title == title) {
        item.current = true;
      }
    });
    setNavItems(newNavItems);
  }

  return (
    <div className="h-full flex flex-col justify-start items-center gap-6">
      <div className="w-full flex flex-col">
        <div className="w-10 h-10 m-3">
          <Logo />
        </div>
        <div className="mt-5 mx-auto w-4/5 flex flex-col justify-start items-star bg-violet-100 px-4 py-4 rounded-lg">
          <div className="text-purple-800 font-bold">{currentUser.name}</div>
          <div className="text-purple-800 font-semibold">{currentUser.isStaff === IsStaff.Yes ? "普通员工" : "管理员"}</div>
        </div>
      </div>
      <hr className="border-t-1 w-10/12 mx-auto border-solid" />
      <div className="flex flex-col justify-start items-center gap-3 w-full">
        {navItems.map((item) => {
          return (
            <Link
              to={item.path}
              key={item.title}
              className={classNames(
                item.current
                  ? "text-purple-800 bg-violet-100 font-semibold"
                  : "text-gray-900",
                "w-4/5 rounded-lg text-center py-2 hover:bg-violet-100 text-purple-800"
              )}
              onClick={() => {
                handleClick(item.title);
              }}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
