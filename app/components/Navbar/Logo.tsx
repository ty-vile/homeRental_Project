"use client";

// react
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="Company Logo"
      className="hidden md:block cursor-pointer"
      height={100}
      width={100}
      src="/images/logo.svg"
    />
  );
};

export default Logo;
