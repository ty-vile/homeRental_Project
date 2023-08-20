"use client";

// components
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/Listing/ListingCard";
// types
import { Listing, User } from "@prisma/client";
// react
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface PropertiesProps {
  listings?: Listing[];
  currentUser?: User | null;
}

const Properties: React.FC<PropertiesProps> = ({ listings, currentUser }) => {
  const [deleteId, setDeleteId] = useState("");

  const router = useRouter();

  const handleCancel = useCallback(
    (id: string) => {
      setDeleteId(id);

      fetch(`/api/listing/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Listing deleted");
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
      <Heading
        title="Your properties"
        subtitle="A collection of your properties"
      />
      <div className="mt-10 grid grid-grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listings?.map((listing, i) => {
          console.log(listing);

          return (
            <ListingCard
              key={i}
              data={listing}
              actionId={listing.id}
              onAction={handleCancel}
              actionLabel="Delete Property"
              disabled={deleteId === listing.id}
              currentUser={currentUser}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Properties;
