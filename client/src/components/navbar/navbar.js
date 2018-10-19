import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import SideNav from "./sidenav";
import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  IconButton
} from "@material-ui/core";
import Menu from "@material-ui/icons/Menu";
import "./navbar.css";

let scrollToElement = require("scroll-to-element");

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerNavOpen: false,
      scrolled: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  scrollOrChangeToLanding = props => () => {
    if (document.getElementById("landing-container")) {
      scrollToElement("#landing-container", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    } else {
      props.history.push("/");
    }
    this.setState({
      drawerNavOpen: false
    });
  };

  scrollOrChangeToAbout = props => () => {
    if (document.getElementById("about-container")) {
      scrollToElement("#about-container", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    } else {
      props.history.push("/");
      setTimeout(
        () =>
          scrollToElement("#about-container", {
            offset: -52,
            ease: "inOutCube",
            duration: 1000
          }),
        50
      );
    }
    this.setState({
      drawerNavOpen: false
    });
  };
  handleScroll = () => {
    const top =
      document.documentElement.scrollTop ||
      document.body.parentNode.scrollTop ||
      document.body.scrollTop;
    if (top < 80) {
      this.setState({
        scrolled: false
      });
    } else if (top >= 80) {
      this.setState({
        scrolled: true
      });
    }
  };

  toggleDrawer = () => {
    this.setState({
      drawerNavOpen: !this.state.drawerNavOpen
    });
  };

  render() {
    return (
      <div id="navbar-container">
        <AppBar
          id="appbar"
          className={classnames({ scrolled: this.state.scrolled })}
        >
          <Toolbar id="toolbar">
            <Grid container id="grid-container">
              <Grid className="grid-item" item xs={12} sm={4}>
                <Typography
                  id="nav-title"
                  onClick={this.scrollOrChangeToLanding(this.props)}
                >
                  BarBeerDrinker+
                </Typography>
                <IconButton id="menu" onClick={this.toggleDrawer}>
                  <Menu />
                </IconButton>
              </Grid>
              <Grid id="buttons" className="grid-item" item xs={1} sm={8}>
                <Typography
                  className="nav-content nav-text"
                  onClick={this.scrollOrChangeToAbout(this.props)}
                >
                  About
                </Typography>
                <Typography
                  className="nav-content nav-text"
                  onClick={() => this.props.history.push("/drinker")}
                >
                  Drinker
                </Typography>
                <Typography className="nav-content nav-text">Beer</Typography>
                <Typography className="nav-content nav-text">Bar</Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <SideNav
          open={this.state.drawerNavOpen}
          toggleDrawer={this.toggleDrawer}
          scrollOrChangeToAbout={this.scrollOrChangeToAbout}
        />
      </div>
    );
  }
}

export default withRouter(NavBar);
