import React from "react";

interface ButtonProps {
  label: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-primary text-white rounded-md shadow-sm py-2 px-3 transition-colors duration-200 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-accent"
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
