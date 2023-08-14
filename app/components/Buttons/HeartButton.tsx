"use client";

import { User } from "@prisma/client";
import { AiOutlineHeart } from "react-icons/ai";
import useFavourite from "@/app/hooks/useFavourite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { isFavourite, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });

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
