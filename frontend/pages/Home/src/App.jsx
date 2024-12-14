// src/App.js

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Import các trang
import HomePage from './pages/HomePage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';  // Thêm trang đăng nhập
import SignUpPage from './pages/SignUpPage'; 
import HeaderIn from './components/common/header/header' // Thêm trang đăng ký

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <HeaderIn />
          <Header />
          
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books" element={<BookListPage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />  {/* Đăng nhập */}
              <Route path="/signup" element={<SignUpPage />} />  {/* Đăng ký */}
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
