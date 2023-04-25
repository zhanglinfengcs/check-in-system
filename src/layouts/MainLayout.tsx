import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav.tsx";

const MainLayout: React.FC = () => {
  return (
    <div className="w-screen h-screen grid xl:grid-cols-[1fr_4fr] 2xl:grid-cols-[1fr_6fr]">
      <nav>
        <SideNav />
      </nav>
      <main className="bg-gray-100 my-3 mr-3 rounded-lg">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
