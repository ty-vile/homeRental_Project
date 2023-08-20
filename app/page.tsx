// components
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
// server-functions
import getListings, { IListingParams } from "./actions/getListings";
import ListingCard from "./components/Listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {listings?.map((listing, i) => {
          return (
            <ListingCard
              key={i}
              data={listing}
              currentUser={currentUser}
              actionId=""
            />
          );
        })}
      </div>
    </Container>
  );
}
