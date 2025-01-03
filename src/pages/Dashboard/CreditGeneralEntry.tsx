import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import SearchableDropdown from "../../components/Buttons/DropdownMenu/SearchableDropdown";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { DatePicker, Input, Switch } from "antd";
import { IoMdArrowRoundBack } from "react-icons/io";
const productOptions = [
  "Apple iPhone 14",
  "Samsung Galaxy S22",
  "Dell Laptop",
  "HP Laptop",
  "Sony Headphones",
  "Apple MacBook Air",
  "Logitech Mouse",
];
const CreditGeneralEntry: React.FC = () => {
    const [paymentMode, setPaymentMode] = useState("Cash");
  const navigate = useNavigate();
  const handleProductSelect = (value: string) => {
    console.log("Selected Product:", value);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="md:p-6 p-4 bg-white rounded-md shadow-md mx-auto">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-[#3bb0df] hover:text-[#40a6ce]"
        >
          <IoMdArrowRoundBack size={16} />
          <span>Back</span>
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">General Entry</h2>
      <hr className="border-[#1f6e8d] mb-4" />
      <div className="">
      <div className="">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2">
          <SearchableDropdown
            label="Account Title:"
            placeholder="Search for a product..."
            options={productOptions}
            onSelect={handleProductSelect}
            className="w-full p-2 rounded-md focus:outline-none focus:border-b-[#3bb0df] border bg-white shadow-md "
          />
        </div>
        <div>
          <label className="block font-medium">Amount:</label>
          <input type="text" className="w-full border p-2 rounded-md bg-white shadow-md" />
        </div>
      </div>
      </div>
<div className="">
      {/* Voucher No & Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
        <div className="md:col-span-2 ">
          <label className="block font-medium">Voucher No:</label>
          <input type="text" className="w-full border p-2 rounded-md bg-white shadow-md" />
        </div>
        <div>
          <label className="block font-medium">Date:</label>
      <DatePicker className="w-full shadow-md bg-white p-2" />

        </div>
      </div>

      {/* Invoice, Demand Form, Gate Pass, Cash Book */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block font-medium">Invoice No:</label>
          <input type="text" className="w-full border p-2 rounded-md bg-white shadow-md" />
        </div>
        <div>
          <label className="block font-medium">Demand Form:</label>
          <input type="text" className="w-full border p-2 rounded-md bg-white shadow-md" />
        </div>
        <div>
          <label className="block font-medium">Gate Pass No:</label>
          <input type="text" className="w-full border p-2 rounded-md bg-white shadow-md" />
        </div>
        <div>
          <label className="block font-medium">Cash Book No:</label>
          <input type="text" className="w-full border p-2 rounded-md bg-white shadow-md" />
        </div>
      </div>
      </div>
      {/* Description & Amount Rows */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-1 ">
          <h1 className="md:col-span-2 font-semibold text-md">Description</h1>
          <h1 className="font-semibold text-md">Amount</h1>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        
        {[...Array(6)].map((_, index) => (
          <React.Fragment key={index}>
            <textarea
              placeholder="Description"
              className="w-full border md:col-span-2 p-2 rounded-md bg-white shadow-md"
            />
            <input
              type="text"
              placeholder="Amount"
              className="w-full border p-2 rounded-md bg-white shadow-md"
            />
          </React.Fragment>
        ))}
      </div>

      {/* Total Amount */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-y-0 space-y-1 mt-4 rounded-md">
        <h3 className="text-lg font-semibold">Total Amount:</h3>
        <input
          type="text"
          placeholder="Total Amount"
          className="w-full md:w-[32.5%] border p-3 rounded-md bg-white shadow-md"
        />
      </div>
      {/* </div> */}
         {/* Payment Options Bank/Cash Switch */}
         <div className="flex items-center gap-4 my-4">
        <span className="text-md font-semibold">Payment Mode:</span>
        <Switch
          checkedChildren="Bank"
          unCheckedChildren="Cash"
          onChange={(checked) => setPaymentMode(checked ? "Bank" : "Cash")}
        />
      </div>

      {/* Conditional Inputs */}
      {paymentMode === "Bank" && (
        <>
        <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-2 lg:gap-4 mb-4">
          <Input placeholder="Bank Name" className="shadow-md p-2 bg-white" />
          <DatePicker className="w-full shadow-md bg-white p-2" />
          <Input placeholder="Account Number " className="shadow-md p-2 bg-white" />
        </div>
              {/* Cheque Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <Input placeholder="Cheque Number" className="shadow-md p-2 bg-white"/>
      <DatePicker className="w-full shadow-md bg-white p-2" placeholder="Date" />
    </div>
    </>
      )}




      {/* Submit Button */}
      <div className="mt-8 text-right">
        <button className="bg-[#3bb0df] hover:bg-[#2a81a3] shadow-md hover:shadow-none text-white px-6 py-2 md:w-52 rounded-md">
          Submit
        </button>
      </div>
      </div>
    </div>
  );
};

export default CreditGeneralEntry;
