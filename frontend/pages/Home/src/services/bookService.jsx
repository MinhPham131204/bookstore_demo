import { mockBooks } from './mockData';

export const fetchProductById=async(id)=>{
  try {
      const res=await axiosi.get(`/products/${id}`)
      return res.data
  } catch (error) {
      throw error.response.data
  }
}

const bookService = {
  getBooks: () => {
    return new Promise((resolve) => {
      resolve(mockBooks);
    });
  },

  getBookById: (id) => {
    return new Promise((resolve, reject) => {
      const book = mockBooks.find((book) => book.id === id);
      if (book) {
        resolve(book);
      } else {
        reject(new Error('Book not found'));
      }
    });
  },

  searchBooks: (query) => {
    return new Promise((resolve) => {
      const results = mockBooks.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    });
  },
};

export default bookService;
