import React from "react";
import { Typography, Button } from "@material-ui/core";
import About from "./about/about";
import Project from "./project/project";
import { withRouter } from "react-router-dom";
import "./landingpage.css";

let scrollToElement = require("scroll-to-element");

const LandingPage = props => {
  window.scrollTo(0, 0);
  return (
    <div id="landing-container">
      <div id="large-page" className="landing-image" />
      <div className="large-layer" />
      <div id="large-title">
        <Typography className="large-title-text" variant="h3">
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
          <Button
            className="title-button"
            onClick={() =>
              scrollToElement("#project-container", {
                offset: -52,
                ease: "inOutCube",
                duration: 1000
              })
            }
          >
            Explore
          </Button>
        </div>
      </div>
      <About />
      <Project {...props} />
    </div>
  );
};

export default withRouter(LandingPage);
