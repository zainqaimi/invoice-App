import React, { useState } from "react";
import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface ReusableDropdownProps {
  items: MenuProps["items"];
  label?: string;
  onClick?: (key: string) => void;
  onChange?: (key: string) => void;
  onVisibleChange?: (visible: boolean) => void;
  className?: string;
}

const HoverDropdown: React.FC<ReusableDropdownProps> = ({
  items,
  label = "Select Option",
  onClick,
  onChange,
  onVisibleChange,
  className = "",
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedItem(e.key); // Select item ko state mein save karo
    onClick?.(e.key); // Click event trigger karo
    onChange?.(e.key); // Custom change event trigger karo
  };

  return (
    <Dropdown
      menu={{ items, onClick: handleMenuClick }}
      onOpenChange={onVisibleChange}
      className={`w-full border border-black p-2 rounded-md ${className}`}
    >
      <a onClick={(e) => e.preventDefault()} className="block w-full">
        <Space className="space-x-4 justify-between">
          {selectedItem ? `Selected: ${selectedItem}` : label}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default HoverDropdown;
