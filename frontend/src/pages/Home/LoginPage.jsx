// eslint-disable-next-line no-unused-vars
import React from 'react';
import AuthForm from '../../components/auth/AuthForm';
//import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const handleAuthSuccess = () => {
    // Sau khi đăng nhập thành công, có thể chuyển hướng hoặc lưu thông tin người dùng
    console.log('Đăng nhập thành công!');
    //navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default LoginPage;
