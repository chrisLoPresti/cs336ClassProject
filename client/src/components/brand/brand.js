import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Typography, Grid, IconButton, Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import {
  getManfs,
  clearManfs,
  getStates,
  getLikes,
  clearSelectedManf
} from "../../actions/beerActions";
import BrandTable from "./brandtable";
import BarChart from "../charts/barchart";
import "./brand.css";

let scrollToElement = require("scroll-to-element");

class Brand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedManf: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getManfs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    this.props.clearManfs();
  };

  handleSelectedManf = name => () => {
    this.setState(
      {
        selectedManf: name
      },
      () => this.populateSelected()
    );
  };

  clearSelected = () => {
    this.setState(
      {
        selectedManf: ""
      },
      () => this.props.clearSelectedManf()
    );
  };

  populateSelected = () => {
    this.props.getStates(this.state.selectedManf);
    this.props.getLikes(this.state.selectedManf);
  };

  render() {
    const colors = [
      "#0074D9",
      "#FF4136",
      "#B10DC9",
      "#FF851B",
      "#FFD700",
      "#7FDBFF",
      "#85144b"
    ];

    if (
      !this.props.beer.loadingManfOne &&
      this.props.beer.count === 2 &&
      document.getElementById("graph-section")
    ) {
      scrollToElement("#graph-section", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    }
    const noInfo =
      Object.keys(this.props.beer.likes).length <= 0 &&
      Object.keys(this.props.beer.states).length <= 0;

    return (
      <div id="brand-container">
        <div id="small-page" className="brand-image">
          <div id="small-title" className="push-down">
            <Typography className="small-title-text" variant="h3">
              Explore Our Manufacturers
            </Typography>
          </div>
        </div>
        <div className="small-layer" />
        <div id="lets-get-started">
          <Typography
            id="brand-start"
            variant="h4"
            className="lets-get-started-text"
          >
            How To Get Started
          </Typography>
        </div>
        <Grid container className="step-container">
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 1
            </Typography>
            <Typography className="step-text">
              First pick a manufacturer. You can sort the list by manufacturer
              name. You can also search for a manufacturer by name. To select a
              manufacturer, just click on its row in the table. You can switch
              manufacturers at any time, or clear the currently selected
              manufacturer.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 2
            </Typography>
            <Typography className="step-text">
              Once you select a manufacturer we will give you some manufacturer
              graphs containing statistics about the manufacturer. Once you
              select a manufacturer you will automatically scroll to the graphs
              once they load. Hover over the manufacturers in the graph to get
              detailed results.
            </Typography>
          </Grid>
          {(this.props.beer.loadingManf ||
            (this.state.selectedManf && this.props.beer.count !== 2)) && (
            <Grid item xs={12}>
              <img
                src={require("../../images/spinner.gif")}
                alt="loading..."
                style={{ width: "100px", margin: "auto", display: "block" }}
              />
            </Grid>
          )}
        </Grid>
        {Object.keys(this.props.beer.manfs).length > 0 && (
          <div id="selected-brand-container">
            <Typography className="selected-brand">
              {`Selected Manufacturer:  ${this.state.selectedManf}`}
              {this.state.selectedManf && (
                <IconButton
                  className="clear-button-selected-brand"
                  onClick={this.clearSelected}
                >
                  <Close className="close-button-selected-brand" />
                </IconButton>
              )}
            </Typography>
            {!this.props.beer.loadingManf &&
              this.props.beer.manfs.length > 0 && (
                <BrandTable
                  beer={this.props.beer}
                  selectedManf={this.state.selectedManf}
                  handleSelectedManf={this.handleSelectedManf}
                  loading={this.props.beer.loadingManf}
                />
              )}
          </div>
        )}
        {Object.keys(this.props.beer.manfs).length <= 0 &&
          !this.props.beer.loadingManf && (
            <Grid container>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography style={{ fontSize: "30px", marginTop: "30px" }}>
                  There are currently no manufacturers in our table
                </Typography>
              </Grid>
            </Grid>
          )}
        {noInfo && this.state.selectedManf && !this.props.beer.loadingManfOne && (
          <Grid container>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "30px", marginTop: "30px" }}>
                No information on {this.state.selectedManf}
              </Typography>
            </Grid>
          </Grid>
        )}
        {this.state.selectedManf && this.props.beer.count === 2 && (
          <div id="graph-section">
            <Grid container>
              {this.state.selectedManf &&
                !noInfo &&
                !this.props.beer.loadingManfOne && (
                  <Grid item xs={12}>
                    <div id="lets-get-started">
                      <Typography
                        variant="h4"
                        className="lets-get-started-text"
                      >
                        Results for {this.state.selectedManf}
                      </Typography>
                    </div>
                  </Grid>
                )}
              {this.state.selectedManf &&
                !noInfo &&
                !this.props.beer.loadingManfOne && (
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button
                      style={{
                        backgroundColor: "#303030",
                        color: "white",
                        marginTop: "30px"
                      }}
                      onClick={this.clearSelected}
                    >
                      Clear Selected Manufacturer
                    </Button>
                  </Grid>
                )}
              {Object.keys(this.props.beer.states).length && (
                <Grid item xs={12}>
                  <BarChart
                    list={this.props.beer.states}
                    title={`Top 10 States That Sold The Most ${
                      this.state.selectedManf
                    } Product In The Last Week`}
                    color={colors[0]}
                    x={"State"}
                    y={"Total product sold"}
                  />
                </Grid>
              )}
              {Object.keys(this.props.beer.likes).length && (
                <Grid item xs={12}>
                  <BarChart
                    list={this.props.beer.likes}
                    title={`Top 10 States Where People Like ${
                      this.state.selectedManf
                    } Product The Most In The Last Weeek`}
                    color={colors[1]}
                    x={"State"}
                    y={"Total likes"}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

Brand.propTypes = {
  beer: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
Brand.defaultProps = {
  beer: {}
};

const mapStateToProps = state => ({
  beer: state.beer,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getManfs, clearManfs, getStates, clearSelectedManf, getLikes }
)(withRouter(Brand));
