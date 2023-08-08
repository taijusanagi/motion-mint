import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-white rounded-md shadow-sm py-2 px-3 hover:bg-accent transition-colors duration-200 ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
