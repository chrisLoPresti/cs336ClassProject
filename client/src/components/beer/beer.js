import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Typography, Grid, IconButton, Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import {
  getBeers,
  clearBeers,
  soldMost,
  biggestConsmers,
  timeDistribution,
  clearSelectedBeer
} from "../../actions/beerActions";
import Table from "./beertable";
import BarChart from "../charts/barchart";
import BarChartTime from "../charts/chartstime";
import "./beer.css";

let scrollToElement = require("scroll-to-element");

class Beer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedBeer: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getBeers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    this.props.clearBeers();
  };

  handleSelectedBeer = name => () => {
    this.setState(
      {
        selectedBeer: name
      },
      () => this.populateBeerInfo()
    );
  };

  clearSelected = () => {
    this.setState(
      {
        selectedBeer: ""
      },
      () => this.props.clearSelectedBeer()
    );
  };

  populateBeerInfo = () => {
    this.props.timeDistribution(this.state.selectedBeer);
    this.props.soldMost(this.state.selectedBeer);
    this.props.biggestConsmers(this.state.selectedBeer);
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
      this.props.beer.count === 3 &&
      document.getElementById("graph-section")
    ) {
      scrollToElement("#graph-section", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    }
    const noInfo =
      Object.keys(this.props.beer.soldMost).length <= 0 &&
      Object.keys(this.props.beer.biggestConsumers).length <= 0 &&
      Object.keys(this.props.beer.timeDistribution).length <= 0;
    return (
      <div id="beer-container">
        <div id="small-page" className="beer-image">
          <div id="small-title" className="push-down">
            <Typography className="small-title-text" variant="h3">
              Explore Our Beers
            </Typography>
          </div>
        </div>
        <div className="small-layer" />
        <div id="lets-get-started">
          <Typography
            id="beer-start"
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
              First pick a beer. You can sort the list by beer name or
              manufacturer. You can also search for a beer by name. To select a
              beer, just click on its row in the table. You can switch beers at
              any time, or clear the currently selected beer.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 2
            </Typography>
            <Typography className="step-text">
              Once you select a beer we will give you some beer graphs
              containing statistics about the beer. Once you select a beer you
              will automatically scroll to the graphs once they load. Hover over
              the beers in the graph to get detailed results.
            </Typography>
          </Grid>
          {(this.props.beer.loadingManf ||
            (this.state.selectedBeer && this.props.beer.count !== 3)) && (
            <Grid item xs={12}>
              <img
                src={require("../../images/spinner.gif")}
                alt="loading..."
                style={{ width: "100px", margin: "auto", display: "block" }}
              />
            </Grid>
          )}
        </Grid>
        {Object.keys(this.props.beer.beers).length > 0 && (
          <div id="selected-beer-container">
            <Typography className="selected-beer">
              {`Selected Beer:  ${this.state.selectedBeer}`}
              {this.state.selectedBeer && (
                <IconButton
                  className="clear-button-selected-beer"
                  onClick={this.clearSelected}
                >
                  <Close className="close-button-selected-beer" />
                </IconButton>
              )}
            </Typography>
            {!this.props.beer.loadingManf && (
              <Table
                beer={this.props.beer}
                selectedBeer={this.state.selectedBeer}
                handleSelectedBeer={this.handleSelectedBeer}
                loading={this.props.beer.loadingManf}
              />
            )}
          </div>
        )}
        {Object.keys(this.props.beer.beers).length <= 0 &&
          !this.props.beer.loadingManf && (
            <Grid container>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography style={{ fontSize: "30px", marginTop: "30px" }}>
                  There are currently no beers in our table
                </Typography>
              </Grid>
            </Grid>
          )}
        {noInfo && this.state.selectedBeer && !this.props.beer.loadingManfOne && (
          <Grid container>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "30px", marginTop: "30px" }}>
                No information on {this.state.selectedBeer}
              </Typography>
            </Grid>
          </Grid>
        )}
        {this.state.selectedBeer && this.props.beer.count === 3 && (
          <div id="graph-section">
            <Grid container>
              {this.state.selectedBeer &&
                !noInfo &&
                !this.props.beer.loadingManfOne && (
                  <Grid item xs={12}>
                    <div id="lets-get-started">
                      <Typography
                        variant="h4"
                        className="lets-get-started-text"
                      >
                        Results for {this.state.selectedBeer}
                      </Typography>
                    </div>
                  </Grid>
                )}
              {this.state.selectedBeer &&
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
                      Clear Selected Beer
                    </Button>
                  </Grid>
                )}
              {Object.keys(this.props.beer.soldMost).length && (
                <Grid item xs={12} sm={6}>
                  <BarChart
                    list={this.props.beer.soldMost}
                    title={`Top 10 bars that sell the most ${
                      this.state.selectedBeer
                    }s`}
                    color={colors[0]}
                    x={"Bar"}
                    y={"Total sold"}
                  />
                </Grid>
              )}
              {Object.keys(this.props.beer.biggestConsumers).length && (
                <Grid item xs={12} sm={6}>
                  <BarChart
                    list={this.props.beer.biggestConsumers}
                    title={`Top 10 people who drink ${this.state.selectedBeer}`}
                    color={colors[1]}
                    x={"Drinker"}
                    y={"Total consumed"}
                  />
                </Grid>
              )}
              {Object.keys(this.props.beer.timeDistribution).length && (
                <Grid item xs={12}>
                  <BarChartTime
                    list={this.props.beer.timeDistribution}
                    title={`Times when ${
                      this.state.selectedBeer
                    } sells the most`}
                    color={colors[2]}
                    x={"Time"}
                    y={"Average sales"}
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

Beer.propTypes = {
  beer: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
Beer.defaultProps = {
  beer: { beers: [] }
};

const mapStateToProps = state => ({
  beer: state.beer,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {
    getBeers,
    clearBeers,
    soldMost,
    biggestConsmers,
    timeDistribution,
    clearSelectedBeer
  }
)(withRouter(Beer));
