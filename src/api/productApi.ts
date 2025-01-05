// src/api/productApi.ts
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

// Fetch products
const fetchProducts = async () => {
  const response = await axios.get("http://localhost:3000/products");
  return response.data || []; // Default empty array if no data
};

// Add product
const addProduct = async (product: any) => {
  const response = await axios.post("http://localhost:3000/products", product);
  return response.data;
};

// Update product
const updateProduct = async (product: any) => {
  const response = await axios.put(`http://localhost:3000/products/${product.id}`, product);
  return response.data;
};

// Delete product
const deleteProduct = async (id: string) => {
  const response = await axios.delete(`http://localhost:3000/products/${id}`);
  return response.data;
};

export const useProducts = () => {
  return useQuery("products", fetchProducts, {
    // Optional: Handle the error case
    onError: (error) => {
      console.error("Error fetching products:", error);
    },
    // Optional: Fallback to an empty array if there's no data
    select: (data) => data || [],
  });
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};
