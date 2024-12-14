import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const Kho = () => {
  const navigate = useNavigate();
  const [stockData, setStockData] = useState({ countAllBook: [], countByCategory: [] });

  useEffect(() => {
    axios
      .get("http://localhost:5000/seller/stock")
      .then((response) => {
        setStockData(response.data);
      })
      .catch((error) => console.error("Error fetching stock data:", error));
  }, []);



  const pieData = {
    labels: stockData.countByCategory.map((item) => item.category_name),
    datasets: [
      {
        data: stockData.countByCategory.map((item) => item.quantity),
        backgroundColor: ["#3b82f6", "#f97316", "#eab308", "#10b981", "#a855f7", "#06b6d4", "#ef4444", "#8b5cf6", "#f59e0b"],
        hoverBackgroundColor: ["#2563eb", "#ea580c", "#ca8a04", "#059669", "#9333ea", "#0891b2", "#dc2626", "#7c3aed", "#d97706"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-blue-500 text-white p-4 rounded-md shadow-md mb-6">
        <h1 className="text-xl font-bold">Quản lý kho hàng</h1>
      </div>

      {/* Tổng quan kho */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        <div className="col-span-6 bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold text-red-500 mb-4">Tồn kho hiện tại</h2>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">
              Tổng số sách trong kho: <span className="font-semibold">{stockData.countAllBook[0]?.quantity || 0} (quyển)</span>
            </p>
            <p className="text-gray-600">
              Tổng số loại sách trong kho: <span className="font-semibold">{stockData.countByCategory.length}</span>
            </p>
          </div>
          <div className="mt-4">
            <table className="w-full text-left border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 p-2">Loại sách</th>
                  <th className="border border-gray-200 p-2">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {stockData.countByCategory.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border border-gray-200 p-2">{item.category_name}</td>
                    <td className="border border-gray-200 p-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-span-6 bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Tỉ lệ các loại sách còn trong kho</h2>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Lịch sử nhập hàng */}
      <div className="bg-white shadow-md rounded-md p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Lịch sử nhập hàng</h2>
        <table className="w-full text-left border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 p-2">Loại sách</th>
              <th className="border border-gray-200 p-2">Số lượng</th>
              <th className="border border-gray-200 p-2">Ngày nhập gần nhất</th>
              <th className="border border-gray-200 p-2"></th>
            </tr>
          </thead>
          <tbody>
            {stockData.countByCategory.map((item, idx) => (
              <tr key={idx}>
                <td className="border border-gray-200 p-2">{item.category_name}</td>
                <td className="border border-gray-200 p-2">{item.quantity}</td>
                <td className="border border-gray-200 p-2">01-11-2024</td>
                <td className="border border-gray-200 p-2">
                  <button

                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kho;