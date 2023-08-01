import countries from "world-countries";

const formattedCountries = countries.map((country, i) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getCountries = () => formattedCountries;

  const getCountryByValue = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  };

  return {
    getCountries,
    getCountryByValue,
  };
};

export default useCountries;
