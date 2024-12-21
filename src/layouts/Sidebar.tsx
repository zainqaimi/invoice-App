import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  FaCartArrowDown,
  FaChartLine,
  FaFileSignature,
  FaHome,
  FaUsers,
} from "react-icons/fa";
import { HiFolderMinus } from "react-icons/hi2";
import { IoMdLogOut } from "react-icons/io";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { RiDiscountPercentFill } from "react-icons/ri";
import { GrCluster } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

  useEffect(() => {
    // Update selected key on route change
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const items = [
    {
      key: "/",
      icon: <FaHome size={20} />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/Account",
      icon: <FaUsers size={20} />,
      label: <Link to="/Account">Account</Link>,
    },
    {
      key: "/AccountType",
      icon: <FaFileSignature size={20} />,
      label: <Link to="/AccountType">Account Type</Link>,
    },
    {
      key: "/Discount",
      icon: <RiDiscountPercentFill size={20} />,
      label: <Link to="/Discount">Discount</Link>,
    },
    {
      key: "/GeneralLedger",
      icon: <FaCartArrowDown size={20} />,
      label: <Link to="/GeneralLedger">General Ledger</Link>,
    },
    {
      key: "/Voucher",
      icon: <GrCluster size={20} />,
      label: <Link to="/Voucher">Voucher</Link>,
    },
    {
      key: "/Product",
      icon: <FaChartLine size={20} />,
      label: <Link to="/Product">Product</Link>,
    },
    {
      key: "/Profile",
      icon: <HiFolderMinus size={20} />,
      label: <Link to="/Profile">Profile</Link>,
    },
    { key: "/Logout", icon: <IoMdLogOut size={20} />, label: "Logout" },
  ];

  return (
    <div className="h-full flex flex-col justify-between">
      <Menu
        theme="light"
        className="text-lg"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={({ key }) => setSelectedKey(key)}
        items={items}
        inlineCollapsed={collapsed}
      />
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="w-full p-2 bg-blue-500 text-white flex justify-center hover:bg-blue-600 cursor-pointer"
      >
        {collapsed ? <RightOutlined /> : <LeftOutlined />}
      </div>
    </div>
  );
};

export default Sidebar;

// local storage me sidebar close ko save rakha
// import React, { useEffect, useState } from "react";
// import { Menu } from "antd";
// import {
//   FaCartArrowDown,
//   FaChartLine,
//   FaFileSignature,
//   FaHome,
//   FaUsers,
// } from "react-icons/fa";
// import { HiFolderMinus } from "react-icons/hi2";
// import { IoMdLogOut } from "react-icons/io";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import { RiDiscountPercentFill } from "react-icons/ri";
// import { GrCluster } from "react-icons/gr";
// import { Link, useLocation } from "react-router-dom";

// interface SidebarProps {
//   collapsed: boolean;
//   setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
//   const location = useLocation();
//   const [selectedKey, setSelectedKey] = useState<string>(location.pathname);

//   // 🚀 **Persist sidebar state on reload**
//   useEffect(() => {
//     const savedState = localStorage.getItem("sidebarCollapsed");
//     if (savedState !== null) {
//       setCollapsed(savedState === "true");
//     }
//   }, [setCollapsed]);

//   useEffect(() => {
//     localStorage.setItem("sidebarCollapsed", String(collapsed));
//   }, [collapsed]);

//   useEffect(() => {
//     setSelectedKey(location.pathname);
//   }, [location.pathname]);

//   const items = [
//     {
//       key: "/",
//       icon: <FaHome size={20} />,
//       label: <Link to="/">Dashboard</Link>,
//       // title: "Dashboard",
//     },
//     {
//       key: "/Account",
//       icon: <FaUsers size={20} />,
//       label: <Link to="/Account">Account</Link>,
//       title: "Account",
//     },
//     {
//       key: "/AccountType",
//       icon: <FaFileSignature size={20} />,
//       label: <Link to="/AccountType">Account Type</Link>,
//       title: "Account Type",
//     },
//     {
//       key: "/Discount",
//       icon: <RiDiscountPercentFill size={20} />,
//       label: <Link to="/Discount">Discount</Link>,
//       title: "Discount",
//     },
//     {
//       key: "/GeneralLedger",
//       icon: <FaCartArrowDown size={20} />,
//       label: <Link to="/GeneralLedger">General Ledger</Link>,
//       title: "General Ledger",
//     },
//     {
//       key: "/Voucher",
//       icon: <GrCluster size={20} />,
//       label: <Link to="/Voucher">Voucher</Link>,
//       title: "Voucher",
//     },
//     {
//       key: "/Product",
//       icon: <FaChartLine size={20} />,
//       label: <Link to="/Product">Product</Link>,
//       title: "Product",
//     },
//     {
//       key: "/Profile",
//       icon: <HiFolderMinus size={20} />,
//       label: <Link to="/Profile">Profile</Link>,
//       title: "Profile",
//     },
//     {
//       key: "/Logout",
//       icon: <IoMdLogOut size={20} />,
//       label: "Logout",
//       title: "Logout",
//     },
//   ];

//   return (
//     <div className="h-full flex flex-col justify-between">
//       <Menu
//         theme="light"
//         className="text-lg"
//         mode="inline"
//         selectedKeys={[selectedKey]} // 👈 Persist selected menu item
//         onClick={({ key }) => setSelectedKey(key)} // 👈 Update selected menu item
//         items={items}
//         inlineCollapsed={collapsed} // 👈 Handle collapse state
//       />
//       <div
//         onClick={() => {
//           setCollapsed((prev) => {
//             localStorage.setItem("sidebarCollapsed", String(!prev)); // 👈 Update localStorage immediately
//             return !prev;
//           });
//         }}
//         className="w-full p-2 bg-blue-500 text-white flex justify-center hover:bg-blue-600 cursor-pointer"
//       >
//         {collapsed ? <RightOutlined /> : <LeftOutlined />}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
