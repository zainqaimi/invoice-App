import React, { useState } from "react";
import ConfirmationBox from "../components/ConfirmationBox/ConfirmationBox";
import { Button } from "antd";

const Discount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    alert("Action confirmed!");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
        <Button
          type="primary"
          onClick={showModal}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Show Confirmation Box
        </Button>

        <ConfirmationBox
          open={isModalOpen}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title="Are you sure?"
          message="Do you want to proceed with this action?"
        />
      </div>
    </>
  );
};

export default Discount;
