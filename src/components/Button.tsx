import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}) => {
  const baseStyles = "px-4 py-2 font-semibold rounded";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const finalStyles = `${baseStyles} ${variants[variant]} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <button className={finalStyles} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
