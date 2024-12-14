// src/components/common/CartIcon.js

import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../redux/cartSlice';

function CartIcon() {
  const cartItemCount = useSelector(selectCartItemsCount); // Lấy tổng số lượng sách trong giỏ

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-shopping-cart"
      >
        <path d="M6 6h15l-1.68 10.37a2 2 0 0 1-1.96 1.63H7.64a2 2 0 0 1-1.96-1.63L4 6z"></path>
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
      </svg>

      {cartItemCount > 0 && (
        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
          {cartItemCount}
        </span>
      )}
    </div>
  );
}

export default CartIcon;
