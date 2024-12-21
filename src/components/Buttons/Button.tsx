import React, { ReactNode } from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: string;
  disabled?: boolean;
  iconPosition?: "left" | "right";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  icon,
  variant = "primary",
  disabled = false,
  iconPosition = "left",
}) => {
  const baseStyles =
    "px-4 py-2 font-semibold rounded flex items-center justify-center";
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
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {label}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export default Button;
