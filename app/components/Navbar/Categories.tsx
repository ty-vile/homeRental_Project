"use client";

import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
];

const Categories = () => {
  return (
    <div className="flex items-center justify-between overflow-x-auto pt-4">
      {categories?.map((category, i) => {
        return (
          <CategoryBox
            key={i}
            label={category.label}
            description={category.description}
            icon={category.icon}
          />
        );
      })}
    </div>
  );
};

export default Categories;
