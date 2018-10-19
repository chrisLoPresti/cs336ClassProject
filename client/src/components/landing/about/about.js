import React from "react";
import { Typography, Grid } from "@material-ui/core";
import "./about.css";

const chris = require("../../../images/profile.jpg");
const tech = require("../../../images/reactflask.jpeg");

const About = () => {
  return (
    <div id="about-container">
      <Typography id="about-us-title" variant="h4">
        About Us
      </Typography>
      <Grid container>
        <Grid className="image-container-grid " item xs={6} sm={4}>
          <img className="profile-image left" src={chris} alt="Chris" />
          <Typography className="profile-text profile-text-left">
            Christopher LoPresti
            <br />
            Senior
          </Typography>
        </Grid>
        <Grid className="image-container-grid " item xs={6} sm={4}>
          <img className="profile-image right" src={chris} alt="Chris" />
          <Typography className="profile-text profile-text-right">
            Christopher LoPresti
            <br />
            Senior
          </Typography>
        </Grid>
        <Grid className="image-container-grid " item xs={12} sm={4}>
          <img className="profile-image bottom" src={chris} alt="Chris" />
          <Typography className="profile-text profile-text-bottom">
            Christopher LoPresti
            <br />
            Senior
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} className="about-us-text-grid">
          <img className="tech" src={tech} alt="Technologies" />
        </Grid>
        <Grid item xs={12} sm={6} className="about-us-text-grid">
          <Typography variant="h4" id="what-we-used">
            What we used...
          </Typography>
          <Typography id="about-us-text">
            We are all seniors here at Rutgers University trying to win best
            design for the bar beer drinker plus project. We each know various
            programming languages, but for this project we used React js for our
            front end, python to populate our tables, SQL to interact with our
            tables, and flask to execute our requests. On the front end we use
            axios to make api requests, and redux to keep our state in check.
            This allows us to make api calls and populate our page without
            needing to get a whole new page from the server.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default About;
