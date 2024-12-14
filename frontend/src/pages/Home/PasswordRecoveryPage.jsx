// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PasswordRecoveryPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!email) {
      setError('Vui lòng nhập email');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    if (newPassword.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    // Simulate password recovery process
    try {
      // In a real app, you would call an API here
      console.log('Recovering password for:', email);
      setSuccess('Khôi phục mật khẩu thành công!');
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  const handleBackToLogin = () => {
    navigate('/login'); // Điều hướng về trang đăng nhập
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {success ? 'Thành Công' : 'Khôi Phục Mật Khẩu'}
        </h2>
        
        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập email của bạn"
                  required
                />
              </div>
            </div>

            {/* New Password Input */}
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Mật Khẩu Mới
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập mật khẩu mới"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Xác Nhận Mật Khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nhập lại mật khẩu mới"
                  required
                  minLength={8}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Khôi Phục Mật Khẩu
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {/* Success Message */}
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative text-center" role="alert">
              Khôi phục mật khẩu thành công! Vui lòng đăng nhập bằng mật khẩu mới.
            </div>

            {/* Back to Login Button */}
            <button
              onClick={handleBackToLogin}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Quay lại Đăng Nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;