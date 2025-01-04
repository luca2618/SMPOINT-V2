import React from 'react';

interface DatalistInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: { id: string; value: string; }[];
  error?: string;
}

const DatalistInput: React.FC<DatalistInputProps> = ({ label, options, error, ...props }) => {
  const datalistId = `${props.id}-list`;

  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        {...props}
        list={datalistId}
        autoComplete="off"
        className="w-full p-2 rounded-lg bg-background border border-muted focus:border-primary focus:outline-none"
      />
      <datalist id={datalistId}>
        {options.map(option => (
          <option key={option.id} value={option.value} />
        ))}
      </datalist>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default DatalistInput;