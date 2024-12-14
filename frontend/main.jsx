import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useRouteError } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ErrorPage from './pages/admin/errorPage/ErrorPage.jsx';
import RootLayout from './pages/admin/RootLayout.jsx';
import HomeLayout from './pages/Home/src/App.jsx';
import './main.css';

//pages
import DashboardDetail from './pages/admin/dashboard/AdminDashBoardDetails.jsx';
import ProductsTable from './pages/admin/productTable/ProductsTable.jsx';
import AccountManagement from './pages/admin/accountManagement/AccountManagement.jsx';
import BaiViet from './pages/admin/baiviet/baiviet.jsx';
import OrderManagement from './pages/admin/quanlydonhang/quanlydonhang.jsx';
import KhuyenMai from './pages/admin/khuyenmai/khuyenmai.jsx';
import VanChuyen from './pages/admin/vanchuyen/vanchuyen.jsx';
import Kho from './pages/admin/Kho/kho.jsx';


const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
  },

  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin/dashboard',
        element: <DashboardDetail />,
      },
      {
        path: '/admin/products',
        element: <ProductsTable />,
      },
      {
        path: '/admin/account',
        element: <AccountManagement />,
      },
      {
        path: '/admin/baiviet',
        element: <BaiViet />,
      },
      {
        path: '/admin/quanlydonhang',
        element: <OrderManagement />,
      },
      {
        path: '/admin/khuyenmai',
        element: <KhuyenMai />,
      },
      {
        path: '/admin/vanchuyen',
        element: <VanChuyen />,
      },
      {
        path: '/admin/kho',
        element: <Kho />,
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
