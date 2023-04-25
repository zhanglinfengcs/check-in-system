import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

type SideNavItemType = {
  title: string,
  path: string;
  icon?: React.ReactNode,
  current: boolean,
}

const sideNavItems: SideNavItemType[] = [
  { title: 'Home', path: '/home', current: true },
  { title: 'About', path: '/about', current: false}
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const SideNav: React.FC = () => {
  const [navItems, setNavItems] = useState(sideNavItems);

  function handleClick(title: string) {
    const newNavItems = [...navItems];
    newNavItems.map((item) => {
      if (item.current === true) {
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
          <div className="text-purple-800 font-bold">
            David
          </div>
          <div className="text-purple-800 font-semibold">
            Manager
          </div>
        </div>
      </div>
      <hr className="border-t-1 w-10/12 mx-auto border-solid"/>
      <div className="flex flex-col justify-start items-center gap-3 w-full">
        {
          navItems.map((item) => {
            return (
              <Link 
                to={item.path} 
                key={item.title} 
                className={
                  classNames(
                    item.current 
                    ? "text-purple-800 bg-violet-100 font-semibold" 
                    : "text-gray-900",
                    "w-4/5 rounded-lg text-center py-2 hover:bg-violet-100 text-purple-800"
                  )
                }
                onClick={() => {
                  handleClick(item.title);
                }}
              >
                {item.title}    
              </Link>
            )
          })
        }        
      </div>
    </div>
  );
};

export default SideNav;
