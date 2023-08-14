import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  description?: string;
  label?: string;
}

const ListingCategory: React.FC<ListingCategoryProps> = ({
  icon: Icon,
  description,
  label,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={50} className="text-gray-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-gray-400 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
