import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavouriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favouriteListings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });
    return favouriteListings;
  } catch (err: any) {
    throw new Error(err);
  }
}
