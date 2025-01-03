import React from "react";
import { useLocation } from "react-router-dom";

const FilteredPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get("from");
  const to = queryParams.get("to");

  return (
    <div>
      <h2>Filtered Data</h2>
      <p>From: {from}</p>
      <p>To: {to}</p>
    </div>
  );
};

export default FilteredPage;
