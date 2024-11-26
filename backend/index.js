const express = require("express");
const app = express();

const discount = require("./controller/seller/discount");
const dashboard = require('./controller/seller/dashboard')
const stock = require('./controller/seller/stock')
const order = require('./controller/seller/order');
const route = require("./routing/seller/index");

const port = 5000;

route(app)

app.get("/discount", async (req, res) => {
  try {
    var people = await discount.showDiscountList();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    var people = await dashboard.topSoldBook();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

app.get("/stock", async (req, res) => {
  try {
    var people = await stock.countByCategory();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

app.get("/order", async (req, res) => {
  try {
    var people = await order.allOrderInMonth();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
