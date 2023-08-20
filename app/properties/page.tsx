import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";

import React from "react";

import Properties from "./components/Properties";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListings({
    userId: currentUser?.id,
  });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (listings?.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you don't have any properties"
      />
    );
  }

  return (
    <div>
      <Properties listings={listings} currentUser={currentUser} />
    </div>
  );
};

export default PropertiesPage;
