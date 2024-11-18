const { Sequelize } = require("sequelize");

const customer = require("../model/customer");
const seller = require("../model/seller");
const cart = require("../model/cart")
const book = require("../model/book")
const category = require("../model/category")
const deliveryFee = require("../model/deliveryFee")
const discount = require("../model/discount")
const detail = require("../model/discountDetail")
const image = require("../model/image")
const order = require("../model/order")
const orDetail = require("../model/orderDetail")
const sale = require("../model/preferential")
const rating = require("../model/rating")

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.SQL_PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);

const db = {};

db.Customer = customer(sequelize)
db.Seller = seller(sequelize)
db.Book = book(sequelize)
db.Cart = cart(sequelize)
db.category = category(sequelize)
db.DeliveryFee = deliveryFee(sequelize)
db.Discount = discount(sequelize)
db.DiscountDetail = detail(sequelize)
db.BookImage = image(sequelize)
db.Orders = order(sequelize)
db.OrderDetail = orDetail(sequelize)
db.Preferential = sale(sequelize)
db.Rating = rating(sequelize)

sequelize.sync({ 
  alter: true,
  force: true
});

module.exports = db;