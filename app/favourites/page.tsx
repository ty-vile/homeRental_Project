import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import Favourites from "./components/Favourites";

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favouriteListings = await getFavouriteListings();

  if (favouriteListings.length === 0) {
    return (
      <EmptyState
        title="No favourites found"
        subtitle="Looks like you don't have any properties favourited"
      />
    );
  }

  if (!currentUser) {
    return;
  }

  return <Favourites listings={favouriteListings} currentUser={currentUser} />;
};

export default FavouritesPage;
