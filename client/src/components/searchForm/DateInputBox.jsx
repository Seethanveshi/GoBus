import React from 'react';
import '../../styles/SearchForm.css';

function DateInputBox({ value, onChange }) {
  
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleToday = () => {
    const today = new Date();
    onChange(formatDate(today));
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    onChange(formatDate(tomorrow));
  };

  return (
    <div className="input-box-inner">
      <div className="text-fields">
        <label>Date of Journey</label>
        <div className="date-display-row">
          <input 
            type="date" 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
            className="date-input-text"
          />
        </div>
      </div>
      <div className="quick-dates">
        <button 
          type="button" 
          className="q-date" 
          onClick={handleToday}
        >
          Today
        </button>

        <button 
          type="button" 
          className="q-date" 
          onClick={handleTomorrow}
        >
          Tomorrow
        </button>
      </div>
    </div>
  );
}

export default DateInputBox;