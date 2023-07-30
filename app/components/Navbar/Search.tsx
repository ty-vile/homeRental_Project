"use client";

// icons
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="w-full md:w-auto py-2 rounded-full border-2 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-2 flex-1 text-center">
          Any Week
        </div>
        <div className="text-sm font-semibold pl-6 pr-2 flex items-center gap-2">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 bg-primary rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
