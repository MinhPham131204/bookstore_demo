// components/AccountManagement.js
import React from "react";

const AccountManagement = () => {
  const accounts = [
    { id: 1, name: "Top Những Cuốn Sách Nên Mua Để Học Tiếng Anh", category: "Kinh Nghiệm Mua Sách", picture: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935246937143.jpg", Hot: "Nổi Bật", status: "Hiển Thị",time: "2024-06-06 12:30:53" },
    { id: 2, name: "Tuổi Trẻ Thật Sự Đáng Giá Bao Nhiêu?", category: "Kinh Nghiệm Mua Sách", picture: "https://drive.google.com/thumbnail?id=1199v7RLKKi95QBlxfBf8FBwrCEIiySML&sz=w1000", Hot: "Nổi Bật", status: "Hiển Thị", time: "2024-06-08 12:50:53" },
    { id: 3, name: "Những Cuốn Sách Nên Đọc Để Bắt Đầu Vào Thương trường", category: "Kinh Nghiệm Mua Sách", picture: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935280911628.jpg", Hot: "Nổi Bật", status: "Hiển Thị", time: "2024-07-09 12:34:53" },
    { id: 4, name: "Top Sách Dành Cho Trẻ Để Kích Thích Tìm Tòi Ở Trẻ", category: "Kinh Nghiệm Mua Sách", picture: "https://cdn0.fahasa.com/media/catalog/product/8/9/8935212358859.jpg", Hot: "Nổi Bật", status: "Hiển Thị", time: "2024-09-08 11:50:53" },
    { id: 5, name: "[Review] 'Bến xe' - Thương Thái Vi: Sau nước mắt là sự hy sinh cùng tấm lòng vị tha của những tâm hồn đồng điệu", category: "Kinh Nghiệm Mua Sách", picture: "https://hoingontinh.wordpress.com/wp-content/uploads/2013/10/8563010878_9b9907cd8a_z.jpg?w=640", Hot: "Nổi Bật", status: "Hiển Thị", time: "2024-05-05 16:48:53"},
  ];

  return (
    <div className="bg-white shadow-md rounded p-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Quản lý Bài Viết</h1>
      </div>
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Thêm mới +</button>
      </div>
      
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Tiêu Đề</th>
            <th className="border px-4 py-2">Loại</th>
            <th className="border px-4 py-2">Avatar</th>
            <th className="border px-4 py-2">Hot</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={account.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{account.name}</td>
              <td className="border px-4 py-2">
                <span className="px-1 py-1 rounded bg-green-500 text-white">
                  {account.category}
                </span>
              </td>
              <td className="border px-4 py-2">
                <img src={account.picture} alt={account.name} className="w-48 h-48 object-cover" />
              </td>
              <td className="border px-4 py-2">
                <span className="px-2 py-1 rounded bg-violet-500 text-white">
                  {account.Hot}
                </span>
              </td>
              <td className="border px-4 py-2">
                <span className="px-2 py-1 rounded bg-violet-500 text-white">
                  {account.status}
                </span>
              </td>
              <td className="border px-4 py-2">{account.time}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountManagement;