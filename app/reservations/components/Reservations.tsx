"use client";

// components
import Container from "@/app/components/Container";
import ListingCard from "@/app/components/Listing/ListingCard";
// types
import { Listing, Reservation, User } from "@prisma/client";
// toast
import { toast } from "react-toastify";
// react
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Heading from "@/app/components/Heading";

type SafeReservation = Omit<Reservation, "listing"> & {
  listing: Listing;
};

interface ReservationProps {
  reservations: SafeReservation[];
  currentUser?: User | null;
}

const Reservations: React.FC<ReservationProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deleteId, setDeletingId] = useState("");

  const handleCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      fetch(`/api/reservations/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {reservations.map((reservation, i) => {
          const { id, listing } = reservation;

          return (
            <ListingCard
              key={i}
              data={listing}
              reservation={reservation}
              actionId={id}
              onAction={handleCancel}
              actionLabel="Cancel Reservation"
              disabled={deleteId === id}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Reservations;
