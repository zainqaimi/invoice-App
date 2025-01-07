import axios from "axios";
// json-server --watch db.json --port 5000
const API_URL = "http://localhost:5000/salesOfficer";

export const fetchSalesOfficer = async (params: { searchTerm: string; sortColumn: string | undefined; sortOrder: "asc" | "desc" | undefined }) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching SalesOfficer", error);
    throw new Error("Failed to fetch SalesOfficer");
  }
};

// Add salesOfficer
export const addsalesOfficer = async (salesOfficer: any) => {
  const response = await axios.post(API_URL, salesOfficer);
  return response.data;
};

// Update salesOfficer
export const updatesalesOfficer = async (salesOfficer: any) => {
  const response = await axios.put(`${API_URL}/${salesOfficer.id}`, salesOfficer);
  return response.data;
};

// Delete salesOfficer
export const deletesalesOfficer = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
