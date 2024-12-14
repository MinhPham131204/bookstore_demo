import React, { useState } from 'react';
import { mockBooks } from '../utils/mockData';
import BookCard from '../components/common/BookCard';
import { Filter, ArrowUpDown } from 'lucide-react';
import BookFilter from '../components/books/BookFilter';
import BookSort from '../components/books/BookSort';

const BookListPage = () => {
  const [books, setBooks] = useState(mockBooks);
  const [filteredBooks, setFilteredBooks] = useState(mockBooks);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    "Văn Học", "Kinh Tế", "Khoa Học", "Kỹ Năng"
  ];

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleFilterChange = (filters) => {
    let filtered = mockBooks;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(book => selectedCategories.includes(book.category));
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(book => book.price >= min && book.price <= max);
    }

    setFilteredBooks(filtered);
  };

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    let sortedBooks = [...filteredBooks];

    switch (criteria) {
      case 'price-asc':
        sortedBooks.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedBooks.sort((a, b) => b.price - a.price);
        break;
      case 'title-asc':
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        sortedBooks.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredBooks(sortedBooks);
  };

  return (
    <div className="flex">
      {/* Sidebar Filters */}
      <div className="w-64 pr-6 border-r">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Filter className="mr-2" /> Bộ Lọc
        </h3>

        {/* Danh Mục */}
        <div className="mb-6">
          <h4 className="font-semibold mb-2">Danh Mục</h4>
          {categories.map(category => (
            <div key={category} className="flex items-center mb-2">
              <input 
                type="checkbox" 
                id={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="mr-2"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>

        {/* Bộ lọc nâng cao */}
        <BookFilter onFilterChange={handleFilterChange} />
        
        {/* Sắp Xếp */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2 flex items-center">
            <ArrowUpDown className="mr-2" /> Sắp Xếp
          </h4>
          <BookSort onSortChange={handleSortChange} />
        </div>
      </div>

      {/* Danh Sách Sách */}
      <div className="flex-grow pl-6">
        <h1 className="text-2xl font-bold mb-6">
          Danh Sách Sách 
          {selectedCategories.length > 0 && 
            ` (${selectedCategories.join(', ')})`}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center text-gray-500">
            Không có sách nào phù hợp
          </div>
        )}
      </div>
    </div>
  );
};

export default BookListPage;
