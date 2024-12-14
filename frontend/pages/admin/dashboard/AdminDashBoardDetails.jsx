import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaProductHunt, FaComments, FaStar, FaDollarSign } from "react-icons/fa";

const AdminDashBoardDetails = () => {
  const [data, setData] = useState({
    todayRev: [],
    monthRev: [],
    yearRev: [],
    topSold: [],
    newOrder: [],
  });

  // Fetch data from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/seller/dashboard")
      .then((response) => {
        const fetchedData = response.data;

        setData({
          todayRev: fetchedData.todayRev || [],
          monthRev: fetchedData.monthRev || [],
          yearRev: fetchedData.yearRev || [],
          topSold: fetchedData.topSold || [],
          newOrder: fetchedData.newOrder || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Calculate weekly revenue
  const dailyRevenue = data.todayRev.reduce((acc, item) => acc + item.totalByDay, 0);
  const monthlyRevenue = data.monthRev.reduce((acc, item) => acc + item.totalByMonth, 0);
  const yearlyRevenue = data.yearRev.reduce((acc, item) => acc + item.totalByYear, 0);
  const weeklyRevenue = dailyRevenue * 7;
  const stats = [
    { icon: <FaShoppingCart />, title: "Tổng số đơn hàng", value: "15", bgColor: "bg-blue-400" },
    { icon: <FaProductHunt />, title: "Sản phẩm", value: "40", bgColor: "bg-red-400" },
    { icon: <FaComments />, title: "Bình luận", value: "5", bgColor: "bg-purple-400" },
    { icon: <FaStar />, title: "Đánh giá", value: "12", bgColor: "bg-green-400" },
    { icon: <FaDollarSign />, title: "Doanh thu ngày", value: `${dailyRevenue.toLocaleString()} VND`, bgColor: "bg-pink-400" },
    { icon: <FaDollarSign />, title: "Doanh thu tuần", value: `${weeklyRevenue.toLocaleString()} VND`, bgColor: "bg-yellow-400" },
    { icon: <FaDollarSign />, title: "Doanh thu tháng", value: `${monthlyRevenue.toLocaleString()} VND`, bgColor: "bg-yellow-400" },
    { icon: <FaDollarSign />, title: "Doanh thu năm", value: `${yearlyRevenue.toLocaleString()} VND`, bgColor: "bg-teal-400" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`flex items-center p-4 ${stat.bgColor} text-white rounded-lg`}>
            <div className="text-3xl mr-4">{stat.icon}</div>
            <div>
              <p className="text-sm">{stat.title}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Orders and Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng mới</h2>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Tên khách hàng</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Địa chỉ</th>
                <th className="px-4 py-2">Thời gian đặt</th>
              </tr>
            </thead>
            <tbody>
              {data.newOrder.length > 0 ? (
                data.newOrder.map((order, index) => (
                  <tr key={order.orderID}>
                    <td className="px-4 py-2">{index+1}</td>
                    <td className="px-4 py-2">{order.Customer.username}</td>
                    <td className="px-4 py-2">{order.Customer.email}</td>
                    <td className="px-4 py-2">{order.orderAddress}</td>
                    <td className="px-4 py-2">{new Date(order.orderedTime).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan="6">
                    Không có đơn hàng mới.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">Xem danh sách đơn hàng</button>
        </div>

        {/* Top Products */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Top sản phẩm bán chạy</h2>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Qty</th>
              </tr>
            </thead>
            <tbody>
              {data.topSold.length > 0 ? (
                data.topSold.map((product, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{product.title}</td>
                    <td className="px-4 py-2">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{product.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2" colSpan="5">
                    Không có sản phẩm bán chạy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">Xem danh sách sản phẩm</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardDetails;