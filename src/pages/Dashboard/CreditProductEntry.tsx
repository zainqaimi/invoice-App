import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch, Input, Select, Button } from "antd";
import SearchableDropdown from "../../components/Buttons/DropdownMenu/SearchableDropdown";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
// import { fetchProducts } from "../../api/productApi";
import { useQuery } from "react-query";
import { fetchProducts } from "../../api/productApi";
const { Option } = Select;
type Product = {
  id: number;
  productName: string;
  weightType: string;
  weightQuantity: number;
  packingType: string;
  retailPrice: number;
  isActive: boolean;
};

type Row = {
  productName: string;
  weightType: string;
  weightQuantity: number;
  packingType: string;
  retailPrice: number;
  discount: number;
  amount: number;
};
const productOptions = [
  "Apple iPhone 14",
  "Samsung Galaxy S22",
  "Dell Laptop",
  "HP Laptop",
  "Sony Headphones",
  "Apple MacBook Air",
  "Logitech Mouse",
];
const CreditProductEntry = () => {
  const [paymentType, setPaymentType] = useState<"cash" | "bank">("cash");
  const [bankDetails, setBankDetails] = useState(false);
  const [onlineCheckType, setOnlineCheckType] = useState<"online" | "check">("online");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [products, setProducts] = useState<Product[]>([]);
const [quantity , setQuantity] = useState<string | number>(0)
  const [rows, setRows] = useState<Row[]>([
    {
      productName: "",
      weightType: "",
      weightQuantity: 0,
      packingType: "",
      retailPrice: 0,
      discount: 0,
      amount: 0,
    }
  ]);

 // Fetch products on component mount or when search/sort changes
 useEffect(() => {
  const getProducts = async () => {
    try {
      const params = {
        searchTerm,
        sortColumn,
        sortOrder,
      };
      const data = await fetchProducts(params);
      setProducts(data); // Assuming API returns an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  getProducts();
}, [searchTerm, sortColumn, sortOrder]);

  const handlePaymentChange = (checked: boolean) => {
    setPaymentType(checked ? "bank" : "cash");
    setBankDetails(checked);
  };

  const handleOnlineCheckChange = (checked: boolean) => {
    setOnlineCheckType(checked ? "check" : "online");
  };

  const handleProductSelect = (value: string) => {
    console.log("Selected Product:", value);
  };

  const addRow = (e : any) => {
    e.preventDefault();
    const newRow: Row = {
      productName: "",
      weightType: "",
      weightQuantity: 0,
      packingType: "",
      retailPrice: 0,
      discount: 0,
      amount: 0,
    };
    setRows([...rows, newRow]);
    setQuantity(0)
  };
  const handleBack = () => {
    navigate(-1);
  };

  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white rounded-md shadow-md space-y-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="flex items-center text-[#3bb0df] hover:text-[#40a6ce]"
        >
          <IoMdArrowRoundBack size={16} />
          <span>Back</span>
        </button>
      </div>
      <h1 className="text-xl font-bold mb-6">Product Entry</h1>

      {/* Account Section */}
      <div className="border p-4 shadow-md rounded-md mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <SearchableDropdown
              label="Account Title:"
              placeholder="Search for a product..."
              options={productOptions}
              onSelect={handleProductSelect}
              className="w-full p-2 rounded-md focus:outline-none focus:border-b-[#3bb0df] border bg-white shadow-md "
            />
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">
              {/* {paymentType === "cash" ? "Cash Amount" : "Bank Amount"}: */}
              <h1 className="block text-sm mb-1 font-medium">Amount</h1>
            </label>
            <Input type="number" className="p-2 w-full shadow-md rounded-md" />
          </div>
        </div>
      </div>
      {/* Voucher Section */}
      <div className="border p-4 shadow-md rounded-md mb-4 space-y-4">
        <h3 className="text-lg font-semibold mb-2">Voucher</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Voucher Number"
            className="p-2 w-full shadow-md rounded-md"
          />
          <Input type="date" className="p-2 w-full shadow-md rounded-md" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
          <Input
            placeholder="Invoice No"
            className="p-2 w-full shadow-md rounded-md"
          />
          <Input
            placeholder="Demand Form No"
            className="p-2 w-full shadow-md rounded-md"
          />
          <Input
            placeholder="Gate Pass No"
            className="p-2 w-full shadow-md rounded-md"
          />
          <Input
            placeholder="Cash Book No"
            className="p-2 w-full shadow-md rounded-md"
          />
        </div>
      </div>
      {/* Sales Invoice */}
      <div className="border p-4 shadow-md rounded-md mb-4">
        <h3 className="text-lg font-semibold mb-2">Sales Invoice</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <Input
            placeholder="Customer Name"
            className="p-2 w-full shadow-md rounded-md"
          />
          <Input
            placeholder="City Name"
            className="p-2 w-full shadow-md rounded-md"
          />
          <Input
            placeholder="Number"
            className="p-2 w-full shadow-md rounded-md"
          />
        </div>
      </div>
      {/* Add Rows Section */}
      {/* <div className="overflow-x-auto">
        <Button
          onClick={addRow}
          className="mt-2 bg-green-500 text-white flex items-center font-semibold p-4 shadow-md rounded-md hover:bg-green-600"
        >
          <FaPlus />
          Add Row
        </Button>
        <table className="w-full border-collapse border mt-4">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Weight Type</th>
              <th className="p-2 border">Weight Quantity</th>
              <th className="p-2 border">Packing Type</th>
              <th className="p-2 border">Retail Price</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, index) => (
              <tr key={index}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">
                  <Select
                    className="w-full shadow-md rounded-md h-8 placeholder:p-2"
                    placeholder={"Select product"}
                  >
                    <Option value="item1">Item 1</Option>
                    <Option value="item2">Item 2</Option>
                  </Select>
                </td>
                <td className="p-2 border">
                  <Input className="w-full p-1.5 shadow-md rounded-md" />
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    className="w-full p-1.5 shadow-md rounded-md"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    className="w-full p-1.5 shadow-md rounded-md"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    className="w-full p-1.5 shadow-md rounded-md"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    className="w-full p-1.5 shadow-md rounded-md"
                  />
                </td>
                <td className="p-2 border">
                  <Input
                    type="number"
                    className="w-full p-1.5 shadow-md rounded-md"
                  />
                </td>
              </tr>
            ))}
            <tr className="border p-2 ">
              <td
                className="p-2 border bg-gray-100  text-center font-semibold text-sm"
                colSpan={7}
              >
                Total:
              </td>
              <td className="p-2 border">
                <Input type="number" className="p-1.5 shadow-md rounded-md" />
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
     
<div className="overflow-x-auto">
  <Button
    onClick={addRow}
    className="mt-2 bg-green-500 text-white flex items-center font-semibold p-4 shadow-md rounded-md hover:bg-green-600"
  >
    <FaPlus />
    Add Row
  </Button>
  <table className="w-full border-collapse border mt-4">
    <thead>
      <tr className="bg-gray-200 text-sm">
        <th className="p-2 border">#</th>
        <th className="p-2 border">Product Name</th>
        <th className="p-2 border">Weight Type</th>
        <th className="p-2 border">Weight Quantity</th>
        <th className="p-2 border">Packing Type</th>
        <th className="p-2 border">Retail Price</th>
        <th className="p-2 border">Discount</th>
        <th className="p-2 border">Amount</th>
        <th className="p-2 border">Actions</th> {/* For Edit and Delete */}
      </tr>
    </thead>
    <tbody className="">
      {rows.map((row, index) => (
        <tr key={index}>
          <td className="p-2 border">{index + 1}</td>
          <td className="p-2 border">
            <Select
         showSearch
              className="w-full shadow-md rounded-md h-8"
              placeholder="Select product"
              value={row.productName}
              onChange={(value) => {
                const selectedProduct = products.find(
                  (product) => product.productName === value
                );
                const updatedRows = [...rows];
                if (selectedProduct) {
                  updatedRows[index] = {
                    ...updatedRows[index],
                    productName: selectedProduct.productName,
                    weightType: selectedProduct.weightType,
                    weightQuantity: selectedProduct.weightQuantity,
                    packingType: selectedProduct.packingType,
                    retailPrice: selectedProduct.retailPrice,
                  };
                }
                setRows(updatedRows);
              }}
            >
              {products.map((product) => (
                <Option key={product.id} value={product.productName}>
                  {product.productName}
                </Option>
              ))}
            </Select>
          </td>
          <td className="p-2 border">
            <Input
              className="w-full p-1.5 shadow-md rounded-md"
              value={row.weightType}
              readOnly
            />
          </td>
          <td className="p-2 border">
            <Input
              className="w-full p-1.5 shadow-md rounded-md"
              type="number"
              value={row.weightQuantity}
              onChange={(e) => {
                const updatedRows = [...rows];
                updatedRows[index].weightQuantity = Number(e.target.value);
                setRows(updatedRows);
              }}
            />
          </td>
          <td className="p-2 border">
            <Input
              className="w-full p-1.5 shadow-md rounded-md"
              value={row.packingType}
              readOnly
            />
          </td>
          <td className="p-2 border">
            <Input
              className="w-full p-1.5 shadow-md rounded-md"
              value={row.retailPrice}
              readOnly
            />
          </td>
          <td className="p-2 border">
            <Input
              className="w-full p-1.5 shadow-md rounded-md"
              value={row.discount}
              onChange={(e) => {
                const updatedRows = [...rows];
                updatedRows[index].discount = Number(e.target.value);
                setRows(updatedRows);
              }}
            />
          </td>
          <td className="p-2 border">
            <Input
              className="w-full p-1.5 shadow-md rounded-md"
              value={row.retailPrice * row.weightQuantity - row.discount}
              readOnly
            />
          </td>
          <td className="p-2 border">
            <Button
              type="link"
              onClick={() => {
                const updatedRows = rows.filter((_, i) => i !== index);
                setRows(updatedRows);
              }}
              danger
            >
              Delete
            </Button>
          </td>
        </tr>
      ))}
      <tr className="border p-2 ">
        <td
          className="p-2 border bg-gray-100 text-center font-semibold text-sm"
          colSpan={7}
        >
          Total:
        </td>
        <td className="p-2 border" colSpan={2}>
          <Input
            type="number"
            value={rows.reduce((total, row) => total + (row.retailPrice * row.weightQuantity - row.discount), 0)}
            className="p-1.5 shadow-md rounded-md"
            readOnly
          />
        </td>
      </tr>
    </tbody>
  </table>
</div>

      {/* Payment Options Bank/Cash Switch */}
      <div className="flex items-center gap-4 my-4">
        <span className="text-md font-semibold">Payment Mode:</span>
        <Switch
          checkedChildren="Bank"
          unCheckedChildren="Cash"
          onChange={handlePaymentChange}
          // onChange={(checked) => setPaymentMode(checked ? "Bank" : "Cash")}
        />
      </div>

      {/* Bank Details */}
      {bankDetails && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Input
              placeholder="Bank Name"
              className="w-full shadow-md rounded-md"
            />
            <Input
              placeholder="Account Number"
              className="w-full shadow-md rounded-md"
            />
            <Input type="date" className="w-full shadow-md rounded-md" />
          </div>
          {/* Online/Check Switch */}
          <div className="flex items-center gap-4 mt-6">
            <span>Online</span>
            <Switch
              checked={onlineCheckType === "check"}
              onChange={handleOnlineCheckChange}
              className="peer"
            />
            <span>Check</span>
          </div>

          {/* Conditional Fields for Check/Online */}
          {onlineCheckType === "check" ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <Input
                placeholder="Cheque No"
                className="w-full shadow-md rounded-md"
              />
              <Input
                type="date"
                placeholder="Cheque Date"
                className="w-full shadow-md rounded-md"
              />
              <Input
                placeholder="Amount"
                type="number"
                className="w-full shadow-md rounded-md"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <Input
                placeholder="Slip No"
                className="w-full shadow-md rounded-md"
              />
              <Input
                type="date"
                placeholder="Slip Date"
                className="w-full shadow-md rounded-md"
              />
            </div>
          )}
        </>
      )}

      <div className="mt-8 text-right">
        <button className="bg-[#3bb0df] hover:bg-[#2a81a3] shadow-md hover:shadow-none text-white px-6 py-2.5 md:w-48 rounded-md">
          Save
        </button>
      </div>
    </div>
  );
};

export default CreditProductEntry;
