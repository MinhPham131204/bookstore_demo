import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineViewGrid, HiOutlineBookOpen, HiOutlineStar, HiOutlineChat, 
  HiOutlineClipboardList, HiOutlineCube, HiOutlineTruck, HiOutlineTag, HiOutlineDocumentText, HiKey } from "react-icons/hi"; // Heroicons outline

import avatar from "../../IMG/avatar.png";

const Sidebar = () => {
  const [isSanPhamOpen, setSanPhamOpen] = useState(false);
  const [isDonHangOpen, setDonHangOpen] = useState(false);
  const [isTinTucOpen, setTinTucOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-800 text-white">
      <div className="p-4 text-center">
        <img src={avatar} alt="Admin Avatar" className="rounded-full w-16 h-16 mx-auto" />
        <h2 className="text-lg mt-2">Seller</h2>
        <p className="text-sm text-green-400">Online</p>
      </div>

      <div className="p-4 bg-gray-700 text-center font-bold">
        Taskbar
      </div>

      <nav>
        <ul>
          {/* Dashboard */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer flex items-center">
            <HiOutlineViewGrid className="text-xl mr-4" />
            <Link to="/admin/dashboard" className="flex-grow">Dashboard</Link>
          </li>

          {/* Quản lý tài khoản */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer flex items-center">
            <HiOutlineUser className="text-xl mr-4" />
            <Link to="/admin/account" className="flex-grow">Quản lý Tài Khoản</Link>
          </li>

          {/* Sản phẩm dropdown */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <button 
              className="flex items-center justify-between w-full" 
              onClick={() => setSanPhamOpen(!isSanPhamOpen)}
            >
              <div className="flex items-center">
                <HiOutlineCube className="text-xl mr-4" />
                <span>Sản phẩm</span>
              </div>
              <span>{isSanPhamOpen ? "▲" : "▼"}</span>
            </button>

            {isSanPhamOpen && (
              <ul className="bg-gray-700 pl-8 mt-2">
                <li className="py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                  <HiOutlineBookOpen className="text-xl mr-2" />
                  <Link to="/admin/products" className="flex-grow">Sách</Link>
                </li>
                <li className="py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                  <HiOutlineStar className="text-xl mr-2" />
                  <span>Đánh giá</span>
                </li>
                <li className="py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                  <HiOutlineChat className="text-xl mr-2" />
                  <span>Bình luận</span>
                </li>
              </ul>
            )}
          </li>

          {/* Tin tức */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <button 
              className="flex items-center justify-between w-full" 
              onClick={() => setTinTucOpen(!isTinTucOpen)}
            >
              <div className="flex items-center">
                <HiOutlineDocumentText className="text-xl mr-4" />
                <span>Tin tức</span>
              </div>
              <span>{isTinTucOpen ? "▲" : "▼"}</span>
            </button>

            {isTinTucOpen && (
              <ul className="bg-gray-700 pl-8 mt-2">
                <li className="py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                  <HiKey className="text-xl mr-2" />
                  <Link to="/admin/baiviet" className="flex-grow">Bài Viết</Link>
                </li>
                <li className="py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                  <HiOutlineChat className="text-xl mr-2" />
                  <span>Bình luận</span>
                </li>
              </ul>
            )}
          </li>

          {/* Đơn hàng */}
         <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <button 
              className="flex items-center justify-between w-full" 
              onClick={() => setDonHangOpen(!isDonHangOpen)}
            >
              <div className="flex items-center">
                <HiOutlineDocumentText className="text-xl mr-4" />
                <span>Đơn Hàng</span>
              </div>
              <span>{isDonHangOpen ? "▲" : "▼"}</span>
            </button>

            {isDonHangOpen && (
              <ul className="bg-gray-700 pl-8 mt-2">
               
                <li className="py-2 hover:bg-gray-600 cursor-pointer flex items-center">
                  <HiOutlineStar className="text-xl mr-2" />
                  <Link to="/admin/quanlydonhang" className="flex-grow">Quản Lý Đơn Hàng</Link>
                </li>
                
              </ul>
            )}
          </li>

          {/* Kho */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer flex items-center">
            <HiOutlineCube className="text-xl mr-4" />
            <Link to="/admin/kho" className="flex-grow">Kho</Link>
          </li>

          {/* Vận chuyển */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer flex items-center">
            <HiOutlineTruck className="text-xl mr-4" />
            <Link to="/admin/vanchuyen" className="flex-grow">Vận Chuyển</Link>
          </li>

          {/* Khuyến mãi */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer flex items-center">
            <HiOutlineTag className="text-xl mr-4" />
            <Link to="/admin/khuyenmai" className="flex-grow">Khuyến Mãi</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;