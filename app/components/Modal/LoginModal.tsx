"use client";

// icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
// react
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
// react-hook-form
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// next-auth
import { signIn } from "next-auth/react";
// modals
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
// toast
import { toast } from "react-toastify";
// components
import Input from "../Inputs/Input";
import Heading from "../Heading";
import Button from "../Buttons/Button";

const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (!callback?.error) {
        toast.success("Logged in succesfully");
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggleModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Holiday Rentals"
        subtitle="Login to your account!"
      />
      <Input
        id="email"
        label="Email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-gray-500 text-center mt-4 font-light">
        <div className="flex items-center justify-center gap-2">
          <div className="">Don't have an account?</div>
          <div
            className="text-gray-800 cursor-pointer font-semibold"
            onClick={toggleModal}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
