import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const BookDetailPage = () => {
  const { id } = useParams(); // Lấy id từ URL params
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Gọi API và lấy dữ liệu theo bookID
        const response = await fetch(`/main-page/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Tìm sách dựa trên bookID từ dữ liệu trả về
        const bookData = data.find(book => book.bookID === parseInt(id));
        if (bookData) {
          setBook(bookData); // Cập nhật state với dữ liệu sách
        } else {
          setError('Sách không tồn tại');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message); // Lỗi khi fetch
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]); // Chạy lại khi `id` thay đổi

  const handleAddToCart = () => {
    if (book) {
      dispatch(addToCart({ ...book, quantity }));
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>Sách không tồn tại</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Hình Ảnh Sách */}
      <div>
        <img 
          src={book.image} // Lấy ảnh từ API
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Thông Tin Sách */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                fill={i < Math.floor(book.rating) ? 'currentColor' : 'none'}
                size={20}
              />
            ))}
          </span>
          <span>({book.rating}) | Đã bán 1000+</span>
        </div>

        <div className="text-3xl font-bold text-blue-600 mb-6">
          {book.price.toLocaleString()}đ
        </div>

        <div className="flex items-center mb-6">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="bg-gray-200 px-4 py-2 rounded-l"
          >
            -
          </button>
          <input 
            type="number" 
            value={quantity} 
            readOnly
            className="w-16 text-center border py-2"
          />
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="bg-gray-200 px-4 py-2 rounded-r"
          >
            +
          </button>
        </div>

        <div className="flex space-x-4">
          <button 
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-6 py-3 rounded-full flex items-center hover:bg-blue-600"
          >
            <ShoppingCart className="mr-2" /> Thêm Vào Giỏ Hàng
          </button>
          <button 
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full flex items-center hover:bg-gray-300"
          >
            <Heart className="mr-2" /> Yêu Thích
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
