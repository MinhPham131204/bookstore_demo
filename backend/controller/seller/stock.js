const sequelize = require("../../database/configDB");

const Book = require("../../model/book");

class StockController {
  async countAll() {
    return await Book.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('bookID')), 'quantity']]
    });
  }

  // count by category
  async countByCategory() {
    return await sequelize.query(
      `
      SELECT 
        Book.categoryID, 
        COUNT(Book.bookID) AS quantity, 
        Category.category as category_name
      FROM Book
      INNER JOIN Category ON Book.categoryID = Category.id
      GROUP BY Book.categoryID, Category.category
      `,
      { type: sequelize.QueryTypes.SELECT }
    )
  }
}

module.exports = new StockController();
