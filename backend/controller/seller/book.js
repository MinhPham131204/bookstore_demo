const sequelize = require("../../database/configDB");

const Book = require("../../model/book");
const Customer = require("../../model/customer");
const BookImage = require("../../model/image");
const Rating = require("../../model/rating");

class BookController {

  // [GET] /product/list
  async showBookList(req, res) {
    return res.json( await sequelize.query(
      `
      WITH firstImage as (
        select * from bookImage
        where ssn in (
          select min(ssn) from bookImage group by bookID
        )
      )
  
      SELECT b.*, c.category, img.image 
        FROM Book b 
        JOIN 
          firstImage img ON b.bookID = img.bookID
        JOIN
          Category c ON c.ID = b.categoryID
        ORDER BY b.bookID;
    `,
      { type: sequelize.QueryTypes.SELECT }
    ));
  }

  // [GET] /product/:id/info
  async showBookInfo (req, res) {
    const {id} = req.params

    const book = await Book.findByPk(id)

    const result = book.get()

    const img = await BookImage.findAll({
      where: {
        bookID: id
      }
    })

    result.image = []

    for (let e of img) {
      result.image.push(e.image)
    }

    return res.json(result)
  }

  // [GET] /product/create => render create new Book UI

  // [POST] => re-direct to /product/list after creating

  // [GET] /product/rating
  async showRating(req, res) {
    return res.json(await sequelize.query(
      `SELECT TOP 20 
          c.username, 
          b.title, 
          r.rating
       FROM 
          Customer c
       JOIN 
          Rating r ON c.userID = r.customerID
       JOIN 
          Book b ON b.bookID = r.bookID
       ORDER BY 
          r.rating DESC;`,
      { type: sequelize.QueryTypes.SELECT }
    ));
  }

  // [PUT] /product/:id

  // [DELETE] /product/:id
  
}

module.exports = new BookController()