const sequelize = require("../../database/configDB");

const Book = require("../../model/book");
const BookImage = require("../../model/image");

require("dotenv").config();

const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

class BookController {
  // [GET] /product/list
  async showBookList(req, res) {
    return res.json(
      await sequelize.query(
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
      )
    );
  }

  // [GET] /product/:id/info
  async showBookInfo(req, res) {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    const result = book.get();

    const img = await BookImage.findAll({
      where: {
        bookID: id,
      },
    });

    result.image = [];

    for (let e of img) {
      result.image.push(e.image);
    }

    return res.json(result);
  }

  // [GET] /product/create => render create new Book UI
  create(req, res) {
    res.render("form");
  }

  // [POST] => re-direct to /product/list after creating
  async storeBook(req, res) {
    const createFile = await drive.files.create({
      requestBody: {
        name: req.file.originalname,
        mimeType: "image/jpg",
      },
      media: {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(req.file.path),
      },
    });

    const fileId = createFile.data.id;
    
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    req.body.price = req.body.price.replace(/\D/g, '')

    const directLink = `https://drive.google.com/uc?id=${fileId}&sz=w1000`

    const newBook = await Book.create(req.body);
    await BookImage.create(
      { 
        bookID: newBook.bookID, 
        image: directLink,
    })


    res.redirect('/seller/product/list')
  }

  // [GET] /product/rating
  async showRating(req, res) {
    return res.json(
      await sequelize.query(
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
      )
    );
  }

  // [PUT] /product/:id
  async updateBook(req, res) {
    return await Book.update(
      req.body,
      {
        where: {
          bookID: req.params.id,
        },
      },
    );
  }

  // [DELETE] /product/:id
  async deleteBook(req, res) {
    return await Book.destroy({
      where: {
        bookID: req.params.id,
      },
    });
  }
}

module.exports = new BookController();
