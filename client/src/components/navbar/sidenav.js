import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Drawer, Typography } from "@material-ui/core";
import "font-awesome/css/font-awesome.min.css";
import PropTypes from "prop-types";
import "./navbar.css";

class Sidenav extends Component {
  render() {
    const props = this.props;
    return (
      <Drawer anchor="right" open={props.open} onClose={props.toggleDrawer}>
        <div id="side-nav-container">
          <Typography
            className="side-nav-text"
            onClick={() => {
              props.toggleDrawer();
              props.history.push("/bars");
            }}
          >
            <i className="fa fa-building icon" />
            Bar
          </Typography>
          <Typography
            className="side-nav-text"
            onClick={() => {
              props.toggleDrawer();
              props.history.push("/beers");
            }}
          >
            <i className="fa fa-beer icon" />
            Beer
          </Typography>
          <Typography
            className="side-nav-text"
            onClick={() => {
              props.toggleDrawer();
              props.history.push("/drinker");
            }}
          >
            <i className="fa fa-user icon" />
            Drinker
          </Typography>
          <Typography
            className="side-nav-text"
            onClick={() => {
              props.toggleDrawer();
              props.history.push("/randomQuery");
            }}
          >
            <i className="fa fa-laptop icon" />
            Query
          </Typography>
          <Typography
            className="side-nav-text"
            onClick={props.scrollOrChangeToAbout(props)}
          >
            <i className="fa fa-question-circle icon" />
            About
          </Typography>
        </div>
      </Drawer>
    );
  }
}

Sidenav.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  scrollOrChangeToAbout: PropTypes.func.isRequired
};
export default withRouter(Sidenav);
