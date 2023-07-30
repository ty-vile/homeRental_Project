"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  formatPrice,
  register,
  required,
  errors,
}) => {
  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar size={24} className="text-gray-500 absolute top-5 left-2" />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        placeholder=" "
        className={`peer w-full p-4 pt-8 font-light bg-white border-2 border-gray-200 focus:border-primary focus:border-4 rounded-md outline-none transition disabled:cursor-not-allowed disabled:opacity-70 
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-red-500" : "border-gray-500"}
        ${errors[id] ? "focus:border-red-500" : ""}
        `}
      />
      <label
        htmlFor={id}
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] font-bold
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-red-500" : ""}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
