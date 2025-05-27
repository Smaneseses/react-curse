import React from 'react';

import styles from './Search.module.scss';

function Search({ searchValue, setSearchValue }) {
  console.log(searchValue);
  return (
    <div className={styles.root}>
      <svg
        className={styles.searchIcon}
        enable-background="new 0 0 32 32"
        id="Glyph"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          id="XMLID_223_"
        />
      </svg>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <svg
          onClick={() => setSearchValue('')}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none">
          <path
            d="M6.00015 4.58569L12.0002 10.5857L18.0002 4.58569L19.4144 5.99991L13.4144 11.9999L19.4144 17.9999L18.0002 19.4141L12.0002 13.4141L6.00015 19.4141L4.58594 17.9999L10.5859 11.9999L4.58594 5.99991L6.00015 4.58569Z"
            fill="black"
          />
        </svg>
      )}
    </div>
  );
}

export default Search;
