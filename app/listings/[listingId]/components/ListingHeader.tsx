"use client";

import HeartButton from "@/app/components/Buttons/HeartButton";
import Heading from "@/app/components/Heading";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import Image from "next/image";

interface ListingHeaderProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: User | null;
}

const ListingHeader: React.FC<ListingHeaderProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}) => {
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={imageSrc}
          fill
          alt="Listing Image"
          className="object-cover w-full"
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHeader;
