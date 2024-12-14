// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice'; // Import action addToCart
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { getBookInfo } from '../../services/bookService'; // Import hàm getBookInfo
import { addToCart } from '../../services/cardService'; // Import API service

const BookDetailPage = () => {
  const { id } = useParams();
  console.log('Book ID:', id);
  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartSuccess, setCartSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getBookInfo(id)
      .then(data => {
        console.log("Book data:", data); // Log the data here
        setBook(data);
      })
      .catch(error => {
        console.error("Error fetching book data:", error);
        alert("Không thể tải dữ liệu sách.");
      });
  }, [id]);

  // eslint-disable-next-line no-unused-vars
  const categoryID = book?.category?.categoryID || 'Chưa có ID thể loại';
  const averageRating = Array.isArray(book?.rating) && book.rating.length > 0
    ? book.rating[0]?.averageRating || 'Chưa có đánh giá'
    : 'Chưa có đánh giá';

  // Hàm để thêm sách vào giỏ hàng và gọi API backend
  const handleAddToCart = async () => {
    if (quantity > book.stockQuantity) {
      alert("Số lượng bạn chọn vượt quá số lượng có sẵn!");
      return;
    }

    try {
      // Gọi API để thêm sách vào giỏ hàng
      const response = await addToCart(book.bookID, quantity);
      if (response && response.success) {
        console.log("Sách đã được thêm vào giỏ hàng:", response);
        // Cập nhật Redux với dữ liệu trả về nếu cần
        dispatch({ type: 'ADD_TO_CART', payload: { ...book, quantity } });

        // Hiển thị thông báo thành công
        setCartSuccess(true);
        setTimeout(() => setCartSuccess(false), 3000); // Ẩn thông báo sau 3 giây
      } else {
        alert("Có lỗi xảy ra khi thêm sách vào giỏ hàng.");
      }
    } catch (error) {
      console.error("Không thể thêm sách vào giỏ:", error);
      alert("Có lỗi xảy ra khi thêm sách vào giỏ hàng.");
    }
  };

  if (!book) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Hình ảnh Sách */}
      <div>
        <img 
          src={Array.isArray(book.image) && book.image.length > 0 ? book.image[0] : 'default-image.jpg'} 
          alt={book.title} 
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* Thông tin sách */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                fill={i < Math.floor(averageRating) ? 'currentColor' : 'none'} 
                size={20}
              />
            ))}
          </span>
          <span>{averageRating} | Đã bán {book.soldAmount}+</span>
        </div>

        {/* Các thông tin khác */}
        <p className="mb-6">Tác giả: {book.author}</p>
        <p className="mb-6">Dịch giả: {book.translator}</p>
        <p className="mb-6">Nhà xuất bản: {book.publisher}</p>
        <p className="mb-6">Năm xuất bản: {book.publishYear}</p>
        <p className="mb-6">Số trang: {book.numOfPages}</p>
        <p className="mb-6">Trọng lượng: {book.bookWeight}g</p>
        <p className="mb-6">Số lượng còn lại: {book.stockQuantity}</p>

        {/* Số lượng sách */}
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

        {/* Thêm vào giỏ hàng */}
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

        {/* Hiển thị thông báo thành công */}
        {cartSuccess && (
          <div className="mt-4 text-green-500">Sản phẩm đã được thêm vào giỏ hàng!</div>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
