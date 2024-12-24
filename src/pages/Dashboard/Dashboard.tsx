// import { DashboardOutlined, DownOutlined } from "@ant-design/icons";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import HoverDropdown from "../../components/Buttons/DropdownMenu/HoverDropdown";
// import { Dropdown, MenuProps, Space } from "antd";
// import { FcGenealogy } from "react-icons/fc";
// import HoverDropdown from "../../components/DropdownMenu/HoverDropdown";

// const items: MenuProps["items"] = [
//   {
//     key: "1",
//     label: "General Entry",
//   },
//   {
//     key: "2",
//     label: " Product Entry",
//   },
// ];
// const Dashboard: React.FC = () => {
//   const [selectedVoucher, setSelectedVoucher] = useState<string | null>(null);
//   const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
//   const navigate = useNavigate();

//   // Voucher Selection
//   const handleVoucherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedVoucher(e.target.value);
//     setSelectedEntry(null); // Reset entry selection
//   };

//   // Entry Selection
//   const handleEntryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const entry = e.target.value;
//     setSelectedEntry(entry);

//     if (selectedVoucher === "debit") {
//       if (entry === "general") navigate("/debit/general");
//       if (entry === "product") navigate("/debit/product");
//     } else if (selectedVoucher === "credit") {
//       if (entry === "general") navigate("/credit/general");
//       if (entry === "product") navigate("/credit/product");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-md mx-auto ">
//       <h2 className="text-xl font-bold mb-8">
//         <DashboardOutlined /> Dashboard
//       </h2>
//       {/* Dropdowns main div  */}
//       <div className="md:flex items-center md:space-y-0 space-y-4 md:space-x-4 w-full md:w-[50%]">
//         {/* Voucher Dropdown */}
//         {/* <select
//           onChange={handleVoucherChange}
//           className="w-full border p-2 rounded-md bg-blue-400 border-black text-white font-bold "
//         >
//           <option value="">Select Voucher</option>
//           <option value="debit">$ Debit Voucher</option>
//           <option value="credit">$ Credit Voucher</option>
//         </select> */}
//         <HoverDropdown label="$ Debit Voucher " items={items} />

//         {/* Entry Dropdown */}
//         <select
//           onChange={handleEntryChange}
//           className="w-full border p-2 rounded-md  bg-blue-400 border-black text-white font-bold"
//           disabled={!selectedVoucher}
//         >
//           <option value="">Select Entry</option>
//           <option value="general">
//             {selectedVoucher === "debit"
//               ? "Debit General Entry"
//               : "Credit General Entry"}
//           </option>
//           <option value="product">
//             {selectedVoucher === "debit"
//               ? "Debit Product Entry"
//               : "Credit Product Entry"}
//           </option>
//         </select>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { Dropdown, MenuProps, Button, Space } from "antd";
import { DashboardOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Debit Dropdown Menu
  const debitMenu: MenuProps = {
    items: [
      {
        key: "1",
        label: "General Entry",
        onClick: () => navigate("/debit/general"),
      },
      {
        key: "2",
        label: "Product Entry",
        onClick: () => navigate("/debit/product"),
      },
    ],
  };

  // Credit Dropdown Menu
  const creditMenu: MenuProps = {
    items: [
      {
        key: "1",
        label: "General Entry",
        onClick: () => navigate("/credit/general"),
      },
      {
        key: "2",
        label: "Product Entry",
        onClick: () => navigate("/credit/product"),
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-md max-w-lg">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <DashboardOutlined /> Dashboard
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {/* Debit Voucher Dropdown */}
        <Dropdown menu={debitMenu} trigger={["hover"]}>
          <Button className="w-full md:w-auto bg-blue-500 text-white font-semibold hover:bg-blue-600">
            $ Debit Voucher <DownOutlined />
          </Button>
        </Dropdown>

        {/* Credit Voucher Dropdown */}
        <Dropdown menu={creditMenu} trigger={["hover"]}>
          <Button className="w-full md:w-auto bg-green-500 text-white font-semibold hover:bg-green-600">
            $ Credit Voucher <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Dashboard;
