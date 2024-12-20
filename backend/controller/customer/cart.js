const { Op } = require("sequelize");

const Book = require("../../model/book");
const Cart = require("../../model/cart");

class CartController {
  // [POST] /add_to_cart
  async addBook(req, res) {
    if(req.cookies.userID){
      const check = await Cart.findAll({
        where: {
          customerID: 5,
          bookID: req.body.bookID,
        },
      });

      check.length === 0
        ? await Cart.create({
            customerID: 5,
            bookID: req.body.bookID,
            quantity: req.body.quantity,
          })
        : await Cart.update(
            {
              quantity: req.body.quantity, // Ensure `check[0]` holds the current quantity.
            },
            {
              where: {
                customerID: 5,
                bookID: req.body.bookID,
              },
            }
          );
      
      res.redirect('/cart')
    }
  }

  // [GET] /cart
  async getByID(req, res) {
    try {
      if(req.cookies.userID) {
        const result = await Cart.findAll({
            attributes: ['bookID', 'quantity'],
            include: [
              {
                model: Book,
                attributes: ['title', 'price'],
              }
            ],
            where: {
              customerID: 5,
            },
            order: ['bookID']
        });

        if(result.length) {

          const bookIDs = result.map((item) => item.bookID);

          const priceByBookID = await Book.findAll({
            attributes: ["bookID", "price"],
            where: {
              bookID: {
                [Op.in]: bookIDs, 
              },
            },
            order: ['bookID'],
          });

          let totalPrice = 0

          for (let i in result) {
            totalPrice += priceByBookID[i].price * result[i].quantity
          }

          const response = {
              result,
              totalPrice,
          }

          res.status(200).json(response)
        }

        else res.status(404).json({error: 'Chưa có sản phẩm trong giỏ hàng'})
      }
    }
    catch (err){
      res.status(500).json('Server error')
    }
  }

  // [DELETE] /:id
  async removeBook(req, res) {
    const { id } = req.params;
    return await Cart.destroy({
      where: {
        customerID: 5,
        bookID: id,
      },
    });
  }
}

module.exports = new CartController();
