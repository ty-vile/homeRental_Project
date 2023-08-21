import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function POST(req: NextRequest, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // get listing id from params
  const { listingId } = params;

  // check if listing id valid
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  // sets favourite ids to current favourite ids or empty array
  let favouriteIds = [...(currentUser.favouriteIds || [])];

  favouriteIds.push(listingId);

  const user = await prisma?.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  // get listing id from params
  const { listingId } = params;

  // check if listing id valid
  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favouriteIds = [...(currentUser.favouriteIds || [])];

  favouriteIds = favouriteIds.filter((id) => id !== listingId);

  const user = await prisma?.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favouriteIds,
    },
  });

  return NextResponse.json(user);
}
