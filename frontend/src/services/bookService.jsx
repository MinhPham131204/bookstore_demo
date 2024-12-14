import axios from 'axios';

// Lấy danh sách sách
export const getBooks = () => {
  return axios.get('api/main-page')  // Gọi API để lấy tất cả các cuốn sách
    .then(response => response.data)  // Xử lý dữ liệu trả về từ server
    .catch(error => {
      console.error("Error fetching books:", error);
      throw new Error('Failed to fetch books');
    });
};

//Lấy danh sách theo danh mục
export const getBooksByCategory = async (categoryID) => {
  try {
    const response = await axios.get(`api/main-page/${categoryID}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books by category:", error);
    throw new Error('Failed to fetch books by category');
  }
};

//Thông tin chi tiết sách
export const getBookInfo = async (id) => {
  try {
    const response = await axios.get(`/api/main-page/book-info/${id}`);
    const data = response.data;  // Không cần gọi response.json() khi sử dụng axios
    console.log('Book Data:', data);  // Check the data structure
    return data;
  } catch (error) {
    console.error("Error in getBookInfo:", error);
    throw new Error('Failed to fetch book info');
  }
};


