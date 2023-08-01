"use client";

// react
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
// hooks
import useRentModal from "@/app/hooks/useRentModal";
// data
import { CATEGORIES } from "../Navbar/Categories";
// components
import Modal from "./Modal";
import Heading from "../Heading";
import LocationSelect from "../Inputs/LocationSelect";
import CategoryInput from "../Inputs/CategoryInput";
import Counter from "../Inputs/Counter";
// react-hook-form
import { FieldValues, useForm } from "react-hook-form";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedLocation = watch("location");
  const selectedGuestCount = watch("guestCount");
  const selectedRoomCount = watch("roomCount");
  const selectedBathroomCount = watch("bathroomCount");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [selectedLocation]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onPrevious = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describe your property?"
        subtitle="Select a category!"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto p-2">
        {CATEGORIES.map((category, i) => {
          return (
            <CategoryInput
              key={i}
              onClick={(category) => setCustomValue("category", category)}
              selected={selectedCategory === category.label}
              label={category.label}
              icon={category.icon}
            />
          );
        })}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your property located?"
          subtitle="Help guest find you!"
        />
        <LocationSelect
          value={selectedLocation}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={selectedLocation?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some information about your rental"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests can your property hold?"
          value={selectedGuestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many bedrooms does your property have?"
          value={selectedRoomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms does your property have?"
          value={selectedBathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onPrevious}
      title="Rent your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
