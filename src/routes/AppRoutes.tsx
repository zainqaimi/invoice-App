// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import MainLayout from "../layouts/MainLayout";
// import Dashboard from "../pages/Dashboard/Dashboard";
// import AccountType from "../pages/AccountType";
// import Discount from "../pages/Discount";
// import GeneralLedger from "../pages/GeneralLedger/GeneralLedger.tsx";
// import Product from "../pages/Product/Product.tsx";
// import Voucher from "../pages/Voucher";
// import Profile from "../pages/Profile";
// import CreditProductEntry from "../pages/Dashboard/CreditProductEntry";
// import DebitGeneralEntry from "../pages/Dashboard/DebitGeneralEntry";
// import DebitProductEntry from "../pages/Dashboard/DebitProductEntry.tsx";
// import CreditGeneralEntry from "../pages/Dashboard/CreditGeneralEntry.tsx";
// import Account from "../pages/Account/Account.tsx";

// const routes = [
//   { path: "/", element: <Dashboard /> },
//   { path: "/Account", element: <Account /> },
//   { path: "/AccountType", element: <AccountType /> },
//   { path: "/Discount", element: <Discount /> },
//   { path: "/GeneralLedger", element: <GeneralLedger /> },
//   { path: "/Product", element: <Product /> },
//   { path: "/Voucher", element: <Voucher /> },
//   { path: "/Profile", element: <Profile /> },

//   // Debit Voucher Routes
//   { path: "/debit/general", element: <DebitGeneralEntry /> },
//   { path: "/debit/product", element: <DebitProductEntry /> },

//   // Credit Voucher Routes
//   { path: "/credit/general", element: <CreditGeneralEntry /> },
//   { path: "/credit/product", element: <CreditProductEntry /> },
// ];

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<MainLayout />}>
//         {routes.map((route, index) => (
//           <Route key={index} path={route.path} element={route.element} />
//         ))}
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;

import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
// import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import Account from "../pages/Account/Account.tsx";
import AccountType from "../pages/AccountType";
import Discount from "../pages/Discount";
import GeneralLedger from "../pages/GeneralLedger/GeneralLedger.tsx";
import Product from "../pages/Product/Product.tsx";
import Voucher from "../pages/Voucher";
import Profile from "../pages/Profile";
import CreditProductEntry from "../pages/Dashboard/CreditProductEntry";
import DebitGeneralEntry from "../pages/Dashboard/DebitGeneralEntry";
import DebitProductEntry from "../pages/Dashboard/DebitProductEntry.tsx";
import CreditGeneralEntry from "../pages/Dashboard/CreditGeneralEntry.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import ForgotPass from "../pages/auth/ForgotPass.tsx";
import Login from "../pages/auth/Login.tsx";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPass />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/AccountType" element={<AccountType />} />
          <Route path="/Discount" element={<Discount />} />
          <Route path="/GeneralLedger" element={<GeneralLedger />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Voucher" element={<Voucher />} />
          <Route path="/Profile" element={<Profile />} />
          {/* Debit Voucher Routes */}
          <Route path="/debit/general" element={<DebitGeneralEntry />} />
          <Route path="/debit/product" element={<DebitProductEntry />} />
          {/* Credit Voucher Routes */}
          <Route path="/credit/general" element={<CreditGeneralEntry />} />
          <Route path="/credit/product" element={<CreditProductEntry />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
