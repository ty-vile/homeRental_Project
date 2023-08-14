// components
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
// server-functions
import getListings from "./actions/getListings";
import ListingCard from "./components/Listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  if (listings?.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings?.map((listing, i) => {
          return (
            <ListingCard key={i} data={listing} currentUser={currentUser} />
          );
        })}
      </div>
    </Container>
  );
}
