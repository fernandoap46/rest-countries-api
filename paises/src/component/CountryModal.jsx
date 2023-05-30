import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import data from "../../../data.json";
import ToggleButton from "./ToggleButton";
import "./CountryModal.css";

const CountryModal = ({ country, onHide }) => {
  const [selectedBorder, setSelectedBorder] = useState(null);
  const [borderCountry, setBorderCountry] = useState(null);
  const [isApiUnavailable, setIsApiUnavailable] = useState(false);

  const handleBorderClick = (border) => {
    setSelectedBorder(border);
    const borderCountry = data.find((item) => item.alpha3Code === border);
    if (borderCountry) {
      setBorderCountry(borderCountry);
    } else {
      setBorderCountry(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedBorder(null);
    setBorderCountry(null);
    onHide();
  };

  const renderBorders = () => {
    return country.borders.map((border) => {
      const borderCountry = data.find((item) => item.alpha3Code === border);
      const borderName = borderCountry ? borderCountry.name : border;
      return (
        <Button
          severity="secondary"
          text
          raised
          key={border}
          label={borderName}
          className="button-text"
          onClick={() => handleBorderClick(border)}
        />
      );
    });
  };

  const renderBorderCountryModal = () => {
    if (borderCountry) {
      return (
        <Dialog
          visible={Boolean(borderCountry)}
          header={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ alignSelf: "flex-start", textAlign: "center" }}>
                <p1>Where in the world?</p1>
              </div>
              <div>
                <ToggleButton />
              </div>
            </div>
          }
          style={{ width: "1440px", height: "1025px" }}
          closable={false}
        >
          <div>
            <div>
              <Button
                severity="secondary"
                text
                raised
                icon="pi pi-arrow-left"
                label="Back"
                className="p-button-texta"
                onClick={handleCloseModal}
              />
            </div>
            <div className="corpoModal">
              <div className="imgModal">
                <img
                  src={borderCountry.flags.png}
                  alt={borderCountry.name}
                  style={{
                    marginLeft: "80px",
                    width: "560px",
                    height: "400px",
                  }}
                />
              </div>
              <div className="textModal">
                <div className="namePrincipal">
                  <h2>{borderCountry.name}</h2>
                </div>
                <div className="textModala">
                  <p><strong>Native Name:</strong> {borderCountry.nativeName}</p>
                  <p><strong>Population:</strong> {borderCountry.population}</p>
                  <p><strong>Region:</strong> {borderCountry.region}</p>
                  <p><strong>Capital:</strong> {borderCountry.capital}</p>
                </div>
                <div className="textModalb">
                  <p><strong>Capital:</strong> {borderCountry.capital}</p>
                  <p><strong>Top Level Domain:</strong>{borderCountry.topLevelDomain[0]}</p>
                  <p><strong>Currencies:</strong>{borderCountry.currencies[0].name}</p>
                </div>
                <div className="fronteiraButton">
                  <p><strong>Fronteiras:</strong></p>
                  <div className="borderButtons">{renderBorders()}</div>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      );
    }
    return null;
  };

  return (
    <>
      <Dialog
        visible={Boolean(country)}
        onHide={onHide}
        header={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ alignSelf: "flex-start" }}>
              <p1>Where in the world?</p1>
            </div>
            <div>
              <ToggleButton />
            </div>
          </div>
        }
        modal
        style={{ width: "1440px", height: "1025px" }}
        closable={false}
      >
        <div>
          <div>
            <Button
              severity="secondary"
              text
              raised
              icon="pi pi-arrow-left"
              label="Back"
              className="p-button-texta"
              onClick={handleCloseModal}
            />
          </div>
          <div className="corpoModal">
          <div className="imgModal">
                <img
                  src={country.flags.png}
                  alt={country.name}
                  style={{
                    marginLeft: "80px",
                    width: "560px",
                    height: "400px",
                  }}
                />
              </div>
              <div className="textModal">
                <div className="namePrincipal">
                  <h2>{country.name}</h2>
                </div>
                <div className="textModala">
                  <p><strong>Native Name:</strong> {country.nativeName}</p>
                  <p><strong>Population:</strong> {country.population}</p>
                  <p><strong>Region:</strong> {country.region}</p>
                  <p><strong>Capital:</strong> {country.capital}</p>
                </div>
                <div className="textModalb">
                  <p><strong>Capital:</strong> {country.capital}</p>
                  <p><strong>Top Level Domain:</strong>{country.topLevelDomain[0]}</p>
                  <p><strong>Currencies:</strong>{country.currencies[0].name}</p>
                </div>
                <div className="fronteiraButton">
                  <p><strong>Fronteiras:</strong></p>
                  <div className="borderButtons">{renderBorders()}</div>
                </div>
              </div>
              </div>
        </div>
      </Dialog>

      {isApiUnavailable && (
        <div className="api-unavailable">
          <p>The API is currently unavailable. Using local data.</p>
        </div>
      )}

      {renderBorderCountryModal()}
    </>
  );
};

export default CountryModal;
