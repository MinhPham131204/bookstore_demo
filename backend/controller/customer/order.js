const Book = require("../../model/book");
const Cart = require("../../model/cart");
const Order = require("../../model/order");
const Customer = require("../../model/customer");
const OrderDetail = require("../../model/orderDetail");
const Rating = require("../../model/rating");

class OrderController {
  
  // [GET] /orderInfo
  async getInfo(req, res) {
    const userInfo = await Customer.findOne({
      attributes: ["username", "phoneNum", "userAddress"],
      where: {
        userID: req.cookies.userID, // sửa lại theo userID được lưu trong csdl
      },
    });

    userInfo.cart = await Cart.findAll({
      where: {
        customerID: req.cookies.userID, // sửa lại theo userID được lưu trong csdl
      }
    })

    res.status(200).json(userInfo)
  }

  // [POST] /confirmOrder
  async confirmOrder(req, res) {
    const order = await Order.create(req.body);

    const cart = await Cart.findAll({
      where: {
        customerID: req.cookies.userID, // sửa lại theo userID được lưu trong csdl
      }
    })

    // Tạo danh sách OrderDetail
    const orderDetails = await Promise.all(
      cart.map(async (item) => {
          const book = await Book.findOne({ where: { bookID: item.bookID } });
          if (!book) {
              throw new Error(`Book with ID ${item.bookID} not found`);
          }

          return {
              orderID: order.orderID,
              bookID: item.bookID,
              quantity: item.quantity,
              price: book.price * item.quantity,
          };
      })
    );

    // Lưu các OrderDetail vào cơ sở dữ liệu
    await OrderDetail.bulkCreate(orderDetails);

    await Cart.destroy({
      where: {
        customerID: req.cookies.userID, // sửa lại theo userID được lưu trong csdl
      },
    })

    res.redirect('/order/orderList')
  }

  //[GET] /orderList
  async showOrderList(req,res){
    try{
      const result = await Order.findAll({
        where: {customerID: 3}, // sửa lại theo userID được lưu trong csdl
        include: [
          {
            model: OrderDetail,
            attributes: ['bookID', 'quantity']
          }
        ]
      })

      if(result.length) res.status(200).json(result)

      else res.status(404).json({error: 'Chưa có đơn hàng'})
    }
    
    catch (err){
      console.log(err)
      res.status(500).json('Server error')
    }
  }

  //[DELETE] /orderList/:orderID
  async cancelOrder(req,res){
    
    const cancelOrder = await OrderList.findOne(
      {  
        where:{orderID: req.body.orderID}
      }
    )
    res.json(await OrderList.update(
      {deliveryStatus: 'Đã hủy'},
      {where: {orderID: cancelOrder.orderID}}
    )
    )
  }

  // [POST] /rating
  async rating(req, res){
    try {
      const check = await Rating.findOne({
        where: {
          customerID: req.cookies.userID, // sửa lại theo userID được lưu trong csdl
          bookID: req.body.bookID,
        },
      });

      if(check === 0){
        await Rating.create({
          customerID: req.cookies.userID, // sửa lại theo userID được lưu trong csdl
          bookID: req.body.bookID,
          rating: req.body.rating,
        })
        res.status(200).redirect('/main-page/book-info/'.concat('', check.req.body.bookID))
      }

      else res.status(404).json({message: 'Sách đã được đánh giá'})
    }
    catch(err){
      res.status(500).json('Server error')
    }
  }

}

module.exports = new OrderController();
