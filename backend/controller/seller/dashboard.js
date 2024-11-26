const { Op } = require("sequelize");
const sequelize = require("../../database/configDB");

const Order = require("../../model/order");
const OrderDetail = require("../../model/orderDetail");

class Dashboard {
  // [GET] /revenue/day
  async revenueByDay() {
    return await OrderDetail.findAll({
      attributes: [[sequelize.fn("SUM", sequelize.col("price")), "totalByDay"]],
      include: [
        {
          model: Order,
          attributes: [], // No additional attributes needed from Orders
          where: {
            paymentDate: {
              [Op.eq]: sequelize.literal("CAST(GETDATE() AS DATE)"),
            },
          },
        },
      ],
      raw: true,
    });
  }

  // [GET] /revenue/month
  async revenueByMonth(month) {
    return await OrderDetail.findAll({
      attributes: [
        [sequelize.fn("SUM", sequelize.col("price")), "totalByMonth"],
      ],
      include: [
        {
          model: Order,
          attributes: [], // No additional attributes needed from Order
          where: {
            [Op.and]: [
              sequelize.where(
                sequelize.fn("MONTH", sequelize.col("paymentDate")),
                month
              ),
              sequelize.where(
                sequelize.fn("YEAR", sequelize.col("paymentDate")),
                sequelize.fn("YEAR", sequelize.fn("GETDATE"))
              ),
            ],
          },
        },
      ],
      raw: true,
    });
  }

  // [GET] /revenue/year
  async revenueByYear(year) {
    return await OrderDetail.findAll({
      attributes: [[sequelize.fn("SUM", sequelize.col("price")), "totalByDay"]],
      include: [
        {
          model: Order,
          attributes: [], // No additional attributes needed from Orders
          where: {
            [Op.and]: [
              sequelize.where(
                sequelize.fn("YEAR", sequelize.col("paymentDate")),
                year
              ),
            ],
          },
        },
      ],
      raw: true,
    });
  }

  // [GET] /best-seller
  async topSoldBook() {
    return await sequelize.query(
      `
        WITH firstImage as (
            select * from bookImage
            where ssn in (
                select min(ssn) from bookImage group by bookID
            )
        ),
        topBook as (
            select de.bookID as bookID, sum(de.quantity) as quantity 
            from OrderDetail de inner join Orders o
            on de.orderID = o.orderID and month(o.orderedTime) = month(getdate())
            group by de.bookID
        )
        select b.bookID, b.title, t.quantity, img.image 
            from book b, topBook t, firstImage img  
            where b.bookID = t.bookID and b.bookID = img.bookID
            order by t.quantity desc;
        `,
      { type: sequelize.QueryTypes.SELECT }
    );
  }
}

module.exports = new Dashboard();
