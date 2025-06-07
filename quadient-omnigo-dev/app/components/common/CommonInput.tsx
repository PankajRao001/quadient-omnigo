// components/CommonInput.tsx
import React from "react";

type CommonInputProps = {
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const CommonInput: React.FC<CommonInputProps> = ({
  label,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  className = "",
}) => {
  return (
    <div className="flex flex-col gap-1 mb-3 sm:mb-4 md:mb-6 lg:mb-[30px]">
      {label && (
        <label className="text-base sm:text-lg lg:text-xl text-black font-montserrat ml-4 mb-1 font-medium leading-[100%]">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`font-medium *: bg-[#FDF9F8] tracking-[-3%] text-gray focus:outline-0 rounded-md px-4 py-3 sm:py-4 lg:py-5 text-base sm:text-lg lg:text-xl ${className}`}
      />
    </div>
  );
};

export default CommonInput;
