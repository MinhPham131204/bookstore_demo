const express = require("express");
const app = express();

const book = require("./controller/book");

const port = 5000;

app.get("/", async (req, res) => {
  try {
    var people = await book.getById();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
