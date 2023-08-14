import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";

import useLoginModal from "./useLoginModal";
import { User } from "@prisma/client";

interface IUseFavourite {
  listingId: string;
  currentUser?: User;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const isFavourite = useMemo(() => {
    const favouriteIds = currentUser?.favouriteIds || [];

    return favouriteIds.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen;
      }

      try {
        let request;

        if (isFavourite) {
          request = () =>
            fetch(`/api/favourites/${listingId}`, {
              method: "DELETE",
            });
        } else {
          request = () =>
            fetch(`/api/favourites/${listingId}`, {
              method: "POST",
            });
        }

        await request();
        toast.success("Listing added to favourites");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [currentUser, isFavourite, listingId, loginModal, router]
  );

  return { isFavourite, toggleFavourite };
};

export default useFavourite;
