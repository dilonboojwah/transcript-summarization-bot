import React from "react";

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string; // Add an errorMessage prop for displaying error text
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error = false,
  errorMessage = "", // Default empty string if no error message
}) => {
  return (
    <div className="w-[408px]">
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full h-[56px] px-4 py-3 
            rounded-[8px] 
            bg-white 
            text-gray-900 text-[18px] leading-[1.5]
            placeholder:text-gray-500 placeholder:font-light placeholder:text-[18px] placeholder:leading-[1.5] 
            border 
            ${error ? "border-[#AF1215]" : "border-gray-300"} 
            focus:outline-none 
            ${!error && "focus:border-gray-300"}`}
        />
        {/* Error Message */}
        <p
          className={`absolute left-0 top-full mt-[2px] text-[#AF1215] text-[11.5px] leading-[140%] font-light ${
            error ? "visible" : "invisible"
          }`}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default InputField;
