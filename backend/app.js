const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { db } = require("./db/db.js");
const { readdirSync } = require("fs");

app.use(express.json());
app.use(cors());
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

//routes
readdirSync("./routes").map((route) =>
  app.use("", require("./routes/" + route))
);

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Listen Port:", PORT);
  });
};

server();
