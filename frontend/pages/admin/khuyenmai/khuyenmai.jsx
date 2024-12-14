import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTicketAlt } from "react-icons/fa";

const KhuyenMai = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/seller/discount");
        const data = response.data.map((item) => ({
          title: item.Preferential.name,
          description: item.allBookFlag
            ? "Áp dụng toàn sàn"
            : "Áp dụng cho một số sách nhất định",
          code: `Mã giảm giá: FSTDDT11`,
          startDate: new Date(item.startDate).toLocaleDateString(),
          expiry: new Date(item.endDate).toLocaleDateString(),
        }));
        setVouchers(data);
      } catch (error) {
        console.error("Error fetching vouchers:", error);
      }
    };

    fetchVouchers();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold text-gray-600 mb-4">Chương trình khuyến mãi, kho Voucher</h1>

      <div className="grid grid-cols-3 gap-6">
        {vouchers.map((voucher, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flex items-center p-4 bg-green-500 text-white">
              <FaTicketAlt className="w-10 h-10 mr-4" />
              <div>
                <h3 className="text-lg font-bold">{voucher.title}</h3>
                <p className="text-sm">{voucher.description}</p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm">
                Đơn hàng từ 250k và Chỉ áp dụng vào các ngày 11,15,25 và 29 từng tháng trong năm
              </p>
              <br></br>
                <p className="text-sm">
                  <strong>Ngày Bắt Đầu:</strong> {voucher.startDate}
                </p>
                <p className="text-sm">
                  <strong>Ngày Kết Thúc:</strong> {voucher.expiry}
                </p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-700 font-bold text-lg">{voucher.code}</span>
              </div>
              <div className="text-right mt-2">
                <a href="#" className="text-red-500 hover:underline">
                  Chỉnh sửa
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="px-6 py-3 bg-red-500 text-white rounded-full text-lg hover:bg-red-600">
          + Thêm Voucher
        </button>
      </div>
    </div>
  );
};

export default KhuyenMai;
