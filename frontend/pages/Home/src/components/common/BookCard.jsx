import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col transition-all hover:shadow-lg">
      <Link to={`/book/${book.id}`}>
        <img 
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-64 object-cover rounded-t-lg"
        />
      </Link>
      
      <div className="mt-4 flex-grow">
        <Link to={`/book/${book.id}`}>
          <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
          <p className="text-gray-600 text-sm">{book.author}</p>
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