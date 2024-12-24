import React from "react";
import { useNavigate } from "react-router-dom";

const CreditGeneralEntry: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <button onClick={() => navigate("/")} className="text-blue-500">
        ← Back
      </button>
      <h2 className="text-xl font-bold">Credit General Entry Form</h2>
    </div>
  );
};

export default CreditGeneralEntry;
