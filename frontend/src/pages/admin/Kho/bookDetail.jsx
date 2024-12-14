// eslint-disable-next-line no-unused-vars
import React from "react";
import { useLocation } from "react-router-dom";

const ChiTietSach = () => {
  const { state } = useLocation();
  const { bookType } = state;

  const books = [
    { id: 1, name: "Sách A", quantity: 50, author: "Tác giả A" },
    { id: 2, name: "Sách B", quantity: 30, author: "Tác giả B" },
    { id: 3, name: "Sách C", quantity: 20, author: "Tác giả C" },
  ]; // Dữ liệu giả lập

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-bold mb-4">{`Chi tiết sách: ${bookType}`}</h1>
      <table className="w-full text-left border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 p-2">ID</th>
            <th className="border border-gray-200 p-2">Tên sách</th>
            <th className="border border-gray-200 p-2">Số lượng tồn kho</th>
            <th className="border border-gray-200 p-2">Tác giả</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border border-gray-200 p-2">{book.id}</td>
              <td className="border border-gray-200 p-2">{book.name}</td>
              <td className="border border-gray-200 p-2">{book.quantity}</td>
              <td className="border border-gray-200 p-2">{book.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChiTietSach;