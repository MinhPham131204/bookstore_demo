const sequelize = require("../../database/configDB");

const Order = require("../../model/order");

class OrderController {
  // [GET] /order/all
  async allOrder() {
    return await Order.findAll();
  }

  // [GET] /order/:month
  async allOrderInMonth() {
    return await Order.findAll({
      where: {
        where: sequelize.literal('MONTH(orderedTime) = MONTH(GETDATE())')
      },
      raw: true,
    });
  }

  // [PUT] /order/deliveryStatus

  // [DELETE] /product/:id
}

module.exports = new OrderController();
