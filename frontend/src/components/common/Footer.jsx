// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Thông Tin Liên Hệ */}
        <div>
          <h3 className="font-bold mb-4">Liên Hệ</h3>
          <p>Địa chỉ: 123 Sách Hay, Quận 1, TP.HCM</p>
          <p>Email: support@bookstore.com</p>
          <p>Điện thoại: 0123 456 789</p>
        </div>

        {/* Liên Kết Nhanh */}
        <div>
          <h3 className="font-bold mb-4">Liên Kết Nhanh</h3>
          <ul>
            <li><a href="/about">Giới Thiệu</a></li>
            <li><a href="/contact">Liên Hệ</a></li>
            <li><a href="/policy">Chính Sách</a></li>
          </ul>
        </div>

        {/* Mạng Xã Hội */}
        <div>
          <h3 className="font-bold mb-4">Kết Nối Với Chúng Tôi</h3>
          <div className="flex space-x-4">
            <Facebook className="text-blue-500" />
            <Instagram className="text-pink-500" />
            <Twitter className="text-blue-400" />
          </div>
        </div>
      </div>

      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        © 2024 BookStore. Bản Quyền Thuộc Về BookStore.
      </div>
    </footer>
  );
};

export default Footer;