import React from 'react';
import { PropType } from '../types/SearchBox';

function SearchBox({ inputChange, inputValue }: PropType) {
  return (
    <div className="react-datatable__search-box">
      <label>
        Search:
        <input
          type="search"
          onChange={event => inputChange(event.target.value)}
          value={inputValue}
        />
      </label>
    </div>
  );
}

export default SearchBox;
