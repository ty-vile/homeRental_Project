"use client";

// components
import ListingHeader from "./ListingHeader";
import ListingInfo from "./ListingInfo";
import { CATEGORIES } from "@/app/components/Navbar/Categories";
import Container from "@/app/components/Container";
// prisma
import { Listing, Reservation, User } from "@prisma/client";
// hooks
import useLoginModal from "@/app/hooks/useLoginModal";
// react
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
// toast
import { toast } from "react-toastify";
// date
import { differenceInCalendarDays, eachDayOfInterval, setDate } from "date-fns";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingProps {
  reservations?: Reservation[];
  listing: Listing & {
    user: User;
  };
  currentUser?: User | null;
}

const Listing: React.FC<ListingProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
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
    price,
  } = listing;

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const loginModal = useLoginModal();
  const router = useRouter();

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      }),
    })
      .then(() => {
        toast.success("Reservation created succesfully");
        setDateRange(initialDateRange);
        // redirect
        router.refresh();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

  // calculates difference in days * price of reservation
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange, price]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

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
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Listing;
