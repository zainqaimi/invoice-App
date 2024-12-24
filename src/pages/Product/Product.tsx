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

const { Search } = Input;
const { Option } = Select;

interface Product {
  key: number;
  accountName: string;
  businessName: string;
  contactNo: string;
  city: string;
  tso: string;
  discount: string;
  accountType: string;
  isActive: string;
}

const Product: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState<number | null>(null);

  // Table Columns
  const columns = [
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Business Name", dataIndex: "businessName", key: "businessName" },
    { title: "Contact No", dataIndex: "contactNo", key: "contactNo" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "TSO", dataIndex: "tso", key: "tso" },
    { title: "Discount Applicable", dataIndex: "discount", key: "discount" },
    { title: "Product Type", dataIndex: "ProductType", key: "ProductType" },
    { title: "IsActive", dataIndex: "isActive", key: "isActive" },
    {
      title: "Actions",
      key: "actions",
      render: (record: Product) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this account?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Open Modal
  const showModal = () => setIsModalOpen(true);

  // Close Modal
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingKey(null);
  };

  // Handle Save
  const handleSave = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();

      if (editingKey !== null) {
        setData(
          data.map((item) =>
            item.key === editingKey ? { ...item, ...values } : item
          )
        );
        message.success("Product updated successfully!");
      } else {
        setData([...data, { ...values, key: data.length + 1 }]);
        message.success("Product added successfully!");
      }

      setIsLoading(false);
      form.resetFields();
      setIsModalOpen(false);
      setEditingKey(null);
    } catch (error) {
      setIsLoading(false);
      message.error("Failed to save product!");
    }
  };

  // backend me api methods handle save example
  // const handleSave = async () => {
  //   try {
  //     setIsLoading(true);
  //     const values = await form.validateFields();

  //     // Example API Call
  //     await fetch('https://api.example.com/accounts', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(values),
  //     });

  //     setData([...data, { ...values, key: data.length + 1 }]);
  //     message.success('Account saved successfully!');
  //   } catch (error) {
  //     message.error('Failed to save account!');
  //   } finally {
  //     setIsLoading(false);
  //     setIsModalOpen(false);
  //     form.resetFields();
  //   }
  // };

  // Handle Edit
  const handleEdit = (record: Product) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = (key: number) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Product deleted successfully!");
  };

  // Search Filter
  const filteredData = data.filter(
    (item) =>
      item.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Product</h2>

      {/* Search Input */}
      <Search
        placeholder="Search record"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {/* Add Account Button */}
      <Button type="primary" onClick={showModal} className="mb-4">
        + Add Product
      </Button>

      {/* Table */}
      <Table
        className="text-center"
        columns={[
          {
            title: "Product Name",
            dataIndex: "productName",
            key: "productName",
            className: "font-semibold text-blue-600",
          },
          {
            title: "Business Name",
            dataIndex: "businessName",
            key: "businessName",
            className: "text-gray-600",
          },
          {
            title: "Contact No",
            dataIndex: "contactNo",
            key: "contactNo",
            className: "text-green-600",
          },

          {
            title: "City",
            dataIndex: "city",
            key: "city",
            className: "text-indigo-600",
          },

          {
            title: "TSO",
            dataIndex: "tso",
            key: "tso",
            className: "text-purple-600",
          },
          {
            title: "Discount Applicable",
            dataIndex: "discount",
            key: "discount",
            className: "text-pink-600",
          },
          {
            title: "Account Type",
            dataIndex: "accountType",
            key: "accountType",
            className: "text-teal-600",
          },
          {
            title: "IsActive",
            dataIndex: "isActive",
            key: "isActive",
            render: (isActive) => (
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
            render: (record: Product) => (
              <Space className="flex flex-col ">
                <Button
                  type="link"
                  className="text-yellow-500"
                  onClick={() => handleEdit(record)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => handleDelete(record.key)}
                >
                  <Button type="link" danger className="text-red-500">
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        dataSource={data}
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-gray-100" : "bg-white"
        } // Alternate row styling
        rowKey="key"
      />
      {/* Modal Form */}
      <Modal
        title={editingKey !== null ? "Edit Product" : "Add Product"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? <Spin /> : "Save"}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Product Name" />
          </Form.Item>
          <Form.Item
            name="businessName"
            label="Business Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Business Name" />
          </Form.Item>
          <Form.Item
            name="contactNo"
            label="Contact No"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Contact No" />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input placeholder="Enter City" />
          </Form.Item>
          <Form.Item name="tso" label="TSO">
            <Input placeholder="Enter TSO" />
          </Form.Item>
          <Form.Item name="discount" label="Discount Applicable">
            <Input placeholder="Enter Discount" />
          </Form.Item>
          <Form.Item name="accountType" label="Account Type">
            <Select showSearch placeholder="Select Account Type">
              <Option value="Savings">Savings</Option>
              <Option value="Current">Current</Option>
              <Option value="Business">Business</Option>
            </Select>
          </Form.Item>
          {/* <Form.Item name="isActive" label="IsActive">
            <Select placeholder="Select Status">
              <Option value="Yes">Active</Option>
              <Option value="No">Inactive</Option>
            </Select>
          </Form.Item> */}
          <Form.Item name="isActive" label="Is Active" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
