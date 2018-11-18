const express = require("express");
const router = express.Router();

//connect to mysql
const mysql = require("mysql");

router.post("/", (req, res) => {
  let errors = {};
  const db = mysql.createConnection({
    host: "testing-server.cuyc1x8g0d0t.us-east-1.rds.amazonaws.com",
    user: "student",
    password: "Database123",
    database: "project336"
  });
  db.connect(err => {
    if (err) {
      console.log(err);
      errors.error = "Could not connect to database";
      res.status(404).send(errors.error);
      throw err;
    }
    console.log("connected to db");
  });
  let sql = req.body.query;
  db.query(sql, (err, results) => {
    if (err) {
      errors.error =
        "It seems there was an issue with your query. Please Try Again";
      res.status(404).send(errors.error);
    }
    res.send(results);
  });
});

module.exports = router;
