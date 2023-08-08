import React from "react";

interface ButtonProps {
  label: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, disabled, type = "primary" }) => {
  const baseClasses = {
    primary: "bg-primary text-white hover:bg-accent",
    secondary: "bg-secondary text-default hover:bg-accent-light",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md shadow-sm py-2 px-3 transition-colors duration-200 ${baseClasses[type]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
