import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trash2, Plus, Edit } from 'lucide-react';
import { User, ShoppingBag, MapPin, Lock, LogOut, Star} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('Hồ sơ cá nhân');
  const [addresses, setAddresses] = useState([
    { id: 1, address: 'Số nhà 123, Đường ABC, Phường XYZ, TP.HCM' },
    { id: 2, address: 'Số nhà 456, Đường DEF, Phường UVW, TP.HCM' }
  ]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [editingAddressId, setEditingAddressId] = useState(null);

  const mockOrders = [
    {
      id: 'DH001',
      date: '2024-03-15',
      total: 250000,
      status: 'Đã Giao'
    },
    {
      id: 'DH002',
      date: '2024-04-02',
      total: 180000,
      status: 'Đang Xử Lý'
    }
  ];
  const handleAddAddress = (data) => {
    const newAddress = {
      id: editingAddressId || (addresses.length + 1),
      address: `${data.street}, ${data.ward}, ${data.district}, ${data.city}`
    };

    if (editingAddressId) {
      // Update existing address
      setAddresses(addresses.map(addr => 
        addr.id === editingAddressId ? newAddress : addr
      ));
      setEditingAddressId(null);
    } else {
      // Add new address
      setAddresses([...addresses, newAddress]);
    }

    setIsAddingAddress(false);
    reset();
  };

  const handleEditAddress = (address) => {
    // Split the address into components
    const [street, ward, district, city] = address.address.split(', ');

    // Set form values for editing
    setValue('street', street);
    setValue('ward', ward);
    setValue('district', district);
    setValue('city', city);

    setIsAddingAddress(true);
    setEditingAddressId(address.id);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };
  const membershipTiers = [
    {
      name: 'Hạng Vàng',
      description: (
        <ul>
          <li>Quà tặng sinh nhật: 100.000 F-Point</li>
          <li>Ưu đãi freeship và mã giảm giá: 2 lần</li>
          <li>Tỉ lệ tích luỹ F-Point trên giá trị đơn hàng: 1%</li>
        </ul>
      ),
      icon: '🥇',
      color: 'text-yellow-500'
    },
    {
      name: 'Hạng Bạc', 
      description: (
        <ul>
          <li>Quà tặng sinh nhật: x</li>
          <li>Ưu đãi freeship và mã giảm giá: x</li>
          <li>Tỉ lệ tích luỹ F-Point trên giá trị đơn hàng: 0,5%</li>
        </ul>
      ),
      icon: '🥈',
      color: 'text-gray-400'
    },
    {
      name: 'Hạng Kim Cương',
      description: (
        <ul>
          <li>Quà tặng sinh nhật: 300.000 F-Point</li>
          <li>Ưu đãi freeship và mã giảm giá: 5 lần</li>
          <li>Tỉ lệ tích luỹ F-Point trên giá trị đơn hàng: 2%</li>
        </ul>
      ),
      icon: '💎',
      color: 'text-blue-500'
    }
  ];

  const handleLogout = () => {
    // Xử lý logic đăng xuất
    window.location.href = '/login';
    alert('Bạn chắc chắn muốn đăng xuất khỏi tài khoản?'); 
    // Thêm logic chuyển hướng hoặc xóa token ở đây
  };


  const renderContent = () => {
    switch(activeTab) {
      case 'Hồ sơ cá nhân':
        return (
          <form className="space-y-4" onSubmit={handleSubmit(data => console.log(data))}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Họ Tên</label>
                <input 
                  {...register('fullName', { required: 'Vui lòng nhập họ tên' })}
                  className="w-full border p-2 rounded"
                  defaultValue="Nguyễn Văn A"
                />
                {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input 
                  {...register('email', { 
                    required: 'Vui lòng nhập email',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Email không hợp lệ'
                    }
                  })}
                  className="w-full border p-2 rounded"
                  defaultValue="quynh.buiquynh@hcmut.edu.vn"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Giới Tính</label>
                <select 
                  {...register('gender', { required: 'Vui lòng chọn giới tính' })}
                  className="w-full border p-2 rounded"
                  defaultValue=""
                >
                  <option value="" disabled>Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
                {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
              </div>
              <div>
                <label className="block mb-2">Ngày Sinh</label>
                <input 
                  {...register('birthdate', { 
                    required: 'Vui lòng nhập ngày sinh',
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const currentDate = new Date();
                      const minAge = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
                      return selectedDate <= minAge || 'Bạn phải đủ 18 tuổi';
                    }
                  })}
                  type="date"
                  className="w-full border p-2 rounded"
                />
                {errors.birthdate && <p className="text-red-500">{errors.birthdate.message}</p>}
              </div>
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
                defaultValue="0912345678"
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-6 py-2 rounded-full"
            >
              Cập Nhật Thông Tin
            </button>
          </form>
        );
      
      case 'Đơn hàng của tôi':
        return (
          <div className="space-y-4">
            {mockOrders.map(order => (
              <div 
                key={order.id} 
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">Mã Đơn: {order.id}</p>
                  <p>Ngày: {order.date}</p>
                  <p>Tổng Tiền: {order.total.toLocaleString()}đ</p>
                </div>
                <span 
                  className={`px-4 py-2 rounded-full ${order.status === 'Đã Giao' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        );
      
        case 'Địa chỉ':
    return (
      <div className="space-y-4">
        {addresses.map(addr => (
          <div 
            key={addr.id} 
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <p>{addr.address}</p>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleEditAddress(addr)}
                className="text-blue-500 hover:bg-blue-100 p-2 rounded"
              >
                <Edit size={20} />
              </button>
              <button 
                onClick={() => handleDeleteAddress(addr.id)}
                className="text-red-500 hover:bg-red-100 p-2 rounded"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
        
        {!isAddingAddress ? (
          <button 
            onClick={() => {
              setIsAddingAddress(true);
              setEditingAddressId(null);
              reset(); // Clear any previous form values
            }}
            className="w-full flex items-center justify-center border-2 border-dashed border-blue-500 text-blue-500 p-4 rounded-lg hover:bg-blue-50"
          >
            <Plus className="mr-2" /> Thêm Địa Chỉ Mới
          </button>
        ) : (
          <form 
            onSubmit={handleSubmit(handleAddAddress)} 
            className="border p-4 rounded-lg space-y-4"
          >
            <div>
              <label className="block mb-2">Số Nhà & Đường</label>
              <input 
                {...register('street', { required: 'Vui lòng nhập số nhà và đường' })}
                className="w-full border p-2 rounded"
                placeholder="Ví dụ: Số 123 Đường ABC"
              />
              {errors.street && <p className="text-red-500">{errors.street.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Phường/Xã</label>
                <input 
                  {...register('ward', { required: 'Vui lòng nhập phường/xã' })}
                  className="w-full border p-2 rounded"
                  placeholder="Nhập phường/xã"
                />
                {errors.ward && <p className="text-red-500">{errors.ward.message}</p>}
              </div>
              <div>
                <label className="block mb-2">Quận/Huyện</label>
                <input 
                  {...register('district', { required: 'Vui lòng nhập quận/huyện' })}
                  className="w-full border p-2 rounded"
                  placeholder="Nhập quận/huyện"
                />
                {errors.district && <p className="text-red-500">{errors.district.message}</p>}
              </div>
            </div>
            <div>
              <label className="block mb-2">Thành Phố/Tỉnh</label>
              <input 
                {...register('city', { required: 'Vui lòng nhập thành phố/tỉnh' })}
                className="w-full border p-2 rounded"
                placeholder="Nhập thành phố/tỉnh"
              />
              {errors.city && <p className="text-red-500">{errors.city.message}</p>}
            </div>
            <div className="flex space-x-4">
              <button 
                type="submit"
                className="flex-1 bg-blue-500 text-white p-2 rounded-lg"
              >
                {editingAddressId ? 'Cập Nhật Địa Chỉ' : 'Lưu Địa Chỉ'}
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsAddingAddress(false);
                  setEditingAddressId(null);
                  reset();
                }}
                className="flex-1 bg-gray-200 text-gray-700 p-2 rounded-lg"
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    );
      
      case 'Quản lí mật khẩu':
        return (
          <form className="space-y-4" onSubmit={handleSubmit(data => console.log(data))}>
            <div>
              <label className="block mb-2">Mật Khẩu Cũ</label>
              <input 
                {...register('oldPassword', { required: 'Vui lòng nhập mật khẩu cũ' })}
                type="password"
                className="w-full border p-2 rounded"
              />
              {errors.oldPassword && <p className="text-red-500">{errors.oldPassword.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Mật Khẩu Mới</label>
              <input 
                {...register('newPassword', { required: 'Vui lòng nhập mật khẩu mới' })}
                type="password"
                className="w-full border p-2 rounded"
              />
              {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
            </div>
            <div>
              <label className="block mb-2">Xác Nhận Mật Khẩu Mới</label>
              <input 
                {...register('confirmNewPassword', { 
                  required: 'Vui lòng xác nhận mật khẩu mới',
                  validate: value => value === watch('newPassword') || 'Mật khẩu không khớp'
                })}
                type="password"
                className="w-full border p-2 rounded"
              />
              {errors.confirmNewPassword && <p className="text-red-500">{errors.confirmNewPassword.message}</p>}
            </div>
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-6 py-2 rounded-full"
            >
              Đổi Mật Khẩu
            </button>
          </form>
        );
        case 'Ưu Đãi Thành Viên':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Ưu Đãi Thành Viên</h2>
            {membershipTiers.map((tier, index) => (
              <div 
                key={index} 
                className="border p-6 rounded-lg flex items-center space-x-4"
              >
                <div className={`text-6xl ${tier.color}`}>
                  {tier.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${tier.color}`}>
                    {tier.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {tier.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center mb-4">
        <button 
          className={`px-4 py-2 rounded-tl-lg rounded-bl-lg ${activeTab === 'Hồ sơ cá nhân' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('Hồ sơ cá nhân')}
        >
          <User className="inline mr-2" /> Hồ sơ cá nhân
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'Đơn hàng của tôi' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('Đơn hàng của tôi')}
        >
          <ShoppingBag className="inline mr-2" /> Đơn hàng của tôi
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'Địa chỉ' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('Địa chỉ')}
        >
          <MapPin className="inline mr-2" /> Địa chỉ
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'Ưu Đãi Thành Viên' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('Ưu Đãi Thành Viên')}
        >
          <Star className="inline mr-2" /> Ưu Đãi Thành Viên
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === 'Quản lí mật khẩu' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveTab('Quản lí mật khẩu')}
        >
          <Lock className="inline mr-2" /> Quản lí mật khẩu
        </button>
        <button 
          className="px-4 py-2 bg-red-500 text-white rounded-tr-lg rounded-br-lg"
          onClick={handleLogout}
        >
          <LogOut className="inline mr-2" />Đăng Xuất
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default AccountPage;