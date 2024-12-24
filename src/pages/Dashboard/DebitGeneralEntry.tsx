// import React from "react";

// const GeneralEntryForm: React.FC = () => {
//   return (
//     <div className="p-6 bg-white rounded-md shadow-md  mx-auto">
//       <h2 className="text-xl font-bold mb-4">General Entry</h2>
//       <hr className="border-blue-500 mb-4" />

//       {/* Account Title & Amount */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block font-medium">Account Title:</label>
//           <select className="w-full border p-2 rounded-md">
//             <option>Select Account Title</option>
//           </select>
//         </div>
//         <div>
//           <label className="block font-medium">Amount:</label>
//           <input type="text" className="w-full border p-2 rounded-md" />
//         </div>
//       </div>

//       {/* Voucher No & Date */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <div>
//           <label className="block font-medium">Voucher No:</label>
//           <input type="text" className="w-full border p-2 rounded-md" />
//         </div>
//         <div>
//           <label className="block font-medium">Date:</label>
//           <input type="date" className="w-full border p-2 rounded-md" />
//         </div>
//       </div>

//       {/* Invoice, Demand Form, Gate Pass, Cash Book */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
//         <div>
//           <label className="block font-medium">Invoice No:</label>
//           <input type="text" className="w-full border p-2 rounded-md" />
//         </div>
//         <div>
//           <label className="block font-medium">Demand Form:</label>
//           <input type="text" className="w-full border p-2 rounded-md" />
//         </div>
//         <div>
//           <label className="block font-medium">Gate Pass No:</label>
//           <input type="text" className="w-full border p-2 rounded-md" />
//         </div>
//         <div>
//           <label className="block font-medium">Cash Book No:</label>
//           <input type="text" className="w-full border p-2 rounded-md" />
//         </div>
//       </div>

//       {/* Description & Amount Rows */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         {[...Array(3)].map((_, index) => (
//           <React.Fragment key={index}>
//             <textarea
//               placeholder="Description"
//               className="w-full border p-2 rounded-md"
//             />
//             <input
//               type="text"
//               placeholder="Amount"
//               className="w-full border p-2 rounded-md"
//             />
//           </React.Fragment>
//         ))}
//       </div>

//       {/* Total Amount */}
//       <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-gray-100 rounded-md">
//         <h3 className="text-lg font-semibold">Total Amount:</h3>
//         <input
//           type="text"
//           placeholder="Total Amount"
//           className="w-full md:w-1/3 border p-2 rounded-md"
//         />
//       </div>

//       {/* Payment Options */}
//       <div className="mt-6">
//         <h3 className="text-lg font-semibold mb-2">Payment Method:</h3>
//         <div className="flex gap-4">
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="cash" />
//             Cash
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="check" />
//             Check
//           </label>
//         </div>
//       </div>

//       {/* Submit Button */}
//       <div className="mt-6 text-center">
//         <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GeneralEntryForm;

import React from "react";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import SearchableDropdown from "../../components/Buttons/DropdownMenu/SearchableDropdown";
const productOptions = [
  "Apple iPhone 14",
  "Samsung Galaxy S22",
  "Dell Laptop",
  "HP Laptop",
  "Sony Headphones",
  "Apple MacBook Air",
  "Logitech Mouse",
];
const DebitGeneralEntry: React.FC = () => {
  const navigate = useNavigate();
  const handleProductSelect = (value: string) => {
    console.log("Selected Product:", value);
  };

  const handleBack = () => {
    navigate(-1); // Previous page par le jaata hai
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md mx-auto">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
        >
          ← Back
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4">General Entry</h2>
      <hr className="border-blue-500 mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <SearchableDropdown
            label="Account Title:"
            placeholder="Search for a product..."
            options={productOptions}
            onSelect={handleProductSelect}
            className="w-full p-2  rounded-md focus:outline-none focus:border-b-blue-500 border "
          />
        </div>
        <div>
          <label className="block font-medium">Amount:</label>
          <input type="text" className="w-full border p-2 rounded-md" />
        </div>
      </div>

      {/* Voucher No & Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium">Voucher No:</label>
          <input type="text" className="w-full border p-2 rounded-md" />
        </div>
        <div>
          <label className="block font-medium">Date:</label>
          <input type="date" className="w-full border p-2 rounded-md" />
        </div>
      </div>

      {/* Invoice, Demand Form, Gate Pass, Cash Book */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block font-medium">Invoice No:</label>
          <input type="text" className="w-full border p-2 rounded-md" />
        </div>
        <div>
          <label className="block font-medium">Demand Form:</label>
          <input type="text" className="w-full border p-2 rounded-md" />
        </div>
        <div>
          <label className="block font-medium">Gate Pass No:</label>
          <input type="text" className="w-full border p-2 rounded-md" />
        </div>
        <div>
          <label className="block font-medium">Cash Book No:</label>
          <input type="text" className="w-full border p-2 rounded-md" />
        </div>
      </div>

      {/* Description & Amount Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[...Array(3)].map((_, index) => (
          <React.Fragment key={index}>
            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Amount"
              className="w-full border p-2 rounded-md"
            />
          </React.Fragment>
        ))}
      </div>

      {/* Total Amount */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-gray-100 rounded-md">
        <h3 className="text-lg font-semibold">Total Amount:</h3>
        <input
          type="text"
          placeholder="Total Amount"
          className="w-full md:w-1/3 border p-2 rounded-md"
        />
      </div>

      {/* Payment Options */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Payment Method:</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="cash" />
            Cash
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="check" />
            Check
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
};

export default DebitGeneralEntry;
