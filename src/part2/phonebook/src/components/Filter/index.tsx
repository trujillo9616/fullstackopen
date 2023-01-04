import React from "react";

interface FilterProps {
  filter: string;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Filter: React.FC<FilterProps> = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
