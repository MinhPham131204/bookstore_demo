const { Op, Sequelize } = require("sequelize");
const sequelize = require("../../database/configDB");
const Category = require("../../model/category");
const Book = require("../../model/book");
const BookImage = require("../../model/image");
const Rating = require("../../model/rating");

class BookController {

  // [GET] /main-page
  async showBook(req, res) {
    try {
      const result = await sequelize.query(
        `
        WITH ValidCategories AS (
          SELECT b.categoryID
          FROM Book b
          JOIN Category c ON c.ID = b.categoryID
          WHERE c.superID IS NOT NULL
          GROUP BY b.categoryID
          HAVING COUNT(*) >= 5
        ),
        RankedBooks AS (
          SELECT 
            b.bookID,
            b.title,
            b.price,
            b.soldAmount,
            b.categoryID,
            img.image,
            ROW_NUMBER() OVER (PARTITION BY b.categoryID ORDER BY b.soldAmount DESC) AS rank
          FROM Book b
          JOIN ValidCategories vc ON vc.categoryID = b.categoryID
          JOIN bookImage img ON b.bookID = img.bookID
          WHERE img.ssn IN (
            SELECT MIN(ssn)
            FROM bookImage
            GROUP BY bookID
          )
        )
        SELECT 
          bookID, 
          title, 
          categoryID, 
          price, 
          image
        FROM RankedBooks
        WHERE rank <= 5
        ORDER BY categoryID, rank; `,
        { type: sequelize.QueryTypes.SELECT, }
      )
      if(result.length) res.status(200).json(result)

      else res.status(404).json({error: '404 Not Found'})

    }
    catch (err){
      res.status(500).json('Server error')
    }
  }

  // [GET] /:categoryID
  async showAllBookByCategory (req, res) {
    try {
      const result = await Book.findAll({
        attributes: ['bookID', 'title', 'price'],
        include: [
          {
            model: BookImage,
            attributes: ['image'],
            where: {
              ssn: {
                [Op.in]: Sequelize.literal(
                  `(SELECT MIN(ssn) FROM bookImage GROUP BY bookID)`
                ),
              },
            },
          },
        ],
        where: {
          categoryID: req.params.categoryID,
        },
        order: [['soldAmount', 'DESC']],
      });

      if(result.length) res.status(200).json(result)

      else res.status(404).json({error: 'Không tìm thấy sách theo danh mục'})
    }
    catch (err) {
      res.status(500).json('Server error')
    }
  }

  // [GET] /book-info/:id
  async showBookInfo(req, res) {
    try {
      const book = await Book.findAll({
        include: [
          {
            model: Category,
            attributes: ['superID'],
          }
        ],
        where: {
          bookID: req.params.id
        }
      });

      if(book.length){
        const result = book[0].get();

        const img = await BookImage.findAll({
          where: {
            bookID: req.params.id,
          },
        });

        result.image = [];

        for (let e of img) {
          result.image.push(e.image);
        }

        result.similarBook = await sequelize.query(
          `
          WITH firstImage AS (
            SELECT * 
            FROM bookImage 
            WHERE ssn IN (
              SELECT MIN(ssn) 
              FROM bookImage 
              GROUP BY bookID
            )
          )
          SELECT TOP 5 b.bookID, b.title, b.price, img.image
          FROM Book b
          JOIN firstImage img ON b.bookID = img.bookID
          JOIN Category c ON c.ID = b.categoryID AND c.ID = :categoryId
          where not b.bookID = :bookId
          ORDER BY b.soldAmount DESC
          `,
          {
            replacements: { 
              categoryId: result.categoryID,
              bookId: req.params.id,
            },
            type: sequelize.QueryTypes.SELECT,
          }
        );

        result.rating = await Rating.findAll({
          attributes: [
              [Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']
          ],
          where: {
            bookID: req.params.id
          }
        });

        res.status(200).json(result)
      }

      else res.status(404).json({error: 'Không tìm thấy thông tin sách'})
    }
    catch (err) {
      res.status(500).json('Server error')
    }
  }

}

module.exports = new BookController()