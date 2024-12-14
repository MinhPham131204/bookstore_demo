/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  // Kiểm tra nếu book có thuộc tính bookImages (đã chọn danh mục) hay chỉ có image (chưa chọn danh mục)
  let bookImage = 'default-image-url.jpg'; // Mặc định nếu không có ảnh

  if (book.bookImages && Array.isArray(book.bookImages) && book.bookImages.length > 0) {
    // Nếu sách đã chọn danh mục và có ít nhất 1 ảnh
    bookImage = book.bookImages[0].image;
  } else if (book.image) {
    // Nếu sách chưa chọn danh mục và có thuộc tính image
    bookImage = book.image;
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col transition-all hover:shadow-lg">
      <Link to={`/book/${book.bookID}`}>
        <img 
          src={bookImage} 
          alt={book.title} 
          className="w-full h-64 object-cover rounded-t-lg"
        />
      </Link>
      
      <div className="mt-4 flex-grow">
        <Link to={`/book/${book.bookID}`}>
          <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
        </Link>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-blue-600">
          {book.price.toLocaleString()}đ
        </span>
        <div className="flex space-x-2">
          <button 
            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart size={20} />
          </button>
          <button 
            className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200"
            title="Thêm vào yêu thích"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
