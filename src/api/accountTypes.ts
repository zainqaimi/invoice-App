import axios from "axios";
// json-server --watch db.json --port 5000
const API_URL = "http://localhost:5000/accountTypes";

export const fetchaccountTypes = async (params: { searchTerm: string; sortColumn: string | undefined; sortOrder: "asc" | "desc" | undefined }) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching accountTypes", error);
    throw new Error("Failed to fetch accountTypes");
  }
};

// Add accountTypes
export const addaccountTypes = async (accountTypes: any) => {
  const response = await axios.post(API_URL, accountTypes);
  return response.data;
};

// Update accountTypes
export const updateaccountTypes = async (accountTypes: any) => {
  const response = await axios.put(`${API_URL}/${accountTypes.id}`, accountTypes);
  return response.data;
};

// Delete accountTypes
export const deleteaccountTypes = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
