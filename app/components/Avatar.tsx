"use client";

// react
import Image from "next/image";

const Avatar = () => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="User Image"
      src="/images/placeholder.png"
    />
  );
};

export default Avatar;
