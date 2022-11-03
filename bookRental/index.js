const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const dbConfig = require("./config/db.config");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors("*"));

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/book");

app.use("/", authRoutes);
app.use("/", bookRoutes);

//Database Connection
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.port,
  database: dbConfig.DB,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});

const PORT = process.env.PORT || 5000;

connection.connect(function (err) {
  if (err) {
    console.log("Error!");
    console.log(err);
  } else {
    console.log("AD database connected!");
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  }
});
