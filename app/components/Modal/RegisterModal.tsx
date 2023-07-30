"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";

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
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
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

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
