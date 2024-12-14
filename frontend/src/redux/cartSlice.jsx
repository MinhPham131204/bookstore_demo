// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { mockCart } from '../utils/mockData';

// eslint-disable-next-line no-unused-vars
const initialState = {
  items: [],  // Danh sách sản phẩm trong giỏ hàng
};

// Tạo slice cho cart
const cartSlice = createSlice({
  name: 'cart',
  initialState: mockCart,
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);
      
      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ, tăng số lượng
        existingProduct.quantity += 1;
      } else {
        // Nếu chưa có, thêm sản phẩm mới vào giỏ
        state.items.push({ ...product, quantity: 1 });
       
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action) => {
        const existingItem = state.items.find(item => item.id === action.payload.id);
        
        if (existingItem) {
          // If quantity > 1, reduce quantity
          if (existingItem.quantity > 1) {
            existingItem.quantity -= 1;
          } else {
            // If quantity is 1, remove the item completely
            state.items = state.items.filter(item => item.id !== action.payload.id);
          }
        }
      },

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingProduct = state.items.find(item => item.id === id);
      if (existingProduct) {
        existingProduct.quantity = quantity;
      }
    },

    // Xóa tất cả sản phẩm trong giỏ hàng
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Các action cần thiết
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selector để lấy tổng số lượng sách trong giỏ
export const selectCartItemsCount = (state) => {
  return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

// Selector để lấy danh sách các sản phẩm trong giỏ
export const selectCartItems = (state) => state.cart.items;

// Reducer mặc định để thêm vào Redux store
export default cartSlice.reducer;
