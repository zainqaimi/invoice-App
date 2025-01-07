import axios from "axios";
// json-server --watch db.json --port 5000
const API_URL = "http://localhost:5000/accounts";

export const fetchaccounts = async (params: { searchTerm: string; sortColumn: string | undefined; sortOrder: "asc" | "desc" | undefined }) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts", error);
    throw new Error("Failed to fetch accounts");
  }
};

// Add accounts
export const addaccounts = async (accounts: any) => {
  const response = await axios.post(API_URL, accounts);
  return response.data;
};

// Update accounts
export const updateaccounts = async (accounts: any) => {
  const response = await axios.put(`${API_URL}/${accounts.id}`, accounts);
  return response.data;
};

// Delete accounts
export const deleteaccounts = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
