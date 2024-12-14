// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart data from the backend
  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart/all');
      const data = await response.json();
      console.log('Fetch Cart Data:', data);

      if (data.result) {
        setCartItems(data.result);
        setTotalPrice(data.totalPrice);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Error fetching cart data', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (bookID, newQuantity) => {
    if (newQuantity <= 0) return;

    try {
      const response = await fetch('/api/cart/addBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookID,
          quantity: newQuantity // Sử dụng đúng thuộc tính 'quantity'
        }),
      });

      if (response.ok) {
        // Gọi lại fetchCart để lấy dữ liệu giỏ hàng mới nhất
        await fetchCart();
        return { success: true };
      } else {
        const result = await response.json();
        throw new Error(result.error || 'Lỗi khi thêm vào giỏ hàng');
      }
    } catch (err) {
      console.error('Error updating quantity', err);
      return { success: false, error: err.message }; // Sửa lỗi: sử dụng 'err.message' thay vì 'error.message'
    }
  };

  // Remove item from cart
  const removeItem = async (bookID) => {
    try {
      console.log(`Removing bookID: ${bookID}`);
      const response = await fetch(`/api/cart/delete/${bookID}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        // Cập nhật lại state cartItems ngay sau khi xóa thành công
        // setCartItems((prevItems) =>
        //   prevItems.filter((item) => item.bookID !== bookID)
        // );
        // setTotalPrice((prevTotal) => 
        //   prevTotal - cartItems.find(item => item.bookID === bookID).Book.price * cartItems.find(item => item.bookID === bookID).quantity
        // );
        console.log('Item removed successfully');

      } else {
        const result = await response.json();
        throw new Error(result.error || 'Lỗi khi xóa sản phẩm khỏi giỏ hàng');
      }
    } catch (err) {
      console.error('Error removing item from cart:', err);
      //alert('Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?');
    } 
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
            {cartItems.map((item) => (
              <div 
                key={item.bookID} 
                className="flex items-center border-b pb-4"
              >
                {/* Kiểm tra nếu có trường coverImage thì render ảnh */}
                {item.Book.coverImage && (
                  <img 
                    src={item.Book.coverImage} 
                    alt={item.Book.title} 
                    className="w-24 h-32 object-cover mr-6"
                  />
                )}
                
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{item.Book.title}</h3>
                  <p className="text-gray-600">{item.Book.author}</p>
                  <p className="font-bold text-blue-600">
                    {item.Book.price ? item.Book.price.toLocaleString() : "N/A"}đ
                  </p>
                </div>

                <div className="flex items-center mr-6">
                  <button 
                    onClick={() => updateQuantity(item.bookID, item.quantity - 1)}
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
                    onClick={() => updateQuantity(item.bookID, item.quantity + 1)}
                    className="bg-gray-200 p-2 rounded-r"
                  >
                    <Plus size={20} />
                  </button>
                </div>

                <button 
                  onClick={() => removeItem(item.bookID)}
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
                <span>{totalPrice.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span>Phí Vận Chuyển</span>
                <span>30,000đ</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2">
                <span>Tổng Cộng</span>
                <span className="text-blue-600">
                  {(totalPrice + 30000).toLocaleString()}đ
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
