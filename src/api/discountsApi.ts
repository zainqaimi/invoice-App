import axios from "axios";
// json-server --watch db.json --port 5000
const API_URL = "http://localhost:5000/discounts";

export const fetchdiscounts = async (params: { searchTerm: string; sortColumn: string | undefined; sortOrder: "asc" | "desc" | undefined }) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching discounts", error);
    throw new Error("Failed to fetch discounts");
  }
};

// Add discounts
export const adddiscounts = async (discounts: any) => {
  const response = await axios.post(API_URL, discounts);
  return response.data;
};

// Update discounts
export const updatediscounts = async (discounts: any) => {
  const response = await axios.put(`${API_URL}/${discounts.id}`, discounts);
  return response.data;
};

// Delete discounts
export const deletediscounts = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
