import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

const SearchField = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 600),
    [onSearch]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder="Search name, email or action..."
      className="w-full p-2 border border-gray-300 bg-transparent focus:outline-none rounded-l-md focus:bg-white"
    />
  );
};

export default SearchField;
