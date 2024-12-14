import React, { useState, useEffect } from "react";

const ModalEditForm = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    bookID: "",
    title: "",
    categoryID: '',
    price: 0,
    salePrice: 0,
    stockQuantity: 0,
  });

  const [tempData, setTempData] = useState([]);
  useEffect(() => {
    if (initialData) {
      setTempData(initialData);
    }
  }, []);

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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
      const {
        bookID,
        title,
        categoryID,
        price,
        salePrice,
        stockQuantity,
      } = formData;
  
      // Kiểm tra các trường bắt buộc
      if(!bookID){
        formData.bookID = tempData.bookID;
      }
      if (!title.trim()) {
        toast.error('Tên sách không được để trống!');
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
      if (salePrice && isNaN(salePrice.replace(/\./g, ''))) {
        toast.error('Giá khuyến mãi phải là số hợp lệ!');
        return false;
      }
      if (stockQuantity && isNaN(stockQuantity)) {
        toast.error('Số lượng phải là số hợp lệ!');
        return false;
      }
  
      return true;
    };
  const handleSubmit = (e) => {
    if (!validateForm()) {
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-1/2 p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Chỉnh sửa sản phẩm</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-2 font-medium">ID</label>
                <input
                    type="number"
                    name="bookID"
                    value={formData.bookID}
                    onChange={handleChange}
                    placeholder= {tempData.bookID}
                    className="w-full border p-2 rounded"
                    disabled
                />
             </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Tên sách</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder= {tempData.title}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Danh mục</label>
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
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Giá gốc</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder= {tempData.price}
              className="w-full border p-2 rounded"
            />
          </div>
         
          <div className="mb-4">
            <label className="block mb-2 font-medium">Số lượng tồn</label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              placeholder= {tempData.stockQuantity}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditForm;
