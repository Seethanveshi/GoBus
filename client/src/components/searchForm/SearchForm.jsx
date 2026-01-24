import React, { useState } from 'react';
import CityInputBox from './CityInputBox';
import DateInputBox from './DateInputBox';
import "../../styles/SearchForm.css";

function SearchForm({ onSearch }) {
  const [from, setFrom] = useState("Kakinada");
  const [to, setTo] = useState("Hyderabed");
  const [date, setDate] = useState("2026-01-23");

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="search-form-wrapper">
      <div className="search-container">

        <div className="input-section">
          <CityInputBox label="From" value={from} onChange={setFrom} icon="bus" />
        </div>

        <div className="swap-button-container">
          <button className="swap-btn" onClick={swapCities}>
            ⇄
          </button>
        </div>

        <div className="input-section border-left">
          <CityInputBox label="To" value={to} onChange={setTo} icon="bus" />
        </div>

        <div className="input-section border-left date-section">
          <DateInputBox value={date} onChange={setDate} />
        </div>

        <button className="search-submit-btn" onClick={() => onSearch({ from, to, date })}>
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchForm;