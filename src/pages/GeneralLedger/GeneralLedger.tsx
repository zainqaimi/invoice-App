import React, { useState } from "react";
import { Table, Button, Modal } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import DateFilterModal from "./DateFilterModal";

// Define the type for each record in the data
interface RecordType {
  key: number;
  businessName: string;
  customerName: string;
  city: string;
}

const GeneralLedger = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null);
  const [filteredData, setFilteredData] = useState<RecordType[]>([]); // Define type here

  const data: RecordType[] = [
    {
      key: 1,
      businessName: "pir sarwar jeelani",
      customerName: "pir sarwar jeelani",
      city: "chamber",
    },
    { key: 2, businessName: "D,C'Q", customerName: "dc,'", city: "DSD" },
  ];

  const columns = [
    { title: "Business Name", dataIndex: "businessName", key: "businessName" },
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "City", dataIndex: "city", key: "city" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedRecord(record);
            setIsModalVisible(true);
          }}
        />
      ),
    },
  ];

  const handleDateFilter = (fromDate, toDate) => {
    console.log("From:", fromDate, "To:", toDate);

    const filtered = data.filter((item) => {
      return true;
    });
    setFilteredData(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">General Ledger</h2>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : data}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </div>
      <DateFilterModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onFilter={handleDateFilter}
        record={selectedRecord}
      />
    </div>
  );
};

export default GeneralLedger;
