"use client";

// components
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/Listing/ListingCard";
// types
import { Listing, Reservation, User } from "@prisma/client";
// react
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

type SafeReservation = Omit<Reservation, "listing"> & {
  listing: Listing;
};

interface TripsProps {
  reservations: SafeReservation[];
  currentUser?: User | null;
}

const Trips: React.FC<TripsProps> = ({ reservations, currentUser }) => {
  const [deleteId, setDeleteId] = useState("");

  const router = useRouter();

  const handleCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      fetch(`/api/reservations/${id}`, {
        method: "POST",
      })
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeleteId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Your trips" subtitle="A collection of your trips" />
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

export default Trips;
