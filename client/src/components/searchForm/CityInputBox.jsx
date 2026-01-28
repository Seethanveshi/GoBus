// import { BusFront } from 'lucide-react';
import '../../styles/SearchForm.css';

function CityInputBox({ label, value, onChange }) {
  return (
    <div className="input-box-inner">
      {/* <BusFront className="input-icon" size={24} /> */}
      <div className="text-fields">
        <label>{label}</label>
        <input className='city-input-field'
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder="Enter City"
        />
      </div>
    </div>
  );
}

export default CityInputBox;