"use client";

import { IconType } from "react-icons";

interface CategoryBoxProps {
  label: string;
  icon: IconType;
  selected?: boolean;
}
const CategoryBox: React.FC<CategoryBoxProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-2 border-b-2 transition cursor-pointer hover:text-primary
    ${selected ? "border-b-primary" : "border-transparent"}
    ${selected ? "text-primary" : "text-gray-500"}
    `}
    >
      <Icon size={26} />
      <div className="font-bold text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
