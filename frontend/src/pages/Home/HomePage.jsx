// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../../components/common/BookCard';
import Banner from '../../assets/webbanner.png';
// import { getBooksByCategory } from '../services/bookService';

const HomePage = () => {
  const [newBooks, setNewBooks] = useState([]);  // Sách mới phát hành
  const [bestSellingBooks, setBestSellingBooks] = useState([]);  // Sách bán chạy
  

  useEffect(() => {
    // Hàm gọi API để lấy sách mới phát hành (categoryID = 5)
    const fetchBooks = async (categoryID, setBooks) => {
      try {
        const response = await axios.get(`/api/main-page/${categoryID}`);
        setBooks(response.data);
      } catch (error) {
        console.error(`Error fetching books for category ${categoryID}:`, error);
      }
    };

    // Gọi API để lấy sách mới phát hành (categoryID = 5)
    fetchBooks(5, setNewBooks);

    // Gọi API để lấy sách bán chạy (categoryID = 10)
    fetchBooks(8, setBestSellingBooks);

    
  }, []); // Chạy một lần khi component mount

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="relative h-96 overflow-hidden rounded-lg">
        <img 
          src={Banner} 
          alt="Book Store Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Khám Phá Thế Giới Sách
            </h1>
            <p className="text-xl mb-6">
              Hàng ngàn đầu sách mới nhất, ưu đãi hấp dẫn
            </p>
            <Link 
              to="/books" 
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600"
            >
              Khám Phá Ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Sách Mới Phát Hành */}
      <section>
      <h2 className="text-2xl font-bold mb-6">Sách Mới Phát Hành</h2>
      <div className="flex overflow-x-auto space-x-4">
        {newBooks.slice(0, 20).map(book => ( 
            <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>

      {/* Danh Mục Sách */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Danh Mục Sách</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {/* Bạn có thể thêm các danh mục khác ở đây */}
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Ngoại ngữ</Link>
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Thiếu nhi</Link>
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Bách khoa tri thức</Link>
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Kinh tế</Link>
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Khoa học & Công nghệ</Link>
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Tâm lý & Kỹ năng sống</Link>
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Y học & Sức khỏe</Link>
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Văn học</Link>
          <Link to="/books" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center">Ngoại văn</Link>
        </div>
      </section>

      {/* Sách Bán Chạy */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Sách Bán Chạy</h2>
        <div className="flex overflow-x-auto space-x-4">
          {bestSellingBooks.slice(0, 20).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
