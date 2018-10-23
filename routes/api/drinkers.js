const express = require("express");
const router = express.Router();

//connect to mysql
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "project336.cuyc1x8g0d0t.us-east-1.rds.amazonaws.com",
  user: "student",
  password: "Database123",
  database: "project336"
});
db.connect(err => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("connected to db");
});

router.get("/", (req, res) => {
  let sql = "SELECT * FROM Drinker";
  db.query(sql, (err, results) => {
    if (err) {
      let errors = {};
      errors.error = "Could not process request";
      res.status(404).send(errors.error);
    }
    res.send(results);
  });
});

module.exports = router;
