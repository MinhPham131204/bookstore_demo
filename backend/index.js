const path = require('path')
const express = require("express");
const handlebars = require('express-handlebars');
const app = express();

const route = require("./routing/seller/index");

const port = 5000;

app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());

app.engine('.hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('views', './views')

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
