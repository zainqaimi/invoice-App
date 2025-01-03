// import React from 'react'

// const SalesOfficer = () => {
//   return (
//     <div>SalesOfficer</div>
//   )
// }

// export default SalesOfficer

import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Spin,
  message,
  Select,
  Space,
  Popconfirm,
  Switch,
} from "antd";
import {
  EditOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";

const { Search } = Input;
const { Option } = Select;

interface Discount {
  key: number;
  discountType: string;
  isActive: boolean;
}

const SalesOfficer: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const [data, setData] = useState<Discount[]>([
    { key: 1, discountType: "12%", isActive: true },
    { key: 2, discountType: "15%", isActive: false },
    { key: 3, discountType: "18%", isActive: true },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const [sortColumn, setSortColumn] = useState<string | null>(null);

  const navigate = useNavigate();

  // 🟦 Modal Handlers
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingKey(null);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();

      if (editingKey !== null) {
        // Edit existing discount
        setData((prevData) =>
          prevData.map((item) =>
            item.key === editingKey ? { ...item, ...values } : item
          )
        );
        message.success("Discount updated successfully!");
      } else {
        // Add new discount
        setData((prevData) => [
          ...prevData,
          { ...values, key: prevData.length + 1 },
        ]);
        message.success("Discount added successfully!");
      }

      setIsLoading(false);
      form.resetFields();
      setIsModalOpen(false);
      setEditingKey(null);
    } catch (error) {
      setIsLoading(false);
      message.error("Failed to save Discount!");
    }
  };

  const handleEdit = (record: Discount) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = (key: number) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
    message.success("Discount deleted successfully!");
  };

  // 🟦 Sorting Handler
  const handleSort = (column: string) => {
    const newOrder =
      sortColumn === column && sortOrder === "ascend" ? "descend" : "ascend";
    setSortColumn(column);
    setSortOrder(newOrder);

    const sortedData = [...data].sort((a, b) => {
      if (newOrder === "ascend") {
        return a[column as keyof Discount] > b[column as keyof Discount]
          ? 1
          : -1;
      } else {
        return a[column as keyof Discount] < b[column as keyof Discount]
          ? 1
          : -1;
      }
    });

    setData(sortedData);
  };

  // 🟦 Search Filter
  const filteredData = data.filter((item) =>
    item.discountType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: (
        <div
          onClick={() => handleSort("discountType")}
          className="flex items-center justify-between cursor-pointer"
        >
          Discount Type
          {sortColumn === "discountType" ? (
            sortOrder === "ascend" ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          ) : (
            <SortAscendingOutlined />
          )}
        </div>
      ),
      dataIndex: "discountType",
      key: "discountType",
    },
    {
      title: (
        <div
          onClick={() => handleSort("isActive")}
          className="flex items-center justify-between cursor-pointer"
        >
          Is Active
          {sortColumn === "isActive" ? (
            sortOrder === "ascend" ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          ) : (
            <SortAscendingOutlined />
          )}
        </div>
      ),
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive: boolean) => (
        <span
          className={`px-2 py-1 rounded-md text-white ${
            isActive ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Discount) => (
        <Space>
          <RiEditLine
            color="#00a8ec"
            size={18}
            onClick={() => handleEdit(record)}
            className="cursor-pointer hover:scale-125"
          />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.key)}
          >
            <FaTrash
              color="red"
              size={16}
              className="cursor-pointer hover:scale-125"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-gray-50 shadow-sm min-h-screen">
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
      <div className="md:flex md:space-y-0 space-y-4 justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sales Officer's</h2>
        <div className="md:flex md:space-y-0 space-y-4 items-center gap-2">
          <Search
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-60 shadow-md bg-white rounded-md"
          />
          <button
            type="button"
            onClick={showModal}
            className="flex items-center space-x-2 py-2 px-5 rounded-md shadow-md text-white bg-[#00a8ec] hover:bg-[#00a1ec] hover:shadow-none"
          >
            <FaPlus /> <span>Add Sales Officer</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto  p-4 bg-white rounded-md shadow-md">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          pagination={{
            pageSize: 5,
            showTotal: (total) => `Total ${total} items`,
          }}
        />
      </div>
      {/* Modal */}
      <Modal
        title={
          <span className="text-xl font-semibold mb-8">
            {editingKey !== null ? "Edit Discount" : "Add Discount"}
          </span>
        }
        className="font-semibold text-lg "
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button
            key="back"
            onClick={handleCancel}
            className=" px-6 py-5 text-[16px] hover:shadow-none shadow-md"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="default"
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#00a8ec] px-8 py-5 text-white text-[16px] hover:shadow-none shadow-md"
          >
            {isLoading ? <Spin /> : "Save"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="discountType" label="Discount Type" rules={[{ required: true }]}>
            <Input placeholder="Enter Discount" />
          </Form.Item>
          <Form.Item name="isActive" label="Is Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SalesOfficer;
