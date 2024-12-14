// src/components/books/BookSort.js
import React from 'react';

const BookSort = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex justify-end">
      <select
        onChange={handleSortChange}
        className="p-2 border rounded"
      >
        <option value="">Sắp xếp theo</option>
        <option value="price-asc">Giá: Thấp đến cao</option>
        <option value="price-desc">Giá: Cao đến thấp</option>
        <option value="title-asc">Tên sách: A-Z</option>
        <option value="title-desc">Tên sách: Z-A</option>
        <option value="rating-desc">Đánh giá: Cao đến thấp</option>
      </select>
    </div>
  );
};

export default BookSort;
