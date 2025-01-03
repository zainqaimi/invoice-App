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
          className="bg-[#00a8ec] text-white hover:bg-[#2b84a7]"
        >
          Confirm
        </Button>,
      ]}
      width={400}
      className="rounded-lg text-left gap-3"
    >
      <div className="text-left text-gray-600">{message}</div>
    </Modal>
  );
};

export default ConfirmationBox;
