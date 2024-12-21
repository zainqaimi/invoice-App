import React from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface Option {
  key: string;
  label: string;
  icon: React.ReactNode; // Icon component
}

interface DropdownMenuProps {
  options: Option[]; // Array of options
  onSelect: (key: string) => void; // Callback function for selection
  trigger?: "click" | "hover"; // Trigger method (click or hover)
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  onSelect,
  trigger = "click",
}) => {
  // Creating menu items from the options array
  const menuItems = options.map((option) => (
    <Menu.Item
      key={option.key}
      icon={option.icon}
      onClick={() => onSelect(option.key)}
    >
      {option.label}
    </Menu.Item>
  ));

  // Creating the dropdown menu
  const menu = <Menu>{menuItems}</Menu>;

  return (
    <Dropdown overlay={menu} trigger={[trigger]}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        Select Option <DownOutlined />
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
