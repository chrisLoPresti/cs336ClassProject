import React from "react";
import { Typography, Button } from "@material-ui/core";
import About from "./about/about";
import Project from "./project/project";
import { withRouter } from "react-router-dom";
import "./landingpage.css";

let scrollToElement = require("scroll-to-element");

const LandingPage = () => (
  <div id="landing-container">
    <div id="landing-page" />
    <div className="layer" />
    <div id="title">
      <Typography className="title-text" variant="h1">
        BarBeerDrinker+
      </Typography>
      <div className="title-buttons">
        <Button
          className="title-button"
          onClick={() =>
            scrollToElement("#about-container", {
              offset: -52,
              ease: "inOutCube",
              duration: 1000
            })
          }
        >
          About Us
        </Button>
        <Button className="title-button">Get Started</Button>
      </div>
    </div>
    <About />
    <Project />
  </div>
);

export default withRouter(LandingPage);
