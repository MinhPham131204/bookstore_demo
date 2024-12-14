import React from 'react';
import { Link } from 'react-router-dom';
import { mockBooks } from '../utils/mockData';
import BookCard from '../components/common/BookCard';
import Banner from '../assets/webbanner.png'

const HomePage = () => {
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

      {/* Sách Mới */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Sách Mới Phát Hành</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockBooks.slice(0, 4).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Danh Mục Sách */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Danh Mục Sách</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Văn Học", slug: "van-hoc" },
            { name: "Kinh Tế", slug: "kinh-te" },
            { name: "Khoa Học", slug: "khoa-hoc" },
            { name: "Kỹ Năng", slug: "ky-nang" }
          ].map((category) => (
            <Link 
              key={category.slug}
              to={`/books/${category.slug}`}
              className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Sách Bán Chạy */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Sách Bán Chạy</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mockBooks.slice(0, 4).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;