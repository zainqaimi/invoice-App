import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <Layout className="flex flex-1 pt-16">
        <div
          className={`fixed top-16 left-0 z-40 h-[calc(100%-4rem)] bg-white shadow-md transition-all duration-300 
          ${collapsed ? "w-16" : "w-64"}`}
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
