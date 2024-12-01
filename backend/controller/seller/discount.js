const sequelize = require("../../database/configDB");

const Book = require("../../model/book");
const Discount = require("../../model/discount");
const detail = require("../../model/discountDetail");
const Preferential = require("../../model/preferential");

class BookController {
  // [GET] /discount/list
  async showDiscountList() {
    return await Discount.findAll({
      attributes: ["discountID", "startDate", "endDate", "allBookFlag"],
      include: [
        {
          model: Preferential,
          attributes: ["name"],
        },
      ],
    });
  }

  // [GET] /product/:id/edit
  async showPreferentialList(id) {
    return await Preferential.findAll()
  }

  // [GET] /discount/create => render create new Discount UI

  // [POST] => re-direct to /discount/list after creating

  // [PUT] /product/:id

  // [DELETE] /discount/preferential/:id
  async deleteDiscount(req, res) {
    return await Discount.destroy({
      where: {
        discountID: req.params.id,
      },
    });
  }

}

module.exports = new BookController();
