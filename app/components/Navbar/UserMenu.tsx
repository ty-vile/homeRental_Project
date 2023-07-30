"use client";

import { useState, useCallback } from "react";
// icons
import { AiOutlineMenu } from "react-icons/ai";
// components
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
// state
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div
          onClick={() => {}}
          className="hidden md:block text-sm font-semibold py-2 px-4 rounded-full cursor-pointer transition hover:bg-primary hover:text-white"
        >
          List your home
        </div>
        <div
          onClick={toggleIsOpen}
          className="p-4 md:py-1 md:px-2 border-2 flex items-center gap-2 rounded-full cursor-pointer hover:shadow-lg transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-lg w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer p-4">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
