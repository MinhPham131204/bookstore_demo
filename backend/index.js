const express = require("express");
const cookieParser = require('cookie-parser')
const handlebars = require('express-handlebars');
const app = express();

const routeCustomer = require("./routing/customer/index");
const routeSeller = require("./routing/seller/index");

const port = 5000;

app.use(cookieParser())

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

routeCustomer(app);
routeSeller(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
