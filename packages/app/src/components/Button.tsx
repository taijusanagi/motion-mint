// components/Button.tsx

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-default rounded-md shadow-sm p-2 hover:bg-accent transition-colors duration-200"
    >
      {label}
    </button>
  );
};

export default Button;
