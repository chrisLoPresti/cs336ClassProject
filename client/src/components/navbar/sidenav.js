import React from "react";
import { withRouter } from "react-router-dom";
import { Drawer, Typography } from "@material-ui/core";
import "font-awesome/css/font-awesome.min.css";
import PropTypes from "prop-types";
import "./navbar.css";

const Sidenav = props => {
  return (
    <Drawer anchor="right" open={props.open} onClose={props.toggleDrawer}>
      <div id="side-nav-container">
        <Typography className="side-nav-text">
          <i class="fa fa-building icon" />
          Bar
        </Typography>
        <Typography className="side-nav-text">
          <i className="fa fa-beer icon" />
          Beer
        </Typography>
        <Typography
          className="side-nav-text"
          onClick={() => this.props.history.push("/drinker")}
        >
          <i class="fa fa-user icon" />
          Drinker
        </Typography>
        <Typography
          className="side-nav-text"
          onClick={props.scrollOrChangeToAbout(props)}
        >
          <i class="fa fa-question-circle icon" />
          About
        </Typography>
      </div>
    </Drawer>
  );
};

Sidenav.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  scrollOrChangeToAbout: PropTypes.func.isRequired
};
export default withRouter(Sidenav);
