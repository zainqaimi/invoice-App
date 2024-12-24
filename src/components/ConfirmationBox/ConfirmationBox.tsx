import React from "react";
import { Modal, Button } from "antd";

interface ConfirmationBoxProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationBox: React.FC<ConfirmationBoxProps> = ({
  open,
  onCancel,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          key="cancel"
          onClick={onCancel}
          className="bg-gray-500 text-white"
        >
          Cancel
        </Button>,
        <Button
          key="confirm"
          onClick={onConfirm}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Confirm
        </Button>,
      ]}
      className="rounded-lg shadow-lg"
    >
      <div className="text-center text-gray-700">{message}</div>
    </Modal>
  );
};

export default ConfirmationBox;
