const express = require("express");
const app = express();

const route = require("./routing/seller/index");

const port = 5000;

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
