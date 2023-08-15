"use client";

import Button from "@/app/components/Buttons/Button";
import Calendar from "@/app/components/Inputs/Calendar";
import { Range } from "react-date-range";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabledDates,
  disabled,
}) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-100 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-500">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div className="">Total</div>
        <div className="font-bold text-2xl">$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
