import React from 'react';
import conturePointData from "@/public/ConturePoint.json";

interface SearchBarProps {
    onSelect: (info: any, coordinates: any, index: any) => void;
    selectedOption: any;
    onOptionChange: (option: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSelect, selectedOption, onOptionChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        onOptionChange(selectedValue);
        const selectedIndex = parseInt(selectedValue.split(' ')[2]) - 1;
        const selectedPoint = conturePointData.data[selectedIndex];
        onSelect(selectedPoint.info, selectedPoint.coordinates, selectedIndex + 1);
    };

  return (
    <div>
      <select className='px-6 py-2 rounded-xl' value={selectedOption} onChange={handleChange}>
        <option value="">Pilih Titik Pengujian</option>
        {conturePointData.data.map((_, index) => (
          <option key={index} value={`Titik Pengujian ${index + 1}`}>
            Titik Pengujian {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;