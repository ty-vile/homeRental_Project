"use client";

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type LocationSelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface LocationSelectProps {
  value?: LocationSelectValue;
  onChange: (value: LocationSelectValue) => void;
}

const LocationSelect: React.FC<LocationSelectProps> = ({ value, onChange }) => {
  const { getCountries } = useCountries();

  return (
    <div>
      <Select
        placeholder="Select Location"
        isClearable
        options={getCountries()}
        value={value}
        onChange={(value) => onChange(value as LocationSelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex items-center gap-4">
            <div className="">{option.flag}</div>
            <div className="">
              {option.label},{" "}
              <span className="text-gray-800 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "#6BACE1",
          },
        })}
      />
    </div>
  );
};

export default LocationSelect;
