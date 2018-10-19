import React from "react";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./notfound.css";

const frown = require("../../images/frown.png");
const NotFound = () => {
  return (
    <div id="not-found-container">
      <div id="not-found">
        <Typography variant="h1">404 Error</Typography>
        <Typography variant="h4">
          We're sorry, but the page your looking for does not exist
        </Typography>
        <img id="frown" src={frown} alt="page not found" />
      </div>
    </div>
  );
};

export default withRouter(NotFound);
