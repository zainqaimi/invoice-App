import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout className="h-screen flex flex-col">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Sidebar and Content */}
      <Layout className="flex flex-1 pt-20">
        <div
          className={`fixed md:top-[90px] top-[66px] left-0 z-40 md:h-[calc(100%-5.6rem)] h-[calc(100%-4.2rem)] bg-white shadow-md transition-all duration-500 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        {/* Content Area */}
        <div
          className={`flex-1 overflow-auto p-4 bg-gray-50 transition-all duration-300 ${
            collapsed ? "ml-20" : "ml-64"
          }`}
        >
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
