// import { useState } from "react";
// import {
//   Table,
//   Button,
//   Modal,
//   Form,
//   Input,
//   Spin,
//   message,
//   Select,
//   Space,
//   Popconfirm,
//   Switch,
// } from "antd";
// import {
  
//   SortAscendingOutlined,
//   SortDescendingOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
// import { RiEditLine } from "react-icons/ri";
// import { IoMdArrowRoundBack } from "react-icons/io";

// const { Search } = Input;
// const { Option } = Select;

// interface Product {
//   key: number;
//   productName: string;
//   businessName: string;
//   contactNo: string;
//   city: string;
//   tso: string;
//   Account Type: string;
//   accountType: string;
//   isActive: boolean;
// }

// const AccountType: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [form] = Form.useForm();
 
//     const [trashModalOpen, setTrashModalOpen] = useState(false);
  
//     const showDltModal = () => {
//       setTrashModalOpen(true);
//     };
 
  

//   const [data, setData] = useState<Product[]>([
//     {
//       key: 1,
//       productName: "Product A",
//       businessName: "Business A",
//       contactNo: "1234567890",
//       city: "City A",
//       tso: "TSO A",
//       Account Type: "10%",
//       accountType: "Savings",
//       isActive: true,
//     },
//     {
//       key: 2,
//       productName: "Product B",
//       businessName: "Business B",
//       contactNo: "0987654321",
//       city: "City B",
//       tso: "TSO B",
//       Account Type: "15%",
//       accountType: "Current",
//       isActive: false,
//     },
//     {
//       key: 3,
//       productName: "Product A",
//       businessName: "Business A",
//       contactNo: "1234567890",
//       city: "City A",
//       tso: "TSO A",
//       Account Type: "10%",
//       accountType: "Savings",
//       isActive: true,
//     },
//     {
//       key: 4,
//       productName: "Product B",
//       businessName: "Business B",
//       contactNo: "0987654321",
//       city: "City B",
//       tso: "TSO B",
//       Account Type: "15%",
//       accountType: "Current",
//       isActive: false,
//     },
//     {
//       key: 5,
//       productName: "Product B",
//       businessName: "Business B",
//       contactNo: "0987654321",
//       city: "City B",
//       tso: "TSO B",
//       Account Type: "15%",
//       accountType: "Current",
//       isActive: false,
//     },
//     {
//       key: 6,
//       productName: "Product B",
//       businessName: "Business B",
//       contactNo: "0987654321",
//       city: "City B",
//       tso: "TSO B",
//       Account Type: "15%",
//       accountType: "Current",
//       isActive: false,
//     },
//   ]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [editingKey, setEditingKey] = useState<number | null>(null);

//   const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
//   const [sortColumn, setSortColumn] = useState<string | null>(null);

//   // Modal Handlers
//   const showModal = () => setIsModalOpen(true);
//   const handleCancel = () => {
//     form.resetFields();
//     setIsModalOpen(false);
//     setEditingKey(null);
//   };

//   const handleSave = async () => {
//     try {
//       setIsLoading(true);
//       const values = await form.validateFields();

//       if (editingKey !== null) {
//         setData((prevData) =>
//           prevData.map((item) =>
//             item.key === editingKey ? { ...item, ...values } : item
//           )
//         );
//         message.success("Product updated successfully!");
//       } else {
//         setData((prevData) => [
//           ...prevData,
//           { ...values, key: prevData.length + 1 },
//         ]);
//         message.success("Product added successfully!");
//       }

//       setIsLoading(false);
//       form.resetFields();
//       setIsModalOpen(false);
//       setEditingKey(null);
//     } catch (error) {
//       setIsLoading(false);
//       message.error("Failed to save product!");
//     }
//   };

//   const handleEdit = (record: Product) => {
//     setEditingKey(record.key);
//     form.setFieldsValue(record);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (key: number) => {
//     setData((prevData) => prevData.filter((item) => item.key !== key));
//     message.success("Product deleted successfully!");
//   };

//   // Sorting Handler
//   const handleSort = (column: string) => {
//     const newOrder =
//       sortColumn === column && sortOrder === "ascend" ? "descend" : "ascend";
//     setSortColumn(column);
//     setSortOrder(newOrder);

//     const sortedData = [...data].sort((a, b) => {
//       if (newOrder === "ascend") {
//         return a[column as keyof Product] > b[column as keyof Product] ? 1 : -1;
//       } else {
//         return a[column as keyof Product] < b[column as keyof Product] ? 1 : -1;
//       }
//     });

//     setData(sortedData);
//   };

//   const filteredData = data.filter(
//     (item) =>
//       item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       item.businessName.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const columns = [
//     {
//       title: (
//         <div onClick={() => handleSort("accountType")} className="flex text-center items-center justify-between cursor-pointer">
//        Account Type
//           {sortColumn === "accountType" ? (
//             sortOrder === "ascend" ? (
//               <SortAscendingOutlined />
//             ) : (
//               <SortDescendingOutlined />
//             )
//           ) : <SortAscendingOutlined />}
//         </div>
//       ),
//       dataIndex: "accountType",
//       key: "accountType",
//     },
//               {
//                 title: (
//                   <div onClick={() => handleSort("isActive")} className="flex text-center items-center justify-between cursor-pointer">
//                 Is Active
//                     {sortColumn === "isActive" ? (
//                       sortOrder === "ascend" ? (
//                         <SortAscendingOutlined />
//                       ) : (
//                         <SortDescendingOutlined />
//                       )
//                     ) : <SortAscendingOutlined />}
//                   </div>
//                 ),
//             dataIndex: "isActive",
//             key: "isActive",
//             render: (isActive: boolean) => (
//               <span
//                 className={`px-2 py-1 rounded-md text-white ${
//                   isActive ? "bg-green-500" : "bg-red-500"
//                 }`}
//               >
//                 {isActive ? "Active" : "Inactive"}
//               </span>
//             ),
//           },
//           {
//             title: "Actions",
            
//             key: "actions",
//             render: (record: Product) => (

//               <Space className="space-x-2 cursor-pointer">
//                 <span  onClick={() => handleEdit(record)}>
//                 <RiEditLine color="#00a8ec" size={18} className="hover:scale-125"/>       
//                 </span>
//                 <Popconfirm
//                   title="Are you sure ?"
//                   onConfirm={() => handleDelete(record.key)}
//                 >
//                   <span onClick={showDltModal} >
       
//         <FaTrash color={'red'} size={16} className=" hover:scale-125"/>
//                   </span>
//                 </Popconfirm>
//               </Space>
//             ),
//           },
//   ];
//   const navigate = useNavigate();

//   return (
//     <div className="p-4 bg-gray-50 shadow-sm min-h-screen">
//        {/* Back Button */}
//                   <div className="mb-4">
//                     <button
//                       onClick={() => navigate(-1)}
//                       className="flex items-center text-[#3bb0df] hover:text-[#40a6ce]"
//                     >
//                       <IoMdArrowRoundBack size={16} />
//                       <span>Back</span>
//                     </button>
//                   </div>
//       <div className="md:flex md:space-y-0 space-y-4 justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Account Type</h2>
//         <div className="md:flex md:space-y-0 space-y-4 items-center gap-2">
//           <Search
//             placeholder="Search product"
//   onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
// className="md:w-60 shadow-md bg-white rounded-md"
//           />
//           <button
//             type="button"
//             onClick={showModal}
//             className="flex items-center space-x-2 py-2 px-5 rounded-md shadow-md text-white bg-[#00a8ec] hover:bg-[#00a1ec] hover:shadow-none"
//           >
//             <FaPlus /> <span>Add Account Type</span>
//           </button>
//         </div>
//       </div>
//       <div className="overflow-auto  p-4 bg-white rounded-md shadow-md">
//       <Table
//   columns={columns}
//   dataSource={filteredData}
//   rowKey="key"
//   pagination={{
//     pageSize: 5,
//     showTotal: (total) => `Total ${total} items`,
    
//   }}
//   className="text-center items-center"
// />
//       </div>
//               {/* Modal */}
//       <Modal
//         title={editingKey !== null ? "Edit Account" : "Add Account" }
        
//         className="font-semibold text-lg"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="back" onClick={handleCancel}
//           className=" px-6 py-5 text-[16px] hover:shadow-none shadow-md"

          
//           >
//             Cancel
//           </Button>,
//           <Button
//             key="submit"
//             type='default'
//             onClick={handleSave}
//             disabled={isLoading}
//             className="bg-[#00a8ec] px-8 py-5 text-white text-[16px] hover:shadow-none shadow-md"
//           >
//             {isLoading ? <Spin /> : "Save"}
            
//           </Button>,
//         ]}
    
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="accountType" label="Account Type" rules={[{ required: true }]}>
//             <Input placeholder="Enter Account Type" className="shadow-md p-2" />  
//           </Form.Item>
//           <Form.Item name="isActive" label="Is Active" valuePropName="checked" >
//             <Switch className="shadow-md" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default AccountType;

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
  fetchaccountTypes,
  addaccountTypes,
  updateaccountTypes,
  deleteaccountTypes,
} from "../api/accountTypes";
import { useNavigate } from "react-router-dom";

const { Search } = Input;
const { Option } = Select;

interface accountTypes {
  id: number;
  accountTypes: string;
  isActive: boolean;
}

const AccountType: React.FC = () => {
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
  const { data: accountTypes = [], isLoading: isFetching } = useQuery(
    ["accountTypes", searchTerm, sortColumn, sortOrder],
    () => fetchaccountTypes({ searchTerm, sortColumn, sortOrder })
  );

  // Modal Handlers
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setEditingKey(null);
  };

  // const handleSave = async () => {
  //   try {
  //     setIsLoading(true);
  //     const values = await form.validateFields();
      
  //     if (values.accountTypes && !values.accountTypes.includes('%')) {
  //       values.accountTypes = `${values.accountTypes}%`;
  //     }
  
  //     if (editingKey !== null) {
  //       await updateaccountTypes({ id: editingKey, ...values });
  //       message.success("Account Type updated successfully!");
  //     } else {
  //       await addaccountTypes(values);
  //       message.success("Account Type added successfully!");
  //     }
  //     setIsLoading(false);
  //     setIsModalOpen(false);
  //     setEditingKey(null);
  //     form.resetFields();
  
  //     queryClient.invalidateQueries("accountTypes");
  //   } catch (error) {
  //     setIsLoading(false);
  //     message.error("Failed to save Account Type!");
  //   }
  // };
  
  
  const handleSave = async () => {
    try {
      setIsLoading(true);
      const values = await form.validateFields();
      if (editingKey !== null) {
        await updateaccountTypes({ id: editingKey, ...values });
        message.success("accountTypes updated successfully!");
      } else {
        await addaccountTypes(values);
        message.success("accountTypes added successfully!");
      }
      setIsLoading(false);
      setIsModalOpen(false);
      setEditingKey(null);
      form.resetFields();

      queryClient.invalidateQueries("accountTypes");
    } catch (error) {
      setIsLoading(false);
      message.error("Failed to save accountTypes!");
    }
  };
  const handleEdit = (record: accountTypes) => {
    setEditingKey(record.id);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteaccountTypes(id);
    message.success("accountTypes deleted successfully!");
    queryClient.invalidateQueries("accountTypes");
  };

  // Sorting Handler
  const handleSort = (column: string) => {
    const newOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);
    queryClient.invalidateQueries("accountTypes");
  };


  const columns = [
    {
      title: (
        <div
          onClick={() => handleSort("accountTypes")}
          className="flex items-center justify-between cursor-pointer"
        >
          Account Types
          {sortColumn === "accountTypes" ? (
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
      dataIndex: "accountTypes",
      key: "accountTypes",
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
      render: (record: accountTypes) => (
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
        <h2 className="text-2xl font-bold">Account Type's</h2>
        <div className="md:flex md:space-y-0 space-y-4 items-center gap-2">
          <Search
            placeholder="Search accountTypes"
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
            <FaPlus /> <span>Add Account Type</span>
          </button>
        </div>
      </div>
      <div className="overflow-auto  p-4 bg-white rounded-md shadow-md">
        <Table
          columns={columns}
          dataSource={accountTypes}
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
            {editingKey !== null ? "Edit Account Type" : "Add Account Type"}
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
          <Form.Item name="accountTypes" label="Account Type" rules={[{ required: true }]}>
            <Input placeholder="Enter Account Type" className="p-2" />
          </Form.Item>
          <Form.Item name="isActive" label="Is Active" valuePropName="checked">
            <Switch  className="shadow-md"/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AccountType;
