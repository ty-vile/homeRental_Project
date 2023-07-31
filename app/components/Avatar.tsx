"use client";

// react
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  console.log("SRC", src);

  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="User Image"
      src={src || "/images/placeholder.png"}
    />
  );
};

export default Avatar;
