// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import BookCard from '../../components/common/BookCard';
import { Filter, ArrowUpDown } from 'lucide-react';
import BookFilter from '../../components/books/BookFilter';
import BookSort from '../../components/books/BookSort';
import { getBooks, getBooksByCategory } from '../../services/bookService';

const BookListPage = () => {
  const [books, setBooks] = useState([]); // Dữ liệu sách lấy từ API
  const [filteredBooks, setFilteredBooks] = useState([]); // Sách đã lọc
  // eslint-disable-next-line no-unused-vars
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // Thêm state để lưu trữ danh mục đang được chọn

  // Lấy danh sách sách từ backend khi component mount
  useEffect(() => {
    getBooks()
      .then(fetchedBooks => {
        if (Array.isArray(fetchedBooks)) {
          setBooks(fetchedBooks);
          setFilteredBooks(fetchedBooks); // Lưu vào filteredBooks để hiển thị ban đầu
        } else {
          console.error('Dữ liệu không phải là mảng:', fetchedBooks);
        }
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu:', error.message));
  }, []);

  // Danh mục sách
  const categories = [
    { id: 3, name: "Ngoại ngữ" },
    { id: 4, name: "Thiếu nhi" },
    { id: 5, name: "Bách khoa tri thức" },
    { id: 6, name: "Kinh tế" },
    { id: 7, name: "Khoa học & Công nghệ" },
    { id: 8, name: "Tâm lý & Kỹ năng sống" },
    { id: 9, name: "Y học & Sức khỏe" },
    { id: 10, name: "Văn học" },
    { id: 11, name: "Ngoại văn" },
  ];

  const fetchBooksByCategory = (categoryID) => {
    getBooksByCategory(categoryID)
      .then(fetchedBooks => {
        if (Array.isArray(fetchedBooks)) {
          setFilteredBooks(fetchedBooks);
        } else {
          console.error('Dữ liệu không phải là mảng:', fetchedBooks);
        }
      })
      .catch(error => console.error('Lỗi khi lấy dữ liệu:', error.message));
  };

  const handleCategoryClick = (categoryID) => {
    fetchBooksByCategory(categoryID);
    setActiveCategory(categoryID); // Cập nhật danh mục đang được chọn
  };

  // eslint-disable-next-line no-unused-vars
  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleFilterChange = (filters) => {
    let filtered = books; // Lọc từ dữ liệu thật lấy từ API

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(book => selectedCategories.includes(book.category));
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(book => book.price >= min && book.price <= max);
    }

    // Đảm bảo filtered là mảng trước khi cập nhật
    if (Array.isArray(filtered)) {
      setFilteredBooks(filtered);
    }
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
            <div
              key={category.id}
              className={`flex items-center mb-2 ${activeCategory === category.id ? 'text-red-700' : ''}`}
            >
              <button
                onClick={() => handleCategoryClick(category.id)}
                className={`text-left ${activeCategory === category.id ? 'text-red-600' : ''}`}
              >
                {category.name}
              </button>
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
        {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={book.bookID || index} book={book} />
          ))
        ) : (
          <div className="text-center text-gray-500">
            Không có sách nào phù hợp
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default BookListPage;
