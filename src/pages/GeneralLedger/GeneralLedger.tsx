import React, { useState } from "react";
import { Table, Button, Modal, DatePicker, Form, message, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { IoMdArrowRoundBack } from "react-icons/io";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

// Define the type for each record in the data
interface RecordType {
  key: number;
  businessName: string;
  customerName: string;
  city: string;
}

const { RangePicker } = DatePicker;

const GeneralLedger = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<RecordType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const data: RecordType[] = [
    {
      key: 1,
      businessName: "pir sarwar jeelani",
      customerName: "pir sarwar jeelani",
      city: "chamber",
    },
    { key: 2, businessName: "D,C'Q", customerName: "dc,'", city: "DSD" },
  ];

  // Filter Data on Search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = data.filter(
      (record) =>
        record.businessName.toLowerCase().includes(value.toLowerCase()) ||
        record.customerName.toLowerCase().includes(value.toLowerCase()) ||
        record.city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const columns = [
    { title: "Business Name", dataIndex: "businessName", key: "businessName" },
    { title: "Customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "City", dataIndex: "city", key: "city" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: RecordType) => (
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

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleDateFilterSubmit = (values: any) => {
    const { dateRange } = values;
    if (dateRange && dateRange.length === 2) {
      const fromDate = dayjs(dateRange[0]).format("YYYY-MM-DD");
      const toDate = dayjs(dateRange[1]).format("YYYY-MM-DD");

      message.success(`Filtered from ${fromDate} to ${toDate}`);
      navigate(`/ledger/filtered?from=${fromDate}&to=${toDate}`);
    } else {
      message.error("Please select both From and To dates");
    }
    setIsModalVisible(false);
  };

  return (
    <div className="p-4">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#3bb0df] hover:text-[#40a6ce]"
        >
          <IoMdArrowRoundBack size={16} />
          <span>Back</span>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-4">General Ledger</h2>
        <Search
          placeholder="Search product"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
          className="w-80 shadow-md bg-white rounded-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto p-4 bg-white text-center rounded-md shadow-md">
        <Table
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : data}
          rowKey="key"
          pagination={{
            pageSize: 5,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </div>

      {/* Date Filter Modal */}
      <Modal
        title="Filter by Date"
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
        centered
      >
        <Form layout="vertical" onFinish={handleDateFilterSubmit}>
          <Form.Item
            name="dateRange"
            label="Select Date Range"
            rules={[{ required: true, message: "Please select a date range!" }]}
          >
            <RangePicker className="w-full" />
          </Form.Item>
          <Form.Item>
            <Button
              key="submit"
              type="default"
              htmlType="submit"
              className="bg-[#00a8ec] w-full px-8 py-5 text-white text-[16px] hover:shadow-none shadow-md"
            >
              {isLoading ? <Spin /> : "Apply Filter"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GeneralLedger;
