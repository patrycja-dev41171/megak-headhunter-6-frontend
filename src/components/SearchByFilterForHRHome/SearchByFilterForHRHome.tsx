import React, { SyntheticEvent, useState } from 'react';

import './SearchByFilterForHRHome.css';
import SearchIcon from '@mui/icons-material/Search';
import { FilterButton } from '../../common/FilterButton/FilterButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export const SearchByFilterForHRHome = () => {
  const [inputValue, setInputValue] = useState('');
  const useSearchingFilter = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log('It is working');
  };

  return (
    <div className="hr-home__searching">
      <SearchIcon
        sx={{
          color: '#666666',
          height: '15px',
        }}
        className="hr-home__searching__icon"
      />
      <input
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        className="hr-home__searching__input"
        placeholder="Szukaj"
        type="text"
      />
      <FilterButton onClick={useSearchingFilter}>
        <FilterAltIcon
          sx={{
            color: '#4D4D4D',
            height: '15px',
          }}
        />
        Filtrowanie
      </FilterButton>
    </div>
  );
};
