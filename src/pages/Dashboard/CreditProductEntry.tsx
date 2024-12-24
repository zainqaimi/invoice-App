import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreditProductEntry = () => {
  const [paymentType, setPaymentType] = useState<"cash" | "check">("cash"); // State for payment type

  const handlePaymentChange = (type: "cash" | "check") => {
    setPaymentType(type);
  };
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <button onClick={() => navigate("/")} className="text-blue-500">
        ← Back
      </button>
      <h2 className="text-xl font-semibold mb-4">Product Entry</h2>

      {/* Account Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Account Title:</label>
          <select className="w-full p-2 border rounded-md mt-1">
            <option>Select Account Title</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">
            {paymentType === "cash" ? "Cash Amount" : "Check Amount"}:
          </label>
          <input type="number" className="w-full p-2 border rounded-md mt-1" />
        </div>
      </div>

      {/* Voucher Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Voucher Number"
          className="w-full p-2 border rounded-md"
        />
        <input type="date" className="w-full p-2 border rounded-md" />
        <input
          type="text"
          placeholder="Invoice No"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Demand Form No"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Gate Pass No"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Cash Book No"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Sales Invoice */}
      <h3 className="text-lg font-semibold mb-2">Sales Invoice</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Customer Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="City Name"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Add Rows Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border mt-4">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Item Name</th>
              <th className="p-2 border">Packing</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">R.P</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">1</td>
              <td className="p-2 border">
                <select className="w-full">
                  <option>Select Item</option>
                </select>
              </td>
              <td className="p-2 border">
                <input type="text" className="w-full p-1 border rounded-md" />
              </td>
              <td className="p-2 border">
                <input type="number" className="w-full p-1 border rounded-md" />
              </td>
              <td className="p-2 border">
                <input type="number" className="w-full p-1 border rounded-md" />
              </td>
              <td className="p-2 border">
                <input type="number" className="w-full p-1 border rounded-md" />
              </td>
              <td className="p-2 border">
                <input type="number" className="w-full p-1 border rounded-md" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment Type Radio Buttons */}
      <div className="flex items-center gap-4 mt-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="cash"
            checked={paymentType === "cash"}
            onChange={() => handlePaymentChange("cash")}
            className="w-4 h-4"
          />
          Cash
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            value="check"
            checked={paymentType === "check"}
            onChange={() => handlePaymentChange("check")}
            className="w-4 h-4"
          />
          Check
        </label>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default CreditProductEntry;
