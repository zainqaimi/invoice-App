import React from "react";
import logo from "../assets/images/TC-Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-16 bg-blue-600 text-white flex items-center justify-between md:px-8 px-4 shadow-md">
      <div className="flex items-center space-x-2">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="h-8 md:h-14  object-cover cursor-pointer "
          />
        </Link>
        <h1 className="md:text-xl text-md font-bold">Tassco Chemicals</h1>
      </div>
      <div className="hidden md:block ">
        <input type="text" className="" placeholder="Search..." />
      </div>
      <div className="hidden md:block ">
        <div className="flex items-center space-x-2">
          <h2>Tassco</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
