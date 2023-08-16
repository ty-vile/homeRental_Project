"use client";

import Avatar from "@/app/components/Avatar";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

// https://stackoverflow.com/questions/68178127/next-js-with-react-leaflet-window-is-not-defined-when-refreshing-page
const Map = dynamic(() => import("../../../components/Map"), { ssr: false });

interface ListingInfoProps {
  user: User;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getCountryByValue } = useCountries();

  const coords = getCountryByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex items-center gap-5 font-light text-gray-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-gray-500">{description}</div>
      <hr />
      <Map center={coords} />
    </div>
  );
};

export default ListingInfo;
