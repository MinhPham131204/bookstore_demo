import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Pagination from "./Pagination";
import ModalForm from "./ModalForm";
import ModalEditForm from "./ModalEditForm";
const Product = () => {
  const [productss, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/seller/product/list").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleEditClick = (id) => {
    axios.get(`http://localhost:5000/seller/product/${id}/info`).then((res) => {
      setCurrentProduct(res.data);
      setIsEditModalOpen(true);
      
    }).catch((err) => {
      console.error("Error fetching product details:", err);
    });
  };

  const handleUpdateProduct = (updatedData) => {
    axios.put(`http://localhost:5000/seller/product/${updatedData.bookID}`, updatedData)
      .then(() => {
        setProducts((prev) =>
          prev.map((product) =>
            product.bookID === updatedData.bookID ? updatedData : product
          )
        );
        setIsEditModalOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating product:", err);
      });
  };
  //setProducts((prevProducts) =>prevProducts.filter((product) => product.bookID !== id));
  const handleDeleteClick = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa cuốn sách này không?")) {
      axios
        .delete(`http://localhost:5000/seller/product/delete/${id}`)
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.bookID !== id)
          );
        })
        .catch((err) => {
          console.error("Error deleting product:", err);
          alert("Có lỗi xảy ra khi xóa sách!");
        });
        alert("Sách đã được xóa thành công!");
        window.location.reload();
    }
  };  
  

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productss.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="p-6 bg-gray-100 flex-1">
      <h2 className="text-2xl font-semibold mb-6">Quản lý sách</h2>
      <div className="bg-white p-8 rounded shadow-md">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Name ..."
            className="border p-2 rounded w-1/3"
          />
          <input
            type="text"
            placeholder="Danh mục"
            className="border p-2 rounded w-1/3 mx-2"
          />
          <button className="bg-blue-500 text-white p-2 rounded">Search</button>
          <div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Thêm mới +
            </button>
            <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Avatar</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.bookID} className="border-b">
                <td className="p-2 border">{product.bookID}</td>
                <td className="p-2 border">{product.title}</td>
                <td className="p-2 border">
                  <span className="bg-green-100 text-green-800 p-1 rounded">
                    {product.category}
                  </span>
                </td>
                <td className="p-2 border">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-48 h-48 object-cover"
                  />
                </td>
                <td className="p-2 border">
                  <span className="text-gray-400 mr-2">{product.price}</span>
                  <span>{product.salePrice}</span>
                </td>
                <td className="p-2 border">
                  <span className="bg-blue-100 text-blue-800 p-1 rounded">
                    {product.stockQuantity > 0 ? "Đang bán" : "Hết Hàng"}
                  </span>
                </td>
                <td className="p-2 flex justify-center mb-4 space-x-2">
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => handleEditClick(product.bookID)}
                  >
                    <FaEdit />
                  </button>

                   <button
                     className="bg-red-500 text-white p-2 rounded"
                     onClick={() => handleDeleteClick(product.bookID)}
                    >
                      <FaTrash />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <Pagination
            totalProducts={productss.length}
            productsPerPage={productsPerPage}
            paginate={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
      {isEditModalOpen && currentProduct && (
        <ModalEditForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={currentProduct}
          onSubmit={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default Product;
