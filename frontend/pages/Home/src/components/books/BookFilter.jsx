// src/components/books/BookFilter.js
import React, { useState } from 'react';

const BookFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

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
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="p-2 border rounded"
      >
        <option value="">Chọn thể loại</option>
        <option value="Tiểu Thuyết">Tiểu Thuyết</option>
        <option value="Kỹ Năng Sống">Kỹ Năng Sống</option>
        {/* Thêm các tùy chọn khác */}
      </select>

      <select
        value={priceRange}
        onChange={handlePriceRangeChange}
        className="p-2 border rounded"
      >
        <option value="">Chọn khoảng giá</option>
        <option value="0-50000">0 - 50,000 VND</option>
        <option value="50000-100000">50,000 - 100,000 VND</option>
        {/* Thêm các tùy chọn khác */}
      </select>
    </div>
  );
};

export default BookFilter;
