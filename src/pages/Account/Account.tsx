// import React from "react";
// import SearchableDropdown from "../../components/Buttons/DropdownMenu/SearchableDropdown";

// const productOptions = [
//   "Apple iPhone 14",
//   "Samsung Galaxy S22",
//   "Dell Laptop",
//   "HP Laptop",
//   "Sony Headphones",
//   "Apple MacBook Air",
//   "Logitech Mouse",
// ];
// const Account = () => {
//   const handleProductSelect = (value: string) => {
//     console.log("Selected Product:", value);
//   };
//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Product Entry Form</h2>

//       {/* Searchable Dropdown */}
//       <SearchableDropdown
//         label="Select Product"
//         placeholder="Search for a product..."
//         options={productOptions}
//         onSelect={handleProductSelect}
//         className="w-full p-2  rounded-md focus:outline-none focus:border-b-blue-500 border border-b-black"
//       />

//       {/* Additional Fields */}
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block text-sm font-medium">Quantity:</label>
//           <input
//             type="number"
//             className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">Price:</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded-md mt-1 focus:outline-none focus:border-blue-500"
//           />
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//         Save
//       </button>
//     </div>
//   );
// };

// export default Account;

// import React, { useState } from "react";
// import { Table, Button, Modal, Form, Input, Spin, message } from "antd";
// interface Account {
//   key: number;
//   accountName: string;
//   businessName: string;
//   contactNo: string;
//   city: string;
//   tso: string;
//   discount: string;
//   accountType: string;
//   isActive: string;
// }

// const Account: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [form] = Form.useForm();
//   const [data, setData] = useState<Account[]>([]);

//   // Table Columns
//   const columns = [
//     { title: "Account Name", dataIndex: "accountName", key: "accountName" },
//     { title: "Business Name", dataIndex: "businessName", key: "businessName" },
//     { title: "Contact No", dataIndex: "contactNo", key: "contactNo" },
//     { title: "City", dataIndex: "city", key: "city" },
//     { title: "TSO", dataIndex: "tso", key: "tso" },
//     { title: "Discount Applicable", dataIndex: "discount", key: "discount" },
//     { title: "Account Type", dataIndex: "accountType", key: "accountType" },
//     { title: "IsActive", dataIndex: "isActive", key: "isActive" },
//   ];

//   // Open Modal
//   const showModal = () => setIsModalOpen(true);

//   // Close Modal
//   const handleCancel = () => {
//     form.resetFields();
//     setIsModalOpen(false);
//   };

//   // Handle Form Submit
//   const handleSave = async () => {
//     try {
//       setIsLoading(true);
//       const values = await form.validateFields();

//       // Simulate API Call
//       setTimeout(() => {
//         setData([...data, { ...values, key: data.length + 1 }]);
//         message.success("Account added successfully!");
//         form.resetFields();
//         setIsLoading(false);
//         setIsModalOpen(false);
//       }, 1500);
//     } catch (error) {
//       setIsLoading(false);
//       message.error("Failed to add account!");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-4">Account</h2>

//       {/* Search Input */}
//       <Input.Search placeholder="Search record" className="mb-4" />

//       {/* Add Account Button */}
//       <Button type="primary" onClick={showModal} className="mb-4">
//         + Add Account
//       </Button>

//       {/* Table */}
//       <Table columns={columns} dataSource={data} rowKey="key" />

//       {/* Modal Form */}
//       <Modal
//         title="Add Account"
//         open={isModalOpen}
//         onOk={handleSave}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}>
//             Cancel
//           </Button>,
//           <Button
//             key="submit"
//             type="primary"
//             onClick={handleSave}
//             disabled={isLoading}
//           >
//             {isLoading ? <Spin /> : "Save"}
//           </Button>,
//         ]}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item
//             name="accountName"
//             label="Account Name"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Enter Account Name" />
//           </Form.Item>
//           <Form.Item
//             name="businessName"
//             label="Business Name"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Enter Business Name" />
//           </Form.Item>
//           <Form.Item
//             name="contactNo"
//             label="Contact No"
//             rules={[{ required: true }]}
//           >
//             <Input placeholder="Enter Contact No" />
//           </Form.Item>
//           <Form.Item name="city" label="City">
//             <Input placeholder="Enter City" />
//           </Form.Item>
//           <Form.Item name="tso" label="TSO">
//             <Input placeholder="Enter TSO" />
//           </Form.Item>
//           <Form.Item name="discount" label="Discount Applicable">
//             <Input placeholder="Enter Discount" />
//           </Form.Item>
//           <Form.Item name="accountType" label="Account Type">
//             <Input placeholder="Enter Account Type" />
//           </Form.Item>
//           <Form.Item name="isActive" label="IsActive">
//             <Input placeholder="Enter Active Status" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default Account;

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

interface Account {
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

const Account: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState<number | null>(null);

  // Table Columns
  const columns = [
    { title: "Account Name", dataIndex: "accountName", key: "accountName" },
    { title: "Business Name", dataIndex: "businessName", key: "businessName" },
    { title: "Contact No", dataIndex: "contactNo", key: "contactNo" },
    { title: "City", dataIndex: "city", key: "city" },
    { title: "TSO", dataIndex: "tso", key: "tso" },
    { title: "Discount Applicable", dataIndex: "discount", key: "discount" },
    { title: "Account Type", dataIndex: "accountType", key: "accountType" },
    { title: "IsActive", dataIndex: "isActive", key: "isActive" },
    {
      title: "Actions",
      key: "actions",
      render: (record: Account) => (
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
        message.success("Account updated successfully!");
      } else {
        setData([...data, { ...values, key: data.length + 1 }]);
        message.success("Account added successfully!");
      }

      setIsLoading(false);
      form.resetFields();
      setIsModalOpen(false);
      setEditingKey(null);
    } catch (error) {
      setIsLoading(false);
      message.error("Failed to save account!");
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
  const handleEdit = (record: Account) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = (key: number) => {
    setData(data.filter((item) => item.key !== key));
    message.success("Account deleted successfully!");
  };

  // Search Filter
  const filteredData = data.filter(
    (item) =>
      item.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Account</h2>

      {/* Search Input */}
      <Search
        placeholder="Search record"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {/* Add Account Button */}
      <Button type="primary" onClick={showModal} className="mb-4">
        + Add Account
      </Button>

      {/* Table */}
      {/* <Table columns={columns} dataSource={filteredData} rowKey="key" /> */}
      <Table
        className="text-center"
        columns={[
          {
            title: "Account Name",
            dataIndex: "accountName",
            key: "accountName",
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
            render: (record: Account) => (
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
        title={editingKey !== null ? "Edit Account" : "Add Account"}
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
            name="accountName"
            label="Account Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Account Name" />
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

export default Account;
