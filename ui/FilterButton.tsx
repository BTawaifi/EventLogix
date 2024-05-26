import React, { useState, useRef, useEffect } from 'react';
import FilterIcon from './icons/FilterIcon';

interface FilterButtonProps {
  onApplyFilters: (filters: any) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    actorId: '',
    actionId: '',
    dateRange: { startDate: '', endDate: '' },
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleApplyFilters = () => {
    const { startDate, endDate } = filters.dateRange;
    onApplyFilters({ ...filters, startDate, endDate });
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleApplyFilters();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="px-4 py-2 border border-gray-300 border-solid  flex 
    items-center gap-x-1 hover:bg-white m-0 text-gray-700"
        style={{ border: 'revert-layer', margin: 0 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FilterIcon /> FILTER
      </button>
      {isMenuOpen && (
        <div className="absolute mt-2 w-64 bg-white shadow-lg p-4 rounded-lg z-10">
          <div className="mb-2">
            <label>Actor ID:</label>
            <input
              type="text"
              value={filters.actorId}
              onChange={(e) =>
                setFilters({ ...filters, actorId: e.target.value })
              }
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-2">
            <label>Action ID:</label>
            <input
              type="text"
              value={filters.actionId}
              onChange={(e) =>
                setFilters({ ...filters, actionId: e.target.value })
              }
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-2">
            <label>Date Range:</label>
            <input
              type="date"
              value={filters.dateRange.startDate}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: {
                    ...filters.dateRange,
                    startDate: e.target.value,
                  },
                })
              }
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="date"
              value={filters.dateRange.endDate}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  dateRange: { ...filters.dateRange, endDate: e.target.value },
                })
              }
              onKeyDown={handleKeyDown}
              className="w-full border border-gray-300 rounded-md p-2 mt-2"
            />
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
