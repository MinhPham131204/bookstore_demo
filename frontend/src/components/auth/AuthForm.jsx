/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Lock, Mail, User, Phone } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To show error message from backend

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'email': setEmail(value); break;
      case 'password': 
        setPassword(value);
        setPasswordError(''); 
        break;
      case 'confirmPassword': 
        setConfirmPassword(value);
        setPasswordError('');
        break;
      case 'name': setName(value); break;
      case 'phone': setPhone(value); break;
      default: break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password and confirm password for registration
    if (!isLogin) {
      if (password !== confirmPassword) {
        setPasswordError('Mật khẩu không khớp');
        return;
      }
      
      if (password.length < 6) {
        setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }
    }

    const userData = { email, password, name, phone };
    
    try {
      let response;
      if (isLogin) {
        // Login request
        response = await axios.post('/api/login/validateUser', { email, hashPassword: password });
      } else {
        // Register request
        response = await axios.post('/api/login/createUser', userData);
      }
      
      if (response.status === 200) {
        onAuthSuccess();
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Show backend error message
        setErrorMessage(error.response.data.message || 'Đã xảy ra lỗi');
      } else {
        // Show generic server error message
        setErrorMessage('Lỗi server, vui lòng thử lại');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-center text-white">
          <h2 className="text-3xl font-bold">
            {isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
          </h2>
        </div>
  
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          {/* Register Fields */}
          {!isLogin && (
            <div className="flex space-x-4">
              <div className="relative w-1/2">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={handleChange}
                  className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
  
              <div className="relative w-1/2">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  title="Số điện thoại phải có 10 chữ số"
                  className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          )}
  
          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={handleChange}
              className="w-full px-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          {/* Confirm Password Field (only for Register) */}
          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={confirmPassword}
                onChange={handleChange}
                className={`w-full px-12 py-3 border rounded-lg focus:outline-none focus:ring-2 
                  ${passwordError 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'}`}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
          )}
  
          {/* Error message from backend */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
          
          {/* Forgot Password Link */}
          {isLogin && (
            <div className="text-right mt-1 mb-3">
              <Link to="/forgotpassword" className="text-sm text-blue-600 hover:underline">
                Quên mật khẩu?
              </Link>
            </div>
          )}
  
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity duration-300 ease-in-out shadow-lg"
          >
              <Link to="/">{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</Link>
          </button>
        </form>
  
        <div className="text-center py-4 bg-gray-50">
          <p className="text-sm text-gray-600">
            {isLogin 
              ? 'Chưa có tài khoản? ' 
              : 'Đã có tài khoản? '}
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-blue-600 hover:underline font-semibold ml-1"
            >
              {isLogin ? 'Đăng Ký' : 'Đăng Nhập'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};  

export default AuthForm;
