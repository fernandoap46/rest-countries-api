import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const CountryModal = ({ country, onHide }) => {
  return (
    <Dialog
    visible={Boolean(country)}
      onHide={onHide}
      header={country.name.common}
      modal
      style={{ width: "50vw" }}
      footer={
        <div>
          <Button label="Close" icon="pi pi-times" className="p-button-text" onClick={onHide} />
        </div>
      }
    >
      <div>
        <img src={country.flags.png} alt={country.name.common} />
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital}</p>
      </div>
    </Dialog>
  );
};

export default CountryModal;

  
  