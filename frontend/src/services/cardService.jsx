export const addToCart = async (bookID, quantity) => {
  try {
    const response = await fetch('/api/cart/addBook', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookID, quantity }),
    });

    // Kiểm tra xem mã trạng thái có hợp lệ không (2xx)
    if (response.ok) {
      return { success: true };
    } else {
      const result = await response.json(); // Nếu có lỗi trả về JSON
      throw new Error(result.error || 'Lỗi khi thêm vào giỏ hàng');
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    return { success: false, error: error.message };
  }
};
