import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiEditLine } from "react-icons/ri";
import {
  fetchAccounts,
  addAccounts,
  updateAccounts,
  deleteAccounts,
} from "../api/accounts";
import { useQuery, useQueryClient } from "react-query";
import SearchableDropdown from "../components/Buttons/DropdownMenu/SearchableDropdown";
import { fetchdiscounts } from "../api/discountsApi";
import { fetchaccountTypes } from "../api/accountTypes";
import { fetchSalesOfficer } from "../api/salesOffiers";
import { keyframes } from "antd-style";
const { Search } = Input;
const { Option } = Select;

interface Account {
  id: number;
  AccountName: string;
  businessName: string;
  contactNo: string;
  city: string;
  tso: string;
  discount: string;
  accountType: string;
  isActive: boolean;
}

const Accounts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [discount, setDiscount] = useState<string[]>([]);
  const [accountType, setAccountType] = useState<string[]>([]);
  const [tsos, setTsos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [trashModalOpen, setTrashModalOpen] = useState(false);

  // discounts fetching
  const { data: discounts = [] } = useQuery(
    ["discounts", searchTerm, sortColumn, sortOrder],
    () => fetchdiscounts({ searchTerm, sortColumn, sortOrder })
  );
  const discountValues = discounts.map(
    (item: { discounts: string }) => item.discounts
  );
  // account types are fetching
  const { data: accountTypes = [] } = useQuery(
    ["accountTypes", searchTerm, sortColumn, sortOrder],
    () => fetchaccountTypes({ searchTerm, sortColumn, sortOrder })
  );
  const accountTypesValues = accountTypes.map(
    (item: { accountTypes: string }) => item.accountTypes
  );
  // TSo Fetching data
  const { data: SalesOfficer = [] } = useQuery(
    ["SalesOfficer", searchTerm, sortColumn, sortOrder],
    () => fetchSalesOfficer({ searchTerm, sortColumn, sortOrder })
  );
  const SalesOfficerValues = SalesOfficer.map(
    (item: { SalesOfficer: string }) => item.SalesOfficer
  );

  useEffect(() => {
    // Fetching data for the dropdowns (replace with your actual fetch logic)
    const fetchData = async () => {
      setLoading(true);
      try {
        // Sample JSON data for dropdown options
        // const discountData = discountValues;
        const accountTypeData = accountTypesValues;
        const tsoData = SalesOfficerValues;

        // setDiscount(discountData);
        setAccountType(accountTypeData);
        setTsos(tsoData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const queryClient = useQueryClient();
 
  const { data: Accounts = [], isLoading: isFetching } = useQuery(
    ["Accounts", searchTerm, sortColumn, sortOrder],
    () => fetchAccounts({ searchTerm, sortColumn, sortOrder })
  );
  const handleSave = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      const accountData = {
        ...values,
        discount: values.discount || "",
        accountType: values.accountType || "",
        tso: values.tso || "",
      };

      if (editingKey !== null) {
        await updateAccounts({ id: editingKey, ...accountData });
        message.success("Account updated successfully!");
      } else {
        await addAccounts(accountData);
        message.success("Account added successfully!");
      }

      setIsModalOpen(false);
      setEditingKey(null);
      form.resetFields();
      queryClient.invalidateQueries("Accounts");
    } catch (error) {
      message.error("Failed to save Account!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (record: Account) => {
    setEditingKey(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteAccounts(id);
    message.success("Account deleted successfully!");
    queryClient.invalidateQueries("Accounts");
  };

  const showDltModal = () => {
    setTrashModalOpen(true);
  };

  const [data, setData] = useState<Account[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [editingKey, setEditingKey] = useState<number | null>(null);

  // const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  // const [sortColumn, setSortColumn] = useState<string | null>(null);

  // Modal Handlers
  const showModal = () => setIsModalOpen(true);

  // Sorting Handler
  // const handleSort = (column: string) => {
  //   const newOrder =
  //     sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
  //   setSortColumn(column);
  //   setSortOrder(newOrder);

  //   const sortedData = [...data].sort((a, b) => {
  //     if (newOrder === "asc") {
  //       return a[column as keyof Account] > b[column as keyof Account] ? 1 : -1;
  //     } else {
  //       return a[column as keyof Account] < b[column as keyof Account] ? 1 : -1;
  //     }
  //   });

  //   setData(sortedData);
  // };
  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };
  const filteredData = data.filter(
    (item) =>
      item.AccountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const columns = [
    {
      title: (
        <div
          onClick={() => handleSort("accountName")}
          className="flex text-center items-center justify-between cursor-pointer"
        >
          Account Name
          {sortColumn === "accountName" ? (
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
      dataIndex: "AccountName",
      key: "AccountName",
    },
    {
      title: (
        <div
          onClick={() => handleSort("businessName")}
          className="flex items-center justify-between  cursor-pointer"
        >
          Business Name
          {sortColumn === "businessName" ? (
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
      dataIndex: "businessName",
      key: "businessName",
    },
    {
      title: (
        <div
          onClick={() => handleSort("contactNo")}
          className="flex items-center justify-between cursor-pointer"
        >
          Contact No
          {sortColumn === "contactNo" ? (
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
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: (
        <div
          onClick={() => handleSort("city")}
          className="flex items-center justify-between cursor-pointer"
        >
          City
          {sortColumn === "city" ? (
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
      dataIndex: "city",
      key: "city",
    },

    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      // render: (discount: any) => (discount ? discount.map().join(", ") : "N/A"),
    },
    {
      title: "Account Type",
      dataIndex: "accountType",
      key: "accountType",

    },
    {
      title: "TSO",
      dataIndex: "tso",
      key: "tso",
      // render: (tsos: any) => tsos || "N/A",
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
      render: (record: Account) => (
        <Space>
          <span onClick={() => handleEdit(record)}>
            <RiEditLine
              color="#00a8ec"
              size={18}
              className="hover:scale-125 cursor-pointer"
            />
          </span>
          <Popconfirm
            title="Are you sure to delete this account?"
            onConfirm={() => handleDelete(record.id)}
          >
            <span>
              <FaTrash
                color="red"
                size={16}
                className="hover:scale-125 cursor-pointer"
              />
            </span>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const navigate = useNavigate();
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingKey(null);
  };

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
        <h2 className="text-2xl font-bold">Account's</h2>
        <div className="md:flex md:space-y-0 space-y-4 items-center gap-2">
          <Search
            placeholder="Search Account"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:w-60 shadow-md bg-white rounded-md"
          />
          <button
            type="button"
            onClick={showModal}
            className="flex items-center space-x-2 py-2 px-5 rounded-md shadow-md text-white bg-[#00a8ec] hover:bg-[#00a1ec] hover:shadow-none"
          >
            <FaPlus /> <span>Add Account</span>
          </button>
        </div>
      </div>
      <div className="overflow-auto  p-4 bg-white rounded-md shadow-md">
        <Table
          columns={columns}
          dataSource={Accounts}
          rowKey="id"
          loading={isFetching}
          pagination={{
            pageSize: 5,
            showTotal: (total) => `Total ${total} items`,
          }}
          // onChange={(pagination, filters, sorter) => {
          //   setSortColumn(sorter.field as string);
          //   setSortOrder(sorter.order === "asc" ? "asc" : "desc");
          // }}
        />
      </div>
      {/* Modal */}
      <Modal
        title={editingKey !== null ? "Edit Account" : "Add Account"}
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
            name="AccountName"
            label="Account Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter Account Name" className="shadow-md p-2" />
          </Form.Item>
          <Form.Item name="businessName" label="Business Name">
            <Input
              placeholder="Enter Business Name"
              className="shadow-md p-2"
            />
          </Form.Item>
          <Form.Item name="contactNo" label="Contact No">
            <Input placeholder="Enter Contact No" className="shadow-md p-2" />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input placeholder="Enter City" className="shadow-md p-2" />
          </Form.Item>
          {/* TSO Dropdown */}
          <Form.Item name="tso" label="TSO"
          rules={[{ required: true, message: "Please select an TSO!" }]}
          
          >
          <Select
              showSearch  
              placeholder="Search and Select an TSO"
              optionFilterProp="children"
              loading={loading}
              
          >
            {tsos.length > 0 ? (
              tsos.map((item: any) => (
                <Option key={item.id} value={item} >
                  {item}
                </Option>
              ))
            ) : (
              <Option value="" disabled>
                No options available
              </Option>
            )}
          </Select>   
          </Form.Item>
          {/* Discount Dropdown */}
          <Form.Item name="discount" label="Discount"
          rules={[{ required: true, message: "Please select an Discount!" }]}
          >
          <Select
              showSearch   // Enable Search Functionality
              placeholder="Search and Select an Discount"
              optionFilterProp="children"
              loading={loading}
          >
            {discountValues.length > 0 ? (
              discountValues.map((item: any) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))
            ) : (
              <Option value="" disabled>
                No options available
              </Option>
            )}
          </Select>
          </Form.Item>

          {/* Account Type Dropdown */}
       
            <Form.Item
          name="accountType"
          label="Account Type"
          rules={[{ required: true, message: "Please select an account type!" }]}
        >
          <Select
              showSearch   // Enable Search Functionality
              placeholder="Search and Select an account type"
              optionFilterProp="children"
              loading={loading}
          >
            {accountType.length > 0 ? (
              accountType.map((item: any) => (
                <Option key={item.id} value={item}>
                  {item}
                </Option>
              ))
            ) : (
              <Option value="" disabled>
                No options available
              </Option>
            )}
          </Select>
        </Form.Item>
          <Form.Item name="isActive" label="Is Active" valuePropName="checked">
            <Switch className="shadow-md" />
          </Form.Item>
        </Form>
      </Modal>      
    </div>
  );
};

export default Accounts;
