import { createSlice } from '@reduxjs/toolkit';
import { mockBooks } from '../utils/mockData';

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: mockBooks,
    filteredBooks: mockBooks,
    selectedBook: null
  },
  reducers: {
    filterBooks: (state, action) => {
      state.filteredBooks = state.books.filter(book => 
        book.title.toLowerCase().includes(action.payload.toLowerCase()) ||
        book.author.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    }
  }
});

export const { filterBooks, setSelectedBook } = bookSlice.actions;
export default bookSlice.reducer;