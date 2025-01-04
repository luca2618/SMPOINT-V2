import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, error, ...props }) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        {...props}
        autoComplete="off"
        className="w-full p-2 rounded-lg bg-background border border-muted focus:border-primary focus:outline-none"
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;