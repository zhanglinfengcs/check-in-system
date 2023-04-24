import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav.tsx"

const MainLayout: React.FC = () => {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <SideNav />
      </div>
      <div className="col-span-4 h-screen overflow-scroll">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout