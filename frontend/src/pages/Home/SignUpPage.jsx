// eslint-disable-next-line no-unused-vars
import React from 'react';
import AuthForm from '../../components/auth/AuthForm';

const SignUpPage = () => {
  const handleAuthSuccess = () => {
    // Sau khi đăng ký thành công, có thể chuyển hướng hoặc lưu thông tin người dùng
    console.log('Đăng ký thành công!');
    window.location.href = '/';

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <AuthForm onAuthSuccess={handleAuthSuccess} />
    </div>
  );
};

export default SignUpPage;
