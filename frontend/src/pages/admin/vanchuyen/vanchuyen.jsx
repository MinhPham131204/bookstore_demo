import React, { useEffect, useState } from "react";
import { HiArrowCircleUp, HiPencil } from "react-icons/hi";
import axios from "axios";

const VanChuyen = () => {
  const [shippingData, setShippingData] = useState([]);
  const [productValueData, setproductValueData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/seller/delivery_fee") // Đường dẫn tới API
      .then((response) => {
        console.log("Shipping data:", response.data);
        const processedData = processShippingData(response.data);
        //const processedData2 = processProductValueData(response.data);
        setShippingData(processedData);
        setproductValueData(processedData2);
      })
      .catch((error) => {
        console.error("Error fetching shipping data:", error);
      });
  }, []);

  // Bảng shipping theo trọng lượng
  const processShippingData = (data) => {
    const innerCity = data.innerCity.map((item) => [
      `${item.lowerWeight} - ${item.upperWeight} kg`,
      `${item.fee.toLocaleString()} VND`,
      `${(item.fee + 15000).toLocaleString()} VND`,
    ]);

    const outerCity = data.outerCity.map((item) => [
      `${item.lowerWeight} - ${item.upperWeight} kg`,
      `${item.fee.toLocaleString()} VND`,
      `${(item.fee + 15000).toLocaleString()} VND`,
    ]);

    const nearCity = data.outerCity.map((item) => [
      `${item.lowerWeight} - ${item.upperWeight} kg`,
      `${(item.fee + 10000).toLocaleString()} VND`,
      `${(item.fee + 15000).toLocaleString()} VND`,
    ]);

    const farCity = data.outerCity.map((item) => [
      `${item.lowerWeight} - ${item.upperWeight} kg`,
      `${(item.fee + 20000).toLocaleString()} VND`,
      `${(item.fee + 25000).toLocaleString()} VND`,
    ]);

    const borderCity = data.outerCity.map((item) => [
      `${item.lowerWeight} - ${item.upperWeight} kg`,
      `${(item.fee + 30000).toLocaleString()} VND`,
      `${(item.fee + 35000).toLocaleString()} VND`,
    ]);

    return [
      { khuVuc: "Nội thành", giaTri: innerCity },
      { khuVuc: "Ngoại thành", giaTri: outerCity },
      { khuVuc: "Liên Tỉnh(Gần)", giaTri: nearCity},
      { khuVuc: "Liên Tỉnh(Xa)", giaTri: farCity},
      { khuVuc: "Vùng sâu, vùng xa", giaTri: borderCity},
    ];
  };

  // Bảng shipping theo giá trị đơn hàng
  /*const processProductValueData = (data) => {
    const formatFee = (fee) => (fee <= 10000 ? "Miễn phí" : `${fee.toLocaleString()} VND`);

    const under200k = data.innerCity.map((item) => ({
      weight: `Dưới ${item.upperWeight} kg`,
      standard: formatFee(item.fee),
      express: formatFee(item.fee + 15000),
    }));

    const btw200kAnd500k = data.innerCity.map((item) => ({
      weight: `Dưới ${item.upperWeight} kg`,
      standard: formatFee(item.fee - 5000),
      express: formatFee(item.fee + 10000),
    }));

    const above500k = data.innerCity.map((item) => ({
      weight: `Dưới ${item.upperWeight} kg`,
      standard: formatFee(item.fee - 10000),
      express: formatFee(item.fee + 5000),
    }));

    return [
      { priceRange: "Dưới 200,000", rows: under200k },
      { priceRange: "200,000 - 500,000", rows: btw200kAnd500k },
      { priceRange: "Trên 500,000", rows: above500k },
    ];
  };*/
  // Bảng shipping
  const renderShippingTable = (data, title) => (
    <div className="bg-white shadow-md rounded-md p-5 mb-6">
      <h2 className="text-lg font-semibold text-red-500 mb-4">{title}</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 p-2">Khu Vực</th>
            <th className="border border-gray-200 p-2">Trọng Lượng</th>
            <th className="border border-gray-200 p-2">Giao Hàng Tiêu Chuẩn</th>
            <th className="border border-gray-200 p-2">Giao Hàng Nhanh</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <React.Fragment key={idx}>
              <tr className="bg-gray-200">
                <td className="border border-gray-200 p-2 font-semibold" colSpan={4}>
                  {row.khuVuc}
                </td>
              </tr>
              {row.giaTri.map((item, i) => (
                <tr key={i}>
                  <td className="border border-gray-200 p-2"></td>
                  <td className="border border-gray-200 p-2">{item[0]}</td>
                  <td className="border border-gray-200 p-2">{item[1]}</td>
                  <td className="border border-gray-200 p-2">{item[2]}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4 gap-2">
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md">
          <HiPencil className="h-5 w-5 mr-2" />
          Chỉnh Sửa
        </button>
        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md">
          <HiArrowCircleUp className="h-5 w-5 mr-2" />
          Cập Nhật
        </button>
      </div>
    </div>
  );
  //Bảng giá trị sản phẩm
  /*const renderProductValueTable = (data, title) => (
    <div className="bg-white shadow-md rounded-md p-5 mb-6">
      <h2 className="text-lg font-semibold text-red-500 mb-4">{title}</h2>
      <table className="w-full border-collapse border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="border border-gray-200 p-2">Giá Trị Đơn Hàng (VND)</th>
          <th className="border border-gray-200 p-2">Trọng Lượng</th>
          <th className="border border-gray-200 p-2">Giao Hàng Tiêu Chuẩn</th>
          <th className="border border-gray-200 p-2">Giao Hàng Nhanh</th>
        </tr>
      </thead>
      <tbody>
        {data.map((section, idx) => (
          <React.Fragment key={idx}>
            <tr className="bg-gray-200">
              <td className="border border-gray-200 p-2 font-semibold" colSpan={4}>
                {section.priceRange}
              </td>
            </tr>
            {section.rows.map((row, i) => (
              <tr key={i}>
                <td className="border border-gray-200 p-2"></td>
                <td className="border border-gray-200 p-2">{row.weight}</td>
                <td className="border border-gray-200 p-2">{row.standard}</td>
                <td className="border border-gray-200 p-2">{row.express}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
      <div className="flex justify-end mt-4 gap-2">
        <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md">
          <HiPencil className="h-5 w-5 mr-2" />
          Chỉnh Sửa
        </button>
        <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md">
          <HiArrowCircleUp className="h-5 w-5 mr-2" />
          Cập Nhật
        </button>
      </div>
    </div>
  );*/
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {shippingData.length > 0 && renderShippingTable(shippingData, "Bảng phí vận chuyển")}
    </div>
    
  );
};

export default VanChuyen;
