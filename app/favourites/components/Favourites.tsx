import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import ListingCard from "@/app/components/Listing/ListingCard";
import { Listing, User } from "@prisma/client";

interface FavouriteListingsProps {
  listings: Listing[];
  currentUser?: User | null;
}

const Favourites: React.FC<FavouriteListingsProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of places you have favourited"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {listings.map((listing, i) => {
          return (
            <ListingCard currentUser={currentUser} key={i} data={listing} />
          );
        })}
      </div>
    </Container>
  );
};

export default Favourites;
