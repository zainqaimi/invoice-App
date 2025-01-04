import React, { useContext } from "react";
import logo from "../assets/images/TC-Logo.png";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import {
  AudioOutlined,
  PoweroffOutlined,
  SettingFilled,
  UserOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import { AuthContext } from "../context/AuthContext";
// import { AuthContext } from "../context/api/AuthContext";

// Navbar Component
const Navbar = () => {
  const { logout } = useContext(AuthContext);

  // Handle Logout
  const handleLogout = () => {
    logout();
  };

  // Dropdown Menu Items
  const debitMenu: MenuProps = {
    items: [
      {
        key: "1",
        label: "Profile",
        icon: <UserOutlined size={24} />,
      },
      {
        key: "2",
        label: "Settings",
        icon: <SettingFilled size={24} />,
      },
      {
        key: "3",
        label: "Logout",
        icon: <PoweroffOutlined size={24} />,
        onClick: handleLogout, // Logout action here
      },
    ],
  };

  const suffix = (
    <AudioOutlined className="cursor-pointer text-[#00a8ec] text-lg" />
  );

  return (
    <div className="py-4 bg-[#00a8ec] text-white flex items-center justify-between md:px-8 px-4">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="h-8 md:h-14 object-cover cursor-pointer"
          />
        </Link>
        <h1 className="md:text-2xl text-md font-semibold">Tassco Chemicals</h1>
      </div>

      {/* Search Bar */}
      <div className="flex items-center space-x-6">
        <Space direction="vertical" className="md:block hidden">
          <Search
            placeholder="Search..."
            enterButton={
              <button className="bg-[#0080c0] hover:shadow-none hover:bg-[#0080c0ef] hover:shadow-slate-200 text-white p-[12px] shadow-md rounded-tr-md rounded-br-md">
                Search
              </button>
            }
            size="large"
            suffix={suffix}
            onSearch={() => console.log("Search")}
          />
        </Space>

        {/* Profile Dropdown */}
        <div className="flex items-center space-x-2">
          <h2 className="lg:text-2xl text-lg font-semibold hidden md:block mb-1">
            Tassco
          </h2>
          <Dropdown
            menu={debitMenu}
            trigger={["hover"]}
            className="w-8 h-8 md:w-10 md:h-10 cursor-pointer"
          >
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
