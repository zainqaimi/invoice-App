import { useState } from "react";
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
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { FaPlus, FaTrash } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../api/productApi";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

interface Product {
  id: number;
  productName: string;
  weightType: string;
  packingType: string;
  retailPrice: number;
  isActive: boolean;
}

const Product: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: products = [], isLoading: isFetching } = useQuery(
    ["products", searchTerm, sortColumn, sortOrder],
    () => fetchProducts({ searchTerm, sortColumn, sortOrder })
  );

  // Modal Handlers
  const showModal = () => setIsModalOpen(true);
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
        await updateProduct({ id: editingKey, ...values });
        message.success("Product updated successfully!");
      } else {
        await addProduct(values);
        message.success("Product added successfully!");
      }
      setIsLoading(false);
      setIsModalOpen(false);
      setEditingKey(null);
      form.resetFields();

      queryClient.invalidateQueries("products");
    } catch (error) {
      setIsLoading(false);
      message.error("Failed to save product!");
    }
  };

  const handleEdit = (record: Product) => {
    setEditingKey(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    message.success("Product deleted successfully!");
    queryClient.invalidateQueries("products");
  };

  // Sorting Handler
  const handleSort = (column: string) => {
    const newOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);
    queryClient.invalidateQueries("products");
  };

  const columns = [
    {
      title: (
        <div
          onClick={() => handleSort("productName")}
          className="flex items-center justify-between cursor-pointer"
        >
          Product Name
          {sortColumn === "productName" && sortOrder === "asc" ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )}
        </div>
      ),
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: (
        <div
          onClick={() => handleSort("weightType")}
          className="flex items-center justify-between cursor-pointer"
        >
          Weight Type
          {sortColumn === "weightType" && sortOrder === "asc" ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )}
        </div>
      ),
      dataIndex: "weightType",
      key: "weightType",
    },
    {
      title: (
        <div
          onClick={() => handleSort("weightQuantity")}
          className="flex items-center justify-between cursor-pointer"
        >
          Weight Quantity
          {sortColumn === "weightQuantity" ? (
            sortOrder === "asc" ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          ) : (
            <SortDescendingOutlined />
          )}
        </div>
      ),
      dataIndex: "weightQuantity",
      key: "weightQuantity",
    },
    {
      title: (
        <div
          onClick={() => handleSort("packingType")}
          className="flex items-center justify-between cursor-pointer"
        >
          Packing Type
          {sortColumn === "packingType" && sortOrder === "asc" ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )}
        </div>
      ),
      dataIndex: "packingType",
      key: "packingType",
    },
    {
      title: (
        <div
          onClick={() => handleSort("retailPrice")}
          className="flex items-center justify-between cursor-pointer"
        >
          Retail Price
          {sortColumn === "retailPrice" && sortOrder === "asc" ? (
            <SortAscendingOutlined />
          ) : (
            <SortDescendingOutlined />
          )}
        </div>
      ),
      dataIndex: "retailPrice",
      key: "retailPrice",
    },
    {
      title: "Is Active",
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
      render: (record: Product) => (
        <Space>
          <span onClick={() => handleEdit(record)}>
            <RiEditLine color="#00a8ec" size={18} className="hover:scale-125" />
          </span>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
          >
            <span>
              <FaTrash color="red" size={16} className="hover:scale-125" />
            </span>
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
        <h2 className="text-2xl font-bold">Product</h2>
        <div className="md:flex md:space-y-0 space-y-4 items-center gap-2">
          <Search
            placeholder="Search product"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="md:w-60 shadow-md bg-white rounded-md"
          />
          <button
            type="button"
            onClick={showModal}
            className="flex items-center space-x-2 py-2 px-5 rounded-md shadow-md text-white bg-[#00a8ec] hover:bg-[#00a1ec] hover:shadow-none"
          >
            <FaPlus /> <span>Add Product</span>
          </button>
        </div>
      </div>
      <div className="overflow-auto  p-4 bg-white rounded-md shadow-md">
        <Table
          columns={columns}
          dataSource={products}
          loading={isFetching}
          rowKey="key"
          pagination={{
            pageSize: 5,
            showTotal: (total) => `Total ${total} items`,
          }}
          className="text-center items-center"
        />
      </div>
      {/* Modal */}
      <Modal
        title={editingKey !== null ? "Edit Product" : "Add Product"}
        className="font-semibold text-lg"
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
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Product Name" className="shadow-md p-2" />
          </Form.Item>

          <Form.Item
            name="weightType"
            label="Weight Type"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Product Weight"
              className="shadow-md rounded-md h-10"
            >
              <Option value="10kg">10 kg</Option>
              <Option value="12 litter">12 litter</Option>
              <Option value="15 gram">15 gram</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="weightQuantity"
            label="Weight Quantity"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter  Weight quantity "
              className="shadow-md p-2"
            />
          </Form.Item>
          <Form.Item
            name="packingType"
            label="Type of Packing"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select Packing Type"
              className="shadow-md rounded-md h-10"
            >
              <Option value="Savings">Savings</Option>
              <Option value="Current">Current</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="retailPrice"
            label=" Retail Price"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Enter Retail Price "
              className="shadow-md p-2"
            />
          </Form.Item>
          <Form.Item name="isActive" label="Is Active" valuePropName="checked">
            <Switch className="shadow-md" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Product;
