// the code just for testing, can modify it

const { where } = require("sequelize");
const Book = require('../../model/book')
const Category = require('../../model/category');
const sequelize = require("../../database/configDB");

// sequelize model querying
const findBook = async () => {
  return await Book.findAll({
    attributes: ['bookID', 'title'],
    include: [
      {
        model: Category,
        attributes: ['category'],
        where: {
          ID: 1, // Condition on the Category table
        },
      },
    ],
  });
};

// sequelize raw query
const findImg = async () => {
  return await sequelize.query(
    `SELECT b.bookID, b.title, img.image 
     FROM Book b 
     INNER JOIN bookImage img 
     ON b.bookID = img.bookID 
     AND img.bookID = 2`,
    { type: sequelize.QueryTypes.SELECT }
  );
}
module.exports = { findBook, findImg };