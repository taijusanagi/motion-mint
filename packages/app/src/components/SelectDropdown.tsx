// components/SelectDropdown.tsx

import React, { useState } from "react";

interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  onSelectChange?: (selectedValue: string) => void;
}

const SelectDropdown: React.FC<SelectProps> = ({ label, options, onSelectChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onSelectChange && onSelectChange(event.target.value);
  };

  return (
    <div className="bg-default shadow-sm p-2 rounded-md">
      <label className="mb-2 block text-default">
        {label}
        <select
          value={selectedValue}
          onChange={handleChange}
          className="block w-full mt-1 bg-default text-default rounded-md border border-primary shadow-sm focus:border-accent"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SelectDropdown;
