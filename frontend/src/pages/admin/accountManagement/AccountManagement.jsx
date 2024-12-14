import React, { useEffect, useState } from "react";
import axios from "axios";

const AccountManagement = () => {
  const [accountsData, setAccountsData] = useState({
    allUser: [],
    allAdmin: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/seller/user")
      .then((response) => {
        setAccountsData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="bg-white shadow-md rounded p-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Quản lý tài khoản</h1>
      </div>
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Thêm mới +</button>
      </div>

      {/* Hiển thị danh sách Admin */}
      <h2 className="text-lg font-bold mb-2">Danh sách Admin</h2>
      <table className="w-full text-left mb-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Level</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {accountsData.allAdmin.map((admin, index) => (
            <tr key={admin.ID} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{admin.username}</td>
              <td className="border px-4 py-2">
                <span className="px-2 py-1 rounded bg-green-500 text-white">Admin</span>
              </td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Hiển thị danh sách User */}
      <h2 className="text-lg font-bold mb-2">Danh sách User</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="border px-4 py-2">STT</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">SDT</th>
            <th className="border px-4 py-2">Level</th>
            <th className="border px-4 py-2">Time</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {accountsData.allUser.map((user, index) => (
            <tr key={user.userID} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.phoneNum}</td>
              <td className="border px-4 py-2">
                <span className="px-2 py-1 rounded bg-gray-400 text-white">User</span>
              </td>
              <td className="border px-4 py-2">{user.createdTime}</td>
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