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
  fetchdiscounts,
  adddiscounts,
  updatediscounts,
  deletediscounts,
} from "../api/discountsApi";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

interface discounts {
  id: number;
  discounts: string;
  isActive: boolean;
}

const Discount: React.FC = () => {
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
  const { data: discounts = [], isLoading: isFetching } = useQuery(
    ["discounts", searchTerm, sortColumn, sortOrder],
    () => fetchdiscounts({ searchTerm, sortColumn, sortOrder })
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
      
      if (values.discounts && !values.discounts.includes('%')) {
        values.discounts = `${values.discounts}%`;
      }
  
      if (editingKey !== null) {
        await updatediscounts({ id: editingKey, ...values });
        message.success("Discount updated successfully!");
      } else {
        await adddiscounts(values);
        message.success("Discount added successfully!");
      }
      setIsLoading(false);
      setIsModalOpen(false);
      setEditingKey(null);
      form.resetFields();
  
      queryClient.invalidateQueries("discounts");
    } catch (error) {
      setIsLoading(false);
      message.error("Failed to save discount!");
    }
  };
  
  const handleEdit = (record: discounts) => {
    setEditingKey(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deletediscounts(id);
    message.success("discounts deleted successfully!");
    queryClient.invalidateQueries("discounts");
  };

  // Sorting Handler
  const handleSort = (column: string) => {
    const newOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);
    queryClient.invalidateQueries("discounts");
  };


  const columns = [
    {
      title: (
        <div
          onClick={() => handleSort("discounts")}
          className="flex items-center justify-between cursor-pointer"
        >
          Discount
          {sortColumn === "discounts" ? (
            sortOrder === "asc" ? (
              <SortAscendingOutlined />
            ) : (
              <SortDescendingOutlined />
            )
          ) : (
            <SortAscendingOutlined />
          )}
        </div>
      ),
      dataIndex: "discounts",
      key: "discounts",
    },
    {
      title: (
        <div
          onClick={() => handleSort("isActive")}
          className="flex items-center justify-between cursor-pointer"
        >
          Is Active
          {sortColumn === "isActive" ? (
            sortOrder === "asc" ? (
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
      render: (record: discounts) => (
        <Space>
          <RiEditLine
            color="#00a8ec"
            size={18}
            onClick={() => handleEdit(record)}
            className="cursor-pointer hover:scale-125"
          />
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.id)}
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
        <h2 className="text-2xl font-bold">Discount's</h2>
        <div className="md:flex md:space-y-0 space-y-4 items-center gap-2">
          <Search
            placeholder="Search discounts"
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
            <FaPlus /> <span>Add Discount</span>
          </button>
        </div>
      </div>
      <div className="overflow-auto  p-4 bg-white rounded-md shadow-md">
        <Table
          columns={columns}
          dataSource={discounts}
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
        <Form form={form} layout="vertical" onSubmitCapture={handleSave}>
          <Form.Item name="discounts" label="Discount" rules={[{ required: true }]}>
            <Input placeholder="Enter discount" className="p-2" />
          </Form.Item>
          <Form.Item name="isActive" label="Is Active" valuePropName="checked">
            <Switch  className="shadow-md"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Discount;
