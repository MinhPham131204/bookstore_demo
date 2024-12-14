import { mockBooks } from '../utils/mockData';

export const getBooks = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBooks), 500);
  });
};

export const searchBooks = (query) => {
  return new Promise((resolve) => {
    const filteredBooks = mockBooks.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setTimeout(() => resolve(filteredBooks), 500);
  });
};