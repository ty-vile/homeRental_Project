"use client";

// react
import { useState, useCallback } from "react";
// icons
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";
// components
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
// modals
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
// prisma
import { User } from "@prisma/client";
// next-auth
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleIsOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div
          onClick={onRent}
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
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-lg w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer p-4">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {
                    router.push("/trips");
                  }}
                  label="My trips"
                />
                <MenuItem onClick={() => {}} label="My favourites" />
                <MenuItem onClick={() => {}} label="My reservations" />
                <MenuItem onClick={() => {}} label="My properties" />
                <MenuItem onClick={onRent} label="Rent my home" />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
