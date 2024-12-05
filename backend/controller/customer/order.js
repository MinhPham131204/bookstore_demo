const sequelize = require("../../database/configDB");
const Book = require("../../model/book");
const Order = require("../../model/cart");
const Customer = require("../../model/customer");
const OrderDetail = require("../../model/orderDetail");
const Rating = require("../../model/rating");

class OrderController {
  
  // [GET] /orderInfo
  async getInfo(req, res) {
    if(req.cookies.userID){
      const findAddress = await Customer.findOne({
        attributes: ["province", "userAddress"],
        where: {
          userID: req.cookies.userID,
        },
      });

      const newOrder = await Order.create(req.body);

      const bookIDs = req.query.orderInfo.map((item) => item.bookID);
      const quantityArr = req.query.orderInfo.map((item) => item.quantity);
    }
  }

  // [POST] /confirmOrder
  async confirmOrder(req, res) {
    await Order.update(req.body);
    await OrderDetail.update(req.body);

    res.redirect('/order/orderList')
  }

  //[GET] /orderList
  async showOrderList(req,res){
    try{
      if(req.cookies.userID){
        const result = await OrderDetail.findAll({
          where: {customerID: req.cookies.userID}
        })

        if(result.length) res.status(200).json(result)

        else res.status(404).json({error: 'Chưa có đơn hàng'})
      }
    }
    
    catch (err){
      res.status(500).json('Server error')
    }
  }

  //[GET] /orderList/:id
  async showOrderList(req,res){
    try{
      if(req.cookies.userID){
        const result = await OrderDetail.findOne({
          where: {ID: req.params.id},
          include: [
            {
              model: Order,
              attributes: ['orderID', 'orderAddress', 'deliveryStatus', 'orderedTime', 'paymentDate', 'deliveryFee']
            }
          ]
        })

        if(result) res.status(200).json(result)

        else res.status(404).json({error: 'Chưa có đơn hàng'})
      }
    }
    
    catch (err){
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
      if(req.cookies.userID){
        const check = await Rating.findOne({
          where: {
            customerID: req.cookies.userID,
            bookID: req.body.bookID,
          },
        });

        if(check === 0){
          await Rating.create({
            customerID: req.cookies.userID,
            bookID: req.body.bookID,
            rating: req.body.rating,
          })
          res.status(200).redirect('/main-page/book-info/'.concat('', check.req.body.bookID))
        }

        else res.status(404).json({message: 'Sách đã được đánh giá'})
      }
    }
    catch(err){
      res.status(500).json('Server error')
    }
  }

}

module.exports = new OrderController();
