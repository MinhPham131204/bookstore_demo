import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { mockBooks } from '../utils/mockData';

const CheckoutPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const cartItems = [
    { book: mockBooks[0], quantity: 2 },
    { book: mockBooks[1], quantity: 1 }
  ];

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.book.price * item.quantity), 0
    );
  };

  const onSubmit = (data) => {
    console.log(data);
    // Xử lý đặt hàng
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Thông Tin Giao Hàng */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Thông Tin Giao Hàng</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Họ Tên</label>
                <input 
                  {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
                  className="w-full border p-2 rounded"
                  placeholder="Nhập họ tên"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-2">Số Điện Thoại</label>
                <input 
                  {...register('phone', { 
                    required: 'Vui lòng nhập số điện thoại',
                    pattern: {
                      value: /^0[0-9]{9}$/,
                      message: 'Số điện thoại không hợp lệ'
                    }
                  })}
                  className="w-full border p-2 rounded"
                  placeholder="Nhập số điện thoại"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2">Địa Chỉ</label>
              <input 
                {...register('address', { required: 'Vui lòng nhập địa chỉ' })}
                className="w-full border p-2 rounded"
                placeholder="Nhập địa chỉ giao hàng"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2">Ghi Chú</label>
              <textarea 
                {...register('note')}
                className="w-full border p-2 rounded"
                placeholder="Ghi chú đơn hàng (nếu có)"
                rows={3}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Phương Thức Thanh Toán</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mr-2"
                  />
                  Thanh Toán Khi Nhận Hàng (COD)
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    value="banking"
                    checked={paymentMethod === 'banking'}
                    onChange={() => setPaymentMethod('banking')}
                    className="mr-2"
                  />
                  Chuyển Khoản Ngân Hàng
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Tóm Tắt Đơn Hàng */}
        <div className="bg-gray-100 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Đơn Hàng</h2>
          
          {cartItems.map((item) => (
            <div 
              key={item.book.id} 
              className="flex justify-between border-b pb-2 mb-2"
            >
              <div>
                <span>{item.book.title}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span>
                {(item.book.price * item.quantity).toLocaleString()}đ
              </span>
            </div>
          ))}

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

          <button 
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600"
          >
            Xác Nhận Đặt Hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;