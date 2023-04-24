import React from "react";
import { Link } from "react-router-dom";

const SideNav: React.FC = () => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Link to="/home">
        Home
      </Link>
      <Link to="/about">
        About 
      </Link>
    </div>
  )
}

export default SideNav