const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const axios = require("axios");
var timeout = require("connect-timeout"); //express v4

//sett up our app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(timeout(120000));

//set up routes
const randomQuery = require("./routes/api/randomQuery");
app.use("/api/randomQuery", randomQuery);

//serve static asses it in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));
  //directs all routes to the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// every day at 5:00am EST this call will update our inventory table to match the previous days inventory
var j = schedule.scheduleJob("0 5 * * *", function() {
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/daily/update/inventory"
    )
    .then(res => {
      console.log("Updated database at 5:00am");
    })
    .catch(err => {
      console.log(err);
    });
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/daily/update/shifts"
    )
    .then(res => {
      console.log("Updated database at 5:00am");
    })
    .catch(err => {
      console.log(err);
    });
  axios
    .post(
      "https://xja36rg9of.execute-api.us-east-1.amazonaws.com/dev/v1/daily/update/operates"
    )
    .then(res => {
      console.log("Updated database at 5:00am");
    })
    .catch(err => {
      console.log(err);
    });
});

//use the env. server port or localhost:5000
const port = process.env.PORT || 5000;
//listen on the port for incoming requests
app.listen(port, () => console.log(`Server running on port ${port}...`));
