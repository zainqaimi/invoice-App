// import React, { useState } from "react";
// import { Spin } from "antd";
// import { QueryClient, useMutation } from "react-query";
// import axios from "axios";
// const baseUrl = "https://66d992654ad2f6b8ed55375b.mockapi.io/crud";
// const ProductModal = ({ onClose, onAdd }) => {
//   const queryclient = new QueryClient();

//   const [formData, setFormData] = useState({
//     name: "",
//     packing: "",
//     price: "",
//     weight: "",
//     isActive: true,
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   // Add data mutation
//   const addMutation = useMutation({
//     mutationFn: async (newData) => {
//       const res = await axios.post(baseUrl, newData);
//       return res.data;
//     },
//     onSuccess: () => {
//       alert("Data added successfully!");
//       queryclient.invalidateQueries(["stdData"]);
//     },
//     onError: (error: any) => {
//       alert(`Error adding data: ${error.message}`);
//     },
//   });
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       const newProduct = {
//         name: formData.name,
//         packing: formData.packing,
//         price: parseFloat(formData.price) || 0,
//         weight: formData.weight,
//         isActive: formData.isActive,
//       };
//       onAdd(newProduct);
//       setIsLoading(false);
//       onClose(); // Modal band karo
//     }, 1000); // Simulating API delay
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//       <div className="bg-white p-6 rounded w-96">
//         <h2 className="text-xl mb-4">Add Product</h2>
//         {isLoading ? (
//           <div className="flex justify-center items-center">
//             <Spin size="large" />
//           </div>
//         ) : (
//           <>
//             <input
//               name="name"
//               placeholder="Product Name"
//               onChange={handleChange}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <input
//               name="packing"
//               placeholder="Packing Type"
//               onChange={handleChange}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <input
//               name="price"
//               placeholder="Retail Price"
//               onChange={handleChange}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <input
//               name="weight"
//               placeholder="Weight Type"
//               onChange={handleChange}
//               className="border p-2 w-full mb-2 rounded"
//             />
//             <label className="flex items-center mb-2">
//               <input
//                 type="checkbox"
//                 name="isActive"
//                 checked={formData.isActive}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               Active
//             </label>
//             <div className="flex justify-end mt-4">
//               <button
//                 onClick={onClose}
//                 className="mr-2 px-4 py-2 rounded border"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Add
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductModal;

import React, { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
  onAdd: (product: any) => void;
  editingProduct?: any;
}

const ProductModal: React.FC<Props> = ({ onClose, onAdd, editingProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    packing: "",
    price: "",
    weight: "",
    isActive: true,
  });

  useEffect(() => {
    if (editingProduct) setFormData(editingProduct);
  }, [editingProduct]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onAdd(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded">
        <h2 className="text-xl mb-4">
          {editingProduct ? "Edit" : "Add"} Product
        </h2>
        <input name="name" value={formData.name} onChange={handleChange} />
        {/* Other Inputs */}
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default ProductModal;
