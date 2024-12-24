import React, { useState } from "react";
import { Modal, DatePicker, Button } from "antd";
import { Dayjs } from "dayjs"; // Import Dayjs
const { RangePicker } = DatePicker;

const DateFilterModal = ({ visible, onClose, onFilter, record }) => {
  const [dates, setDates] = useState<Dayjs[]>([]); // Explicitly define state type

  const handleOk = () => {
    if (dates.length === 2) {
      onFilter(dates[0].format("YYYY-MM-DD"), dates[1].format("YYYY-MM-DD"));
      onClose();
    }
  };

  return (
    <Modal
      title={`Filter Data for ${record?.businessName || "Record"}`}
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="filter" type="primary" onClick={handleOk}>
          Apply Filter
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-4">
        <label className="font-medium">Select Date Range:</label>
        <RangePicker onChange={(values) => setDates(values as Dayjs[])} />
      </div>
    </Modal>
  );
};

export default DateFilterModal;
