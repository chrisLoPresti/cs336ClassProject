import React from "react";
import { Typography, Grid } from "@material-ui/core";
import "./about.css";

const chris = require("../../../images/profile.jpg");
const aryeh = require("../../../images/aryeh.jpg");
const jenny = require("../../../images/jenny.png");

const tec = require("../../../images/tec.png");

const About = () => {
  return (
    <div id="about-container">
      <Typography id="about-us-title" variant="h4">
        About Us
      </Typography>
      <Grid container>
        <Grid className="image-container-grid " item xs={6} sm={4}>
          <img className="profile-image bottom" src={jenny} alt="Jenny" />
          <Typography className="profile-text profile-text-left">
            Jenny Skripko
            <br />
            Senior
          </Typography>
        </Grid>
        <Grid className="image-container-grid " item xs={6} sm={4}>
          <img className="profile-image bottom" src={aryeh} alt="Aryeh" />
          <Typography className="profile-text profile-text-right">
            Aryeh Pechet
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
        <Grid item sm={12} md={6} className="about-us-text-grid">
          <Typography variant="h4" id="what-we-used">
            What we used
          </Typography>
          <Typography id="about-us-text">
            BarBeerDrinker+ was a project designed and implemented by Chris
            LoPresti, Aryeh Pechet and Jenny Skripko. Together we created a full
            stack b app using the technologies presented in our full stack app
            picture. The front end is powered using React, Redux, Axios, Node
            JS, Express JS, while the majority of our API calls are powered by
            Flask. Our data is all living on AWS and powered by MySQL. The
            website itself is hosted on Heroku. Together, the three of us hope
            to win best design, which would be a good way to end our fall
            semester of our senior year.
          </Typography>
        </Grid>
        <Grid item sm={12} md={6} className="about-us-text-grid">
          <img className="tech" src={tec} alt="Technologies" />
        </Grid>
      </Grid>
    </div>
  );
};
export default About;
