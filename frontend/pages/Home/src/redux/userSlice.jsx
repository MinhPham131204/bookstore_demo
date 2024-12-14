import { createSlice } from '@reduxjs/toolkit';
import { mockUsers } from '../utils/mockData';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: mockUsers[0],
    isAuthenticated: false,
    users: mockUsers
  },
  reducers: {
    login: (state, action) => {
      const user = state.users.find(u => 
        u.email === action.payload.email
      );
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;