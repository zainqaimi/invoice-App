import React, { useState } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import Search from "antd/es/input/Search";
interface RecordType {
  key: number;
  invoiceNo: string;
  voucherNo: string;
  businessName: string;
  accountType: string;
  voucherType: string;
  computerNo: string;
  gatePassNo: string;
  voucherDate: string;
  demandFormNo: string;
  amount: string;
  
}

const Voucher = () => {
  const [filteredData, setFilteredData] = useState<RecordType[]>([]); 
  const [searchTerm, setSearchTerm] = useState("");

  const data: RecordType[] = [
    {
      key: 1,
      businessName: "Tassco Chemicals",
      voucherNo: "123456",
      invoiceNo: "1234567890",
      accountType: "Savings",
      voucherType: "Payment",
      computerNo: "ABC123",
      gatePassNo: "DEF456",
      voucherDate: "2022-01-01",
      demandFormNo: "789012",
      amount: "1000.00",
    },
    {
      key: 2,
      businessName: "Business B",
      voucherNo: "789012",
      invoiceNo: "0987654321",
      accountType: "Current",
      voucherType: "Payment",
      computerNo: "XYZ789",
      gatePassNo: "MNO123",
      voucherDate: "2022-02-01",
      demandFormNo: "345678",
      amount: "2000.00",
    },
    
  ];

  const columns = [
    { title: "Invoice No", dataIndex: "invoiceNo", key: "invoiceNo" },
    { title: "Voucher No", dataIndex: "voucherNo", key: "voucherNo" },
    { title: "Business Name", dataIndex: "businessName", key: "businessName" },
    { title: "Account Type", dataIndex: "accountType", key: "accountType" },
    { title: "Voucher Type", dataIndex: "voucherType", key: "voucherType" },
    { title: "Computer No", dataIndex: "computerNo", key: "computerNo" },
    { title: "Gate Pass No", dataIndex: "gatePassNo", key: "gatePassNo" },
    { title: "Voucher Date", dataIndex: "voucherDate", key: "voucherDate" },
    { title: "Demand Form No", dataIndex: "demandFormNo", key: "demandFormNo" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

const navigate = useNavigate()

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
              <h2 className="text-2xl font-bold mb-4">Voucher</h2>
            <Search
            placeholder="Search product"
            onChange={(e) => setSearchTerm(e.target.value)}
            
            className="w-80 shadow-md bg-white rounded-md"
          />
            </div>
      <div className="overflow-auto  p-4 bg-white text-center rounded-md shadow-md">

          <Table
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : data}
          rowKey="key"
          pagination={{
            pageSize: 5,
            showTotal: (total) => `Total ${total} items`,
          }}
          className=""
        />
      </div>

    </div>
  );
};

export default Voucher;
