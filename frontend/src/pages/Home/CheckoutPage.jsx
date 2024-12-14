// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  // State quản lý thông tin người dùng
  const [userInfo, setUserInfo] = useState({
    username: '',
    phoneNum: '',
    userAddress: '',
  });

  // State quản lý giỏ hàng
  const [cartItems, setCartItems] = useState([]);

  // State quản lý chi tiết đơn hàng
  const [orderDetails, setOrderDetails] = useState({
    orderAddress: '',
    paymentMethod: 'Thanh toán trực tiếp',
    province: ''
  });

  // State quản lý trạng thái và lỗi
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect hook để lấy thông tin người dùng và giỏ hàng
  useEffect(() => {
    const fetchCartInfo = async () => {
      try {
        setIsLoading(true);
        
        // Lấy thông tin người dùng
        const userResponse = await axios.get('/api/order/orderInfo');
        setUserInfo({
          username: userResponse.data.username || '',
          phoneNum: userResponse.data.phoneNum || '',
          userAddress: userResponse.data.userAddress || ''
        });

        // Lấy thông tin giỏ hàng
        const cartResponse = await axios.get('/api/cart/all');
        const cartData = cartResponse.data.result || [];
        
        // Lấy thông tin chi tiết sách cho từng item trong giỏ hàng
        const detailedCartItems = await Promise.all(
          cartData.map(async (item) => {
            try {
              const bookResponse = await axios.get(`/api/main-page/book-info/${item.bookID}`);
              return {
                ...item,
                bookName: bookResponse.data.title,
                bookPrice: bookResponse.data.price
              };
            } catch (bookError) {
              console.error('Lỗi lấy thông tin sách', bookError);
              return {
                ...item,
                bookName: 'Sách không xác định',
                bookPrice: 0
              };
            }
          })
        );

        setCartItems(detailedCartItems);
        
        // Tính tổng giá trị đơn hàng
        const total = detailedCartItems.reduce((sum, item) => {
          return sum + ((item.bookPrice || 0) * (item.quantity || 0));
        }, 0);
        
        setTotalPrice(total);
        setError(null);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin', error);
        setError('Không thể tải thông tin đơn hàng');
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartInfo();
  }, []);

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Xác nhận đơn hàng
  // eslint-disable-next-line no-unused-vars
  const handleConfirmOrder = async () => {
    try {
      // Kiểm tra giỏ hàng có sản phẩm không
      if (cartItems.length === 0) {
        alert('Giỏ hàng trống');
        return;
      }

      // Tạo dữ liệu đơn hàng
      // const orderData = {
      //   customerID: 5,  // Thay thế ID cố định
      //   province: "TP.HCM",
      //   orderAddress: orderDetails.orderAddress || userInfo.userAddress,
      //   deliveryStatus: "Đang vận chuyển",
      //   paymentMethod: orderDetails.paymentMethod,
      //   deliveryFee: 1
      //   // orderItems: cartItems.map(item => ({
      //   //   bookID: item.bookID,
      //   //   quantity: item.quantity,
      //   //   price: item.bookPrice
      //   // }))
      // };
      const response = await fetch('/api/order/confirmOrder', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerID: 5,  // Thay thế ID cố định
              province: "TP.HCM",
              orderAddress: orderDetails.orderAddress || userInfo.userAddress,
              //deliveryStatus: "Đang vận chuyển",
              paymentMethod: orderDetails.paymentMethod,
              deliveryFee: 1,
            }),
          });

          if (response.ok) {
            const responseBody = await response.text(); // Get response as text first
            if (responseBody) {
              const jsonResponse = JSON.parse(responseBody); // Parse only if there is content
              return { success: true, data: jsonResponse };
            } else {
              console.error('Empty response body');
              throw new Error('No data returned from the server');
            }
          } else {
            const errorBody = await response.text();
            const errorResult = errorBody ? JSON.parse(errorBody) : {};
            throw new Error(errorResult.error || 'Lỗi khi thêm vào giỏ hàng');
          }
    } catch (err) {
          console.error('Error updating quantity', err);
          return { success: false, error: err.message }; // Sửa lỗi: sử dụng 'err.message' thay vì 'error.message'
    }
  };
  

  // Render trạng thái loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Render lỗi
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  // Render khi giỏ hàng trống
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Giỏ hàng của bạn đang trống
      </div>
    );
  }

  // Render trang xác nhận đơn hàng
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Xác Nhận Đơn Hàng</h1>
      
      {/* Thông tin giao hàng */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Thông Tin Giao Hàng</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Tên người nhận */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tên Người Nhận
            </label>
            <input
              type="text"
              value={userInfo.username}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
          
          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số Điện Thoại
            </label>
            <input
              type="text"
              value={userInfo.phoneNum}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        </div>

        {/* Địa chỉ giao hàng */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Địa Chỉ Nhận Hàng
          </label>
          <input
            type="text"
            name="orderAddress"
            defaultValue={userInfo.userAddress}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Nhập địa chỉ giao hàng"
          />
        </div>

        {/* Phương thức thanh toán */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phương Thức Thanh Toán
          </label>
          <select
            name="paymentMethod"
            value={orderDetails.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="Thanh toán trực tiếp">Thanh toán trực tiếp</option>
            <option value="Ví điện tử">Ví điện tử</option>
            <option value="Internet Banking">Internet Banking</option>
          </select>
        </div>
      </div>

      {/* Chi tiết đơn hàng */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Chi Tiết Đơn Hàng</h2>
        
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-3">Sách</th>
              <th className="text-right py-2 px-3">Số Lượng</th>
              <th className="text-right py-2 px-3">Đơn Giá</th>
              <th className="text-right py-2 px-3">Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-3">{item.bookName || 'Sách không xác định'}</td>
                <td className="text-right py-2 px-3">{item.quantity || 0}</td>
                <td className="text-right py-2 px-3">{(item.bookPrice || 0).toLocaleString()}đ</td>
                <td className="text-right py-2 px-3">
                  {((item.bookPrice || 0) * (item.quantity || 0)).toLocaleString()}đ
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right font-bold py-2 px-3">Phí vận chuyển:</td>
              <td className="text-right font-bold py-2 px-3">30,000đ</td>
            </tr>
            <tr>
              <td colSpan="3" className="text-right font-bold py-2 px-3">Tổng Cộng:</td>
              <td className="text-right font-bold py-2 px-3">
                {(totalPrice + 30000).toLocaleString()}đ
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Nút xác nhận */}
      <div className="flex justify-end">
        <button
          onClick={() => alert("Đặt hàng thành công!")}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
        >
          <Link to="/account">Xác Nhận Đặt Hàng</Link>
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;