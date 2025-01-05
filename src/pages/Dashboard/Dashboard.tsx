import { Dropdown, MenuProps, Button } from "antd";
import { DashboardOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Debit Dropdown Menu
  const debitMenu: MenuProps = {
    items: [
      {
        key: "1",
        label: "General Entry",
        onClick: () => navigate("/debit/general"),
      },
      {
        key: "2",
        label: "Product Entry",
        onClick: () => navigate("/debit/product"),
      },
    ],
  };

  // Credit Dropdown Menu
  const creditMenu: MenuProps = {
    items: [
      {
        key: "1",
        label: "General Entry",
        onClick: () => navigate("/credit/general"),
      },
      {
        key: "2",
        label: "Product Entry",
        onClick: () => navigate("/credit/product"),
      },
    ],
  };

  return (
    <div className="md:p-6 md:rounded-md">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
        <DashboardOutlined /> Dashboard
      </h2>

      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {/* Debit Voucher Dropdown */}
        <Dropdown menu={debitMenu} trigger={["hover"]}>
          <Button className="w-52 h-12 flex items-center justify-between bg-[#00a8ec] rounded-lg text-lg text-white  hover:bg-[#3baedb]">
            $ Debit Voucher 
            <span><DownOutlined /></span>
          </Button>
        </Dropdown>

        {/* Credit Voucher Dropdown */}
        <Dropdown menu={creditMenu} trigger={["hover"]}>
          <Button className="w-52 h-12 rounded-lg flex items-center justify-between bg-green-500 text-white text-lg  hover:bg-green-600">
            $ Credit Voucher 
            <span><DownOutlined /></span>
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Dashboard;
