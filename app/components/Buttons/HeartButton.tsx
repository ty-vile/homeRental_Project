"use client";

import { User } from "@prisma/client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  let isFavourite = false;
  const toggleFavourite = () => {
    isFavourite = !isFavourite;
  };

  return (
    <div
      className="relative hover:opacity-80 transition cursor-pointer"
      onClick={toggleFavourite}
    >
      <AiOutlineHeart
        size={36}
        className={`hover:scale-95 p-1 ${
          isFavourite ? "bg-red-500 rounded-full text-white " : ""
        }`}
      />
    </div>
  );
};

export default HeartButton;
