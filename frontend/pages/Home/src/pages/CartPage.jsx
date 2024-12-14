import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { mockBooks } from '../utils/mockData';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { 
      book: mockBooks[0], 
      quantity: 2 
    },
    { 
      book: mockBooks[1], 
      quantity: 1 
    }
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.book.price * item.quantity), 0
    );
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    if (newQuantity > 0) {
      updatedCart[index].quantity = newQuantity;
      setCartItems(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ Hàng</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl mb-4">Giỏ hàng của bạn đang trống</p>
          <Link 
            to="/books" 
            className="bg-blue-500 text-white px-6 py-3 rounded-full"
          >
            Tiếp Tục Mua Sắm
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Danh Sách Sản Phẩm */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div 
                key={item.book.id} 
                className="flex items-center border-b pb-4"
              >
                <img 
                  src={item.book.coverImage} 
                  alt={item.book.title} 
                  className="w-24 h-32 object-cover mr-6"
                />
                
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{item.book.title}</h3>
                  <p className="text-gray-600">{item.book.author}</p>
                  <p className="font-bold text-blue-600">
                    {item.book.price.toLocaleString()}đ
                  </p>
                </div>

                <div className="flex items-center mr-6">
                  <button 
                    onClick={() => updateQuantity(index, item.quantity - 1)}
                    className="bg-gray-200 p-2 rounded-l"
                  >
                    <Minus size={20} />
                  </button>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    readOnly 
                    className="w-16 text-center border py-2"
                  />
                  <button 
                    onClick={() => updateQuantity(index, item.quantity + 1)}
                    className="bg-gray-200 p-2 rounded-r"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button 
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>

          {/* Tóm Tắt Đơn Hàng */}
          <div className="bg-gray-100 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-bold mb-4">Tóm Tắt Đơn Hàng</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Tạm Tính</span>
                <span>{calculateTotal().toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí Vận Chuyển</span>
                <span>30,000đ</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Tổng Cộng</span>
                <span className="text-blue-600">
                  {(calculateTotal() + 30000).toLocaleString()}đ
                </span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="w-full bg-blue-500 text-white py-3 rounded-full block text-center hover:bg-blue-600"
            >
              Tiến Hành Thanh Toán
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;