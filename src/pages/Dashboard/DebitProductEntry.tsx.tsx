import React from "react";
import { useState } from "react";
import { Input, Select, DatePicker, Switch, Button } from "antd";

const DebitProductEntry = () => {
  const [paymentMode, setPaymentMode] = useState("Cash");

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Product Entry</h2>

      {/* Account Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select placeholder="Select Account Title" />
        <Input placeholder="Amount" />
      </div>

      {/* Voucher Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Input placeholder="Voucher Number" />
        <DatePicker className="w-full" />
        <Input placeholder="Invoice No." />
      </div>

      {/* Sales Invoice */}
      <h3 className="text-lg font-medium mt-4">Sales Invoice</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input placeholder="Customer Name" />
        <Input placeholder="City Name" />
      </div>

      {/* Table Rows for Items */}
      <div className="mb-4 border rounded p-4 bg-white">
        {/* Add table rows dynamically */}
      </div>

      {/* Bank/Cash Switch */}
      <div className="flex items-center gap-4 mb-4">
        <span>Payment Mode:</span>
        <Switch
          checkedChildren="Bank"
          unCheckedChildren="Cash"
          onChange={(checked) => setPaymentMode(checked ? "Bank" : "Cash")}
        />
      </div>

      {/* Conditional Inputs */}
      {paymentMode === "Bank" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input placeholder="Bank Name" />
          <DatePicker className="w-full" />
          <Input placeholder="Account Number" />
        </div>
      )}

      {/* Cheque Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input placeholder="Cheque Number" />
        <DatePicker className="w-full" />
      </div>

      {/* Submit Button */}
      <Button type="primary" className="mt-4">
        Save
      </Button>
    </div>
  );
};

export default DebitProductEntry;
