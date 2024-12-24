import React from "react";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  return (
    <>
      <div className="text-center font-bold text-4xl">ForgotPass</div>;
      <Link to={"/Login"}>
        <span className="text-center text-blue-500">login</span>
      </Link>
    </>
  );
};

export default ForgotPass;
