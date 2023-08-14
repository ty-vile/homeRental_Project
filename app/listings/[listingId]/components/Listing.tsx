"use client";

import Container from "@/app/components/Container";
import { CATEGORIES } from "@/app/components/Navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import ListingHeader from "./ListingHeader";
import ListingInfo from "./ListingInfo";
import { useMemo } from "react";

interface ListingProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
}

const Listing: React.FC<ListingProps> = ({ listing, currentUser }) => {
  const {
    title,
    imageSrc,
    locationValue,
    id,
    user,
    description,
    roomCount,
    guestCount,
    bathroomCount,
  } = listing;

  const category = useMemo(() => {
    return CATEGORIES.find((items) => items.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHeader
            title={title}
            imageSrc={imageSrc}
            locationValue={locationValue}
            id={id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 mt-6 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={user}
              category={category}
              roomCount={roomCount}
              description={description}
              guestCount={guestCount}
              bathroomCount={bathroomCount}
              locationValue={locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
