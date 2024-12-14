import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    translator: '',
    categoryID: '',
    price: '',
    publisher: '',
    publishYear: '',
    numOfPages: '',
    bookWeight: '',
    stockQuantity: '',
    image: null,
  });

  const categories = [
    { id: 1, name: 'sách tiếng việt' },
    { id: 2, name: 'sách nước ngoài' },
    { id: 3, name: 'sách ngoại ngữ' },
    { id: 4, name: 'sách thiếu nhi' },
    { id: 5, name: 'bách khoa tri thức' },
    { id: 6, name: 'kinh tế' },
    { id: 7, name: 'khoa học & công nghệ' },
    { id: 8, name: 'tâm lí & kỹ năng sống' },
    { id: 9, name: 'y học & sức khỏe' },
    { id: 10, name: 'sách văn học ' },
    { id: 11, name: 'sách ngoại văn' },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handlePriceInput = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Loại bỏ ký tự không phải số
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Thêm dấu chấm ngăn cách hàng nghìn
    setFormData({ ...formData, price: value });
  };

  const validateForm = () => {
    const {
      title,
      author,
      categoryID,
      price,
      publishYear,
      numOfPages,
      bookWeight,
      stockQuantity,
      image,
    } = formData;

    // Kiểm tra các trường bắt buộc
    if (!title.trim()) {
      toast.error('Tên sách không được để trống!');
      return false;
    }
    if (!author.trim()) {
      toast.error('Tác giả không được để trống!');
      return false;
    }
    if (!categoryID) {
      toast.error('Danh mục không được để trống!');
      return false;
    }
    if (!price.trim() || isNaN(price.replace(/\./g, ''))) {
      toast.error('Giá tiền phải là số hợp lệ!');
      return false;
    }
    if (publishYear && (!/^\d{4}$/.test(publishYear) || publishYear < 1000 || publishYear > new Date().getFullYear())) {
      toast.error('Năm xuất bản không hợp lệ!');
      return false;
    }
    if (numOfPages && isNaN(numOfPages)) {
      toast.error('Số trang phải là số hợp lệ!');
      return false;
    }
    if (bookWeight && isNaN(bookWeight)) {
      toast.error('Khối lượng phải là số hợp lệ!');
      return false;
    }
    if (stockQuantity && isNaN(stockQuantity)) {
      toast.error('Số lượng phải là số hợp lệ!');
      return false;
    }
    if (!image) {
      toast.error('Vui lòng chọn ảnh!');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu nhập vào
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post('http://localhost:5000/seller/product/store', data);
      toast.success('Thêm sách thành công!');
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-1/2 max-h-[90vh] overflow-y-auto p-6 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Thêm Sách Mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Tên sách"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="author"
                placeholder="Tác giả"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="translator"
                placeholder="Người dịch"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              <select
                name="categoryID"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="price"
                placeholder="Giá tiền"
                className="w-full p-2 border rounded"
                value={formData.price}
                onInput={handlePriceInput}
                required
              />
              <input
                type="text"
                name="publisher"
                placeholder="Nhà xuất bản"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="publishYear"
                placeholder="Năm xuất bản"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="numOfPages"
                placeholder="Số trang"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="bookWeight"
                placeholder="Khối lượng"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="stockQuantity"
                placeholder="Số lượng"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
              />
              <input
                type="file"
                name="image"
                className="w-full p-2 border rounded"
                onChange={handleChange}
                accept="image/*"
              />
              <div className="flex justify-end space-x-4">
                <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>
                  Hủy
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" />
    </>
  );
};

export default ModalForm;
