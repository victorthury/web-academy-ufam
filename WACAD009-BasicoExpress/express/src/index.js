const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const server = express();
const PORT = process.env.PORT ?? 3000;

server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
