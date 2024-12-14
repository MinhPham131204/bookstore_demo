// src/App.js

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Import layouts and error page
import RootLayout from './pages/admin/RootLayout.jsx';
import HomeLayout from './pages/HomeLayout.jsx';
import ErrorPage from './pages/admin/errorPage/ErrorPage.jsx';

// Import home pages
import HomePage from './pages/Home/HomePage';
import BookListPage from './pages/Home/BookListPage';
import BookDetailPage from './pages/Home/BookDetailPage';
import CartPage from './pages/Home/CartPage';
import CheckoutPage from './pages/Home/CheckoutPage';
import AccountPage from './pages/Home/AccountPage';
import LoginPage from './pages/Home/LoginPage';  
import SignUpPage from './pages/Home/SignUpPage'; 
import PasswordRecoveryPage from './pages/Home/PasswordRecoveryPage';

// Import admin pages
import DashboardDetail from './pages/admin/dashboard/AdminDashBoardDetails.jsx';
import ProductsTable from './pages/admin/productTable/ProductsTable.jsx';
import AccountManagement from './pages/admin/accountManagement/AccountManagement.jsx';
import BaiViet from './pages/admin/baiviet/baiviet.jsx';
import OrderManagement from './pages/admin/quanlydonhang/quanlydonhang.jsx';
import KhuyenMai from './pages/admin/khuyenmai/khuyenmai.jsx';
import VanChuyen from './pages/admin/vanchuyen/vanchuyen.jsx';
import Kho from './pages/admin/Kho/kho.jsx';

// Create routes
const router = createBrowserRouter([
  {
    element: <HomeLayout />, // Home layout (frontend)
    errorElement: <ErrorPage />, // Error page for home routes
    children: [
      {
        path: '/',
        element: <HomePage />, // Trang chủ
      },
      {
        path: '/books',
        element: <BookListPage />, // Danh sách sách
      },
      {
        path: '/book/:id',
        element: <BookDetailPage />, // Chi tiết sách
      },
      {
        path: '/cart',
        element: <CartPage />, // Giỏ hàng
      },
      {
        path: '/checkout',
        element: <CheckoutPage />, // Thanh toán
      },
      {
        path: '/account',
        element: <AccountPage />, // Quản lý tài khoản
      },
      {
        path: '/login',
        element: <LoginPage />, // Đăng nhập
      },
      {
        path: '/signup',
        element: <SignUpPage />, // Đăng ký
      },
      {
        path: '/forgotpassword',
        element: <PasswordRecoveryPage />, // Khôi phục mật khẩu
      },
    ],
  },
  {
    element: <RootLayout />, // Root layout (admin)
    errorElement: <ErrorPage />, // Error page for admin routes
    children: [
      {
        path: '/admin/dashboard',
        element: <DashboardDetail />, // Admin dashboard
      },
      {
        path: '/admin/products',
        element: <ProductsTable />, // Product management
      },
      {
        path: '/admin/account',
        element: <AccountManagement />, // Account management
      },
      {
        path: '/admin/baiviet',
        element: <BaiViet />, // Posts management
      },
      {
        path: '/admin/quanlydonhang',
        element: <OrderManagement />, // Order management
      },
      {
        path: '/admin/khuyenmai',
        element: <KhuyenMai />, // Promotions management
      },
      {
        path: '/admin/vanchuyen',
        element: <VanChuyen />, // Shipping management
      },
      {
        path: '/admin/kho',
        element: <Kho />, // Inventory management
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  );
}

export default App;
