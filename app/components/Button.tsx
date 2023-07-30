"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg transition w-full border-2
      ${outline ? "bg-white" : "bg-primary hover:bg-primary-dark"}
      ${outline ? "border-black" : "border-primary"}
      ${outline ? "text-black" : "text-white"}
      ${small ? "text-sm" : "text-md"}
      ${small ? "p-2" : "p-4"}
  `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-4" />}
      {label}
    </button>
  );
};

export default Button;
