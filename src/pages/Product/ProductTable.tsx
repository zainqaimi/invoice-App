// import React from "react";
// import Product from "./Product";

// const ProductTable = ({ products }) => {
//   return (
//     <table className="w-full  border">
//       <thead>
//         <tr>
//           <th>Product Name</th>
//           <th>Packing Type</th>
//           <th>Retail Price</th>
//           <th>Weight Type</th>
//           <th>is Active</th>
//         </tr>
//       </thead>
//       <tbody>
//         {products.map((product: Product, index: number) => (
//           <tr key={index} className="text-center py-4 border border-blue-300">
//             <td>{product.name}</td>
//             <td>{product.packing}</td>
//             <td>{product.price}</td>
//             <td>{product.weight}</td>
//             <td>{product.isActive ? "Active" : "Inactive"}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ProductTable;

import React from "react";

interface Product {
  id: string;
  name: string;
  packing: string;
  price: number;
  weight: string;
  isActive: boolean;
}

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border text-center">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Packing Type</th>
          <th>Retail Price</th>
          <th>Weight Type</th>
          <th>is Active</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.packing}</td>
            <td>{product.price}</td>
            <td>{product.weight}</td>
            <td>{product.isActive ? "Active" : "Inactive"}</td>
            <td>
              <button
                onClick={() => onEdit(product)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
