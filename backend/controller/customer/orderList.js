const express = require('express');
const jwt = require('jsonwebtoken');
const sequelize = require("../../database/configDB");
const Customer = require("../../model/customer");
const OrderList = require("../../model/order");


const app = express();
app.use(methodOverride('_method'))
class orderList{
  //[GET] /orderList/:id
  async showOrderList(req,res){
    res.json(await OrderList.findAll(
      {
        attribute:['customerID','orderAddress','deliveryStatus','orderedTime','paymentDate','deliveryFee']
      },
      {
        where: {customerID: req.body.userID}
      }
      )
    )
  }

  //[DELETE] /orderList/:id
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
}

module.exports = new orderController();