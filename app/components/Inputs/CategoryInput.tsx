"use client";

import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  label,
  icon: Icon,
  selected,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 border-black p-6 flex flex-col gap-3 hover:bg-primary hover:text-white transition cursor-pointer
      ${selected ? "bg-primary border-4 text-white" : ""}
      `}
    >
      <Icon size={36} />
      <div className="font-sm font-bold">{label}</div>
    </div>
  );
};

export default CategoryInput;
