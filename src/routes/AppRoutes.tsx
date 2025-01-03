import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AccountType from "../pages/AccountType";
import Discount from "../pages/Discount";
import Voucher from "../pages/Voucher";
import CreditProductEntry from "../pages/Dashboard/CreditProductEntry";
import DebitGeneralEntry from "../pages/Dashboard/DebitGeneralEntry";
import DebitProductEntry from "../pages/Dashboard/DebitProductEntry.tsx";
import Accounts from "../pages/Accounts";
import ForgotPass from "../pages/auth/ForgotPass";
import ProtectedRoute from "./ProtectedRoute";
import CreditGeneralEntry from "../pages/Dashboard/CreditGeneralEntry";
import Login from "../pages/auth/Login";
import GeneralLedger from "../pages/GeneralLedger/GeneralLedger";
import Product from "../pages/Product/Product";
import SalesOfficer from "../pages/SalesOfficer";
import FilteredPage from "../pages/GeneralLedger/FilteredPage";

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
          <Route path="/Accounts" element={<Accounts />} />
          <Route path="/AccountType" element={<AccountType />} />
          <Route path="/Discount" element={<Discount />} />
          <Route path="/GeneralLedger" element={<GeneralLedger />} />
          <Route path="/ledger/filtered" element={<FilteredPage />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Voucher" element={<Voucher />} />
          <Route path="/Salesofficer" element={<SalesOfficer />} />
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
