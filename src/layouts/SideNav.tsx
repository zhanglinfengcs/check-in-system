import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { IsStaff, UserType } from "../types";
import useUser from "../hooks/useUser";

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

function getChineseTitle(item: string): string {
  switch (item) {
    case "Home":
      return "主页";
    case "Notices":
      return "公告";
    case "Leave":
      return "请假";
    case "Account":
      return "账户";
    case "Dashboard":
      return "考勤情况";
    case "Apply":
      return "请假申请";
    case "Workers":
      return "人员管理";
    default:
      return "";
  }
}

const SideNav: React.FC<SideNavProps> = ({ itemList, currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
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

  function handleClick(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    title: string
  ) {
    event.preventDefault();
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
    if (title === "Account") {
      navigate(`/account/${currentUser.userId}`);
    } else {
      let path = "";
      if (user?.isStaff === IsStaff.No) path += "/admin";
      navigate(`${path}/${title.toLowerCase()}`);
    }
  }

  return (
    <div className="h-full flex flex-col justify-start items-center gap-6">
      <div className="w-full flex flex-col">
        <div className="w-10 h-10 m-3">
          <Logo />
        </div>
        <div className="mt-5 mx-auto w-4/5 flex flex-col justify-start items-star bg-violet-100 px-4 py-4 rounded-lg">
          <div className="text-purple-800 font-bold">{currentUser.name}</div>
          <div className="text-purple-800 font-semibold">
            {currentUser.isStaff === IsStaff.Yes ? "员工" : "管理员"}
          </div>
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
              onClick={(e) => {
                handleClick(e, item.title);
              }}
            >
              {/* {item.title} */}
              {getChineseTitle(item.title)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
