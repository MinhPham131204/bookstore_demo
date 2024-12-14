// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import bookReducer from './bookSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: bookReducer,
    user: userReducer
  }
});

export default store;
