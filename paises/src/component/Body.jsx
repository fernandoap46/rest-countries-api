import "./Body.css";
import { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import CountryModal from "./CountryModal";
import data from "../../../data.json";

export default function CountryCards() {
  const [countries, setCountries] = useState([]); // Lista de países obtidos da API ou arquivo JSON
  const [filteredCountries, setFilteredCountries] = useState([]); // Lista de países filtrados com base na região selecionada ou texto de pesquisa
  const [selectedRegion, setSelectedRegion] = useState(""); // Região selecionada no dropdown
  const [searchText, setSearchText] = useState(""); // Texto de pesquisa inserido no campo de busca
  const [selectedCountry, setSelectedCountry] = useState(null); // País selecionado para exibir em um modal

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch(
          "/api/v3.1/all?fields=flags,name,population,region,capital,borders,languages,subregion,tld,currencies"
        ); // Faz uma chamada à API para obter os dados dos países
        if (response.ok) {
          const data = await response.json(); // Converte a resposta em formato JSON
          setCountries(data); // Atualiza a lista de países
          setFilteredCountries(data); // Atualiza a lista de países filtrados
        } else {
          throw new Error("API unavailable"); // Lança um erro se a API estiver indisponível
        }
      } catch (error) {
        console.error("Error:", error); // Exibe o erro no console
        setCountries(data); // Obtém os dados dos países a partir do arquivo JSON local
        setFilteredCountries(data); // Atualiza a lista de países filtrados
      }
    };

    fetchCountriesData(); // Chama a função para buscar os dados dos países ao montar o componente
  }, []);

  const handleRegionChange = (e) => {
    setSelectedRegion(e.value); // Atualiza a região selecionada no dropdown
    if (e.value) {
      const filtered = countries.filter(
        (country) => country.region === e.value
      ); // Filtra os países com base na região selecionada
      setFilteredCountries(filtered); // Atualiza a lista de países filtrados
    } else {
      setFilteredCountries(countries); // Se nenhuma região for selecionada, mostra todos os países
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value); // Atualiza o texto de pesquisa inserido no campo de busca
    if (e.target.value) {
      const filtered = countries.filter((country) =>
        country.name.toLowerCase().includes(e.target.value.toLowerCase())
      ); // Filtra os países com base no texto de pesquisa (ignorando maiúsculas e minúsculas)
      setFilteredCountries(filtered); // Atualiza a lista de países filtrados
    } else {
      setFilteredCountries(countries); // Se nenhum texto de pesquisa for inserido, mostra todos os países
    }
  };

  const handleCardClick = (country) => {
    setSelectedCountry(country); // Define o país selecionado para exibir em um modal
  };

  const hideModal = () => {
    setSelectedCountry(null); // Esconde o modal do país selecionado
  };

  return (
    <div>
      <div className="search">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            className="inputTxt"
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
            key={country.alpha3Code}
            className="country-card"
            onClick={() => handleCardClick(country)}
          >
            <div className="card-content">
              <img src={country.flags.png} alt={country.name} />
              <div className="paragrafo">
                <p>Name: {country.name}</p>
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
