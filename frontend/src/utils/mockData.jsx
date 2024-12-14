// src/utils/mockData.js
import Book1 from '../assets/book1.jpg'
import Book2 from '../assets/book2.jpg'

export const mockBooks = [
  {
    id: 1,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 79000,
    coverImage: Book1,
    description: "Một câu chuyện triết lý về hành trình theo đuổi giấc mơ",
    category: "Tiểu Thuyết",
    rating: 4.5
  },
  {
    id: 2,
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 65000,
    coverImage: Book2,
    description: "Nghệ thuật giao tiếp và thu phục lòng người",
    category: "Kỹ Năng Sống",
    rating: 4.7
  },
  {
    id: 3,
    title: "Bí Mật Của May Mắn",
    author: "Alex Rovira & Fernando Trias de Bes",
    price: 89000,
    coverImage: "Book3", 
    description: "Cuốn sách về cách tạo ra vận may trong cuộc sống",
    category: "Phát Triển Bản Thân",
    rating: 4.3
  },
  {
    id: 4,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 120000,
    coverImage: "Book4", 
    description: "Hành trình khám phá lịch sử loài người từ thời tiền sử đến hiện đại",
    category: "Lịch Sử",
    rating: 4.8
  },
  {
    id: 5,
    title: "Những Kẻ Xuất Chúng",
    author: "Malcolm Gladwell",
    price: 95000,
    coverImage: "Book5", 
    description: "Nghiên cứu về sự thành công và những yếu tố dẫn đến sự xuất chúng",
    category: "Khoa Học",
    rating: 4.6
  },
  {
    id: 6,
    title: "Cuốn Theo Chiều Gió",
    author: "Margaret Mitchell",
    price: 115000,
    coverImage: "Book6", 
    description: "Câu chuyện tình yêu lãng mạn và lịch sử của miền Nam nước Mỹ",
    category: "Tiểu Thuyết",
    rating: 4.7
  }
];

  
  export const mockUsers = [
    {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      name: "Nguyễn Văn A",
      
    }
  ];
  
  export const mockCart = {
    items: [],
    total: 0
  };
  
  export const mockOrders = [];