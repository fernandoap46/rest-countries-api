import "./Body.css";
import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { InputText } from 'primereact/inputtext';
import CountryModal from "./CountryModal";

export default function CountryCards() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null); // Novo estado para o país selecionado

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/all?fields=flags,name,population,region,capital"
        );
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCountriesData();
  }, []);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.value);
    if (e.value) {
      const filtered = countries.filter((country) => country.region === e.value);
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const handleCardClick = (country) => {
    setSelectedCountry(country);
  };

  const hideModal = () => {
    setSelectedCountry(null);
  };

  return (
    <div>
      <div className="search">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className="inouta"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </span>
        <Dropdown
          className="drop"
          value={selectedRegion}
          options={[
            { label: "All Regions", value: "" },
            { label: "Africa", value: "Africa" },
            { label: "Americas", value: "Americas" },
            { label: "Asia", value: "Asia" },
            { label: "Europe", value: "Europe" },
            { label: "Oceania", value: "Oceania" },
          ]}
          onChange={handleRegionChange}
          placeholder="Select a region"
        />
      </div>
      <div className="card-container">
        {filteredCountries.map((country) => (
          <Card
            key={country.name.common}
            className="country-card"
            onClick={() => handleCardClick(country)}
          >
            <div className="card-content">
              <img src={country.flags.png} alt={country.name.common} />
              <div className="paragrafo">
                <p key={country.name.common}>{country.name.common}</p>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {selectedCountry && (
        <CountryModal country={selectedCountry} onHide={hideModal} />
      )}
    </div>
  );
}
