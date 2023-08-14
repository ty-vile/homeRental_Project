"use client";

import { User } from "@prisma/client";
import { AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const isFavourite = false;
  const toggleFavourite = () => {};

  return (
    <div
      className="relative hover:opacity-80 transition cur\
  o"
      onClick={toggleFavourite}
    >
      <AiOutlineHeart size={28} className="hover:scale-95" />
    </div>
  );
};

export default HeartButton;
