import React, { useState } from 'react';
import CityInputBox from './CityInputBox';
import DateInputBox from './DateInputBox';
import "../../styles/SearchForm.css";
import { useNavigate, useSearchParams } from 'react-router';


function SearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()

  const initialFrom = searchParams.get('source') || 'Kakinada';
  const initialTo = searchParams.get('destination') || 'Hyderabed';
  const initialDate = searchParams.get('date') || new Date().toISOString().split('T')[0];

  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState(initialDate);

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const searchHandler = () => {
      navigate(`/trips?source=${from}&destination=${to}&date=${date}`);
  }

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

        <button className="search-submit-btn" onClick={() => searchHandler()}>
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchForm;