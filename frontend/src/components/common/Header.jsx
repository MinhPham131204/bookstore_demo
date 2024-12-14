// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Search, ShoppingCart, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';  // Thêm useSelector
import { selectCartItemsCount } from '../../redux/cartSlice'; 
import './Header.css';// Import selector

const Header = () => {
  // Lấy tổng số lượng sách trong giỏ hàng từ Redux store
  const cartItemCount = useSelector(selectCartItemsCount);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          <p className='under-header'>BookShop.<span>vn</span></p>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-4 relative">
          <input 
            type="text" 
            placeholder="Tìm kiếm sách..." 
            className="w-full px-4 py-2 border rounded-full"
          />
          <Search 
            className="absolute right-3 top-3 text-gray-500" 
            size={20} 
          />
        </div>

        {/* Icons */}
        <div className="flex space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {/* Hiển thị số lượng sách trong giỏ */}
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/account">
            <User size={24} />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
