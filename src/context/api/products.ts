import axios from 'axios';

const API_URL = 'https://66d992654ad2f6b8ed55375b.mockapi.io/crud'; 

export interface Product {
    id: any;
    name: string;
    packing: string;
    price: number;
    weight: string;
    isActive: boolean; 
  }

// Fetch all products
export const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new product
export const addProduct = async (product: any) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

// Update an existing product
export const updateProduct = async (id: string, product: any) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
