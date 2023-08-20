"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
// icons
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getCountryByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getCountryByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [getCountryByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      let difference = differenceInDays(end, start);

      if (difference === 0) {
        difference = 1;
      }

      return `${difference} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      className="w-full md:w-auto py-2 rounded-full border-2 cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-2 flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm font-semibold pl-6 pr-2 flex items-center gap-2">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 bg-primary rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
