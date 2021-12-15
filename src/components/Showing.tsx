import React from 'react';
import { FormEvent } from 'react';
import { PropType } from '../types/Showing';

function Showing({ options, onSelect }: PropType) {
  // Pass selected value to parent
  const handleSelect = (event: FormEvent<HTMLSelectElement>) => {
    onSelect(Number(event.currentTarget.value));
  };

  return (
    <div className="react-datatable__showing">
      <label>Show </label>
      <select onChange={handleSelect}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span>entries</span>
    </div>
  );
}

export default Showing;
