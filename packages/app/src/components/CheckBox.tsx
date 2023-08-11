import React, { useState } from "react";

interface CheckboxProps {
  label: string;
  onChange: (checked: boolean) => void;
  defaultChecked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, onChange, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const toggleCheckbox = () => {
    const newCheckedStatus = !checked;
    setChecked(newCheckedStatus);
    onChange(newCheckedStatus);
  };

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox text-primary h-4 w-4"
        checked={checked}
        onChange={toggleCheckbox}
      />
      <span className="ml-2 text-default text-sm">{label}</span>
    </label>
  );
};

export default Checkbox;
