// src/components/books/BookFilter.js
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
const BookFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  // eslint-disable-next-line no-unused-vars
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    onFilterChange({ category: e.target.value, priceRange });
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    onFilterChange({ category: selectedCategory, priceRange: e.target.value });
  };

  return (
    <div className="flex flex-col space-y-4">
      <select
        value={priceRange}
        onChange={handlePriceRangeChange}
        className="p-2 border rounded"
      >
        <option value="">Chọn khoảng giá</option>
        <option value="0-100000">0 - 100,000 VND</option>
        <option value="100000-200000">100,000 - 200,000 VND</option>
        <option value="200000-300000">200,000 - 300,000 VND</option>
        <option value="300000-400000">300,000 - 400,000 VND</option>
        {/* Thêm các tùy chọn khác */}
      </select>
    </div>
  );
};

export default BookFilter;
