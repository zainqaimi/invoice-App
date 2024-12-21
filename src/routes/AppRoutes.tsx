import React from "react";
import Dashboard from "../pages/Dashboard";
import Account from "../pages/Account";
import AccountType from "../pages/AccountType";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Discount from "../pages/Discount";
import GeneralLedger from "../pages/GeneralLedger";
import Product from "../pages/Product";
import Voucher from "../pages/Voucher";
import Profile from "../pages/Profile";

const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/Account", element: <Account /> },
  { path: "/AccountType", element: <AccountType /> },
  { path: "/Discount", element: <Discount /> },
  { path: "/GeneralLedger", element: <GeneralLedger /> },
  { path: "/Product", element: <Product /> },
  { path: "/Voucher", element: <Voucher /> },
  { path: "/Profile", element: <Profile /> },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
