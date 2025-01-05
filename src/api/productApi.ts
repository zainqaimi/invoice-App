import axios from "axios";
// json-server --watch db.json --port 5000
const API_URL = "http://localhost:5000/products";

export const fetchProducts = async (params: { searchTerm: string; sortColumn: string | undefined; sortOrder: "asc" | "desc" | undefined }) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw new Error("Failed to fetch products");
  }
};

// Add Product
export const addProduct = async (product: any) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

// Update Product
export const updateProduct = async (product: any) => {
  const response = await axios.put(`${API_URL}/${product.id}`, product);
  return response.data;
};

// Delete Product
export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
