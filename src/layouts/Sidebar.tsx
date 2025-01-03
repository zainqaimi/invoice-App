import React, { useContext, useEffect, useState } from "react";
import { Menu } from "antd";
import {
  FaCartArrowDown,
  FaChartLine,
  FaFileSignature,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { RiDiscountPercentFill } from "react-icons/ri";
import { GrCluster, GrUserAdmin } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/api/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (key: string) => {
    if (key === "/Logout") {
      logout();
      navigate("/login");
    } else {
      setSelectedKey(key);
      navigate(key);
    }
  };

  const items = [
    { key: "/", icon: <FaHome size={20} />, label: "Dashboard" },
    { key: "/Accounts", icon: <FaUsers size={20} />, label: "Account's" },
    { key: "/Product", icon: <FaChartLine size={20} />, label: "Product" },
    { key: "/Voucher", icon: <GrCluster size={20} />, label: "Voucher" },
    { key: "/GeneralLedger", icon: <FaCartArrowDown size={20} />, label: "General Ledger" },
    { key: "/AccountType", icon: <FaFileSignature size={20} />, label: "Account Type" },
    { key: "/Discount", icon: <RiDiscountPercentFill size={20} />, label: "Discount" },
    { key: "/Salesofficer", icon: <GrUserAdmin size={20} />, label: "Sales Officer" },
    { key: "/Logout", icon: <IoMdLogOut size={20} />, label: "Logout" },
  ];


  return (
    <div
      className={`h-full flex flex-col justify-between transition-all duration-500 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Menu Items */}
      <Menu
        theme="light"
        className="text-md custom-menu"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => handleMenuClick(key)}
        items={items}
        inlineCollapsed={collapsed}
      />

      {/* Toggle Button */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 bg-[#00a8ec] text-white flex justify-center  hover:bg-[#3bb0df] cursor-pointer transition-all duration-300"
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>
    </div>
  );
};

export default Sidebar;
