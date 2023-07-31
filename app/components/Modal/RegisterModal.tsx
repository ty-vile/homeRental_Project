"use client";

// icons
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
// react
import { useState } from "react";
// react-hook-form
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// modals
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
// components
import Heading from "../Heading";
import Input from "../Inputs/Input";
import Button from "../Button";
// toast
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    // NOTES - AXIOS
    // axios
    //   .post("/api/register", data)
    //   .then(() => {
    //     registerModal.onClose();
    //   })
    //   .catch((error) => console.log(error))
    //   .finally(() => setIsLoading(false));

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate content-type for your data
      },
      body: JSON.stringify(data), // Convert data object to JSON string
    })
      .then(() => {
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Holiday Rentals"
        subtitle="Create an account!"
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
        id="name"
        label="Name"
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
          <div className="">Already have an account?</div>
          <div
            className="text-gray-800 cursor-pointer font-semibold"
            onClick={() => {}}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
