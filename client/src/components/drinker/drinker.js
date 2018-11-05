import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import BarChart from "../charts/barchart";
import BarChartComponentPeriod from "../charts/barchartperiod";
import BarChartSpending from "../charts/barchartspending";
import {
  getDrinkers,
  getDrinker,
  getTopBeers,
  clearDrinkers,
  clearDrinker,
  getDailySpending,
  getWeeklySpending,
  getMonthlySpending,
  getSpending,
  clearCount
} from "../../actions/drinkersActions";
import Table from "./drinkertable";
import Transactions from "../transactions/transactions";
import "./drinker.css";

let scrollToElement = require("scroll-to-element");

class Drinker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedName: "",
      windowWidth: 200
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.getDrinkers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
  };

  updateWindowDimensions = event => {
    if (
      this.state.windowWidth === "" ||
      (this.state.windowWidth < 900 && window.innerWidth >= 900) ||
      (this.state.windowWidth >= 900 && window.innerWidth < 900)
    )
      this.setState({ windowWidth: window.innerWidth });
  };

  handleSelectDrinker = name => () => {
    this.setState(
      {
        selectedName: name
      },
      () => this.populateDrinker()
    );
  };

  populateDrinker = () => {
    this.props.clearCount();
    this.props.getDrinker(this.state.selectedName);
    this.props.getTopBeers(this.state.selectedName);
    this.props.getDailySpending(this.state.selectedName);
    this.props.getWeeklySpending(this.state.selectedName);
    this.props.getMonthlySpending(this.state.selectedName);
    this.props.getSpending(this.state.selectedName);
  };

  clearSelected = () => {
    this.setState(
      {
        selectedName: ""
      },
      () => this.props.clearDrinker()
    );
  };

  render() {
    const colors = [
      "#001f3f",
      "#0074D9",
      "#FF4136",
      "#B10DC9",
      "#FF851B",
      "#FFD700",
      "#7FDBFF",
      "#85144b",
      "#2ECC40"
    ];
    if (
      !this.props.drinkers.loadingOneDrinker &&
      document.getElementById("graph-section")
    ) {
      scrollToElement("#graph-section", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    }
    return (
      <div id="drinker-container">
        <div id="small-page" className="drinkers-image">
          <div id="small-title">
            <Typography className="small-title-text" variant="h3">
              Explore Our Drinkers
            </Typography>
          </div>
        </div>
        <div className="small-layer" />
        <div id="lets-get-started">
          <Typography variant="h4" className="lets-get-started-text">
            How To Get Started
          </Typography>
        </div>
        <Grid container className="step-container">
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 1
            </Typography>
            <Typography className="step-text">
              First pick a drinker. You can sort the list by name, phone number,
              or state. You can also search for someone by name. To select a
              drinker, just click on their row in the table. You can switch
              drinkers at any time.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 2
            </Typography>
            <Typography className="step-text">
              Once you selected a drinker, we will give you some bar graphs
              containing statistics about the drinker. Just scroll down and
              check out the graphs!
            </Typography>
          </Grid>
        </Grid>
        {Object.keys(this.props.drinkers.drinkers).length > 0 && (
          <div id="selected-drinker-container">
            <Typography className="selected-drinker">
              {`Selected Drinker:  ${this.state.selectedName}`}
              {this.state.selectedName && (
                <IconButton
                  className="clear-button-selected-drinker"
                  onClick={this.clearSelected}
                >
                  <Close className="close-button-selected-drinker" />
                </IconButton>
              )}
            </Typography>
            {!this.props.drinkers.loadingDrinker && (
              <Table
                drinkers={this.props.drinkers}
                selectedName={this.state.selectedName}
                handleSelectDrinker={this.handleSelectDrinker}
                loading={this.props.drinkers.loadingDrinker}
              />
            )}
          </div>
        )}
        {(this.props.drinkers.loadingDrinker ||
          (this.state.selectedName && this.props.drinkers.count !== 6)) && (
          <img
            src={require("../../images/spinner.gif")}
            alt="loading..."
            style={{ width: "100px", margin: "auto", display: "block" }}
          />
        )}
        {this.state.selectedName &&
          this.props.drinkers.count === 6 && (
            <div id="graph-section">
              <Grid container>
                <Grid item xs={12}>
                  <Typography className="grouped-by-bar-text">
                    {this.state.selectedName}
                    's transactions by bar
                  </Typography>
                  <Transactions transactions={this.props.drinkers.drinker} />
                </Grid>
                <Grid item xs={12}>
                  <BarChartSpending
                    list={this.props.drinkers.spending}
                    size={this.state.windowWidth}
                    title={`${this.state.selectedName}'s spending per bar`}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    x={"Bar"}
                    y={"Amount spent"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BarChart
                    list={this.props.drinkers.topBeers}
                    size={this.state.windowWidth}
                    title={`${this.state.selectedName}'s top 5 ordered beers`}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    x={"Beer"}
                    y={"Amount purchased"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BarChartComponentPeriod
                    list={this.props.drinkers.daily}
                    size={this.state.windowWidth}
                    title={`${this.state.selectedName}'s daily spending`}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    x={"Date (yyyy-mm-dd)"}
                    y={"Total money spent"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BarChartComponentPeriod
                    list={this.props.drinkers.weekly}
                    size={this.state.windowWidth}
                    title={`${this.state.selectedName}'s weekly spending`}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    x={"Week (0-52)"}
                    y={"Total money spent"}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <BarChartComponentPeriod
                    list={this.props.drinkers.monthly}
                    size={this.state.windowWidth}
                    title={`${this.state.selectedName}'s monthly spending`}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    x={"Month"}
                    y={"Total money spent"}
                  />
                </Grid>
              </Grid>
            </div>
          )}
      </div>
    );
  }
}

Drinker.propTypes = {
  drinkers: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
Drinker.defaultProps = {
  drinkers: {}
};

const mapStateToProps = state => ({
  drinkers: state.drinkers,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getDrinkers,
    getDrinker,
    getTopBeers,
    clearDrinkers,
    clearDrinker,
    getDailySpending,
    getWeeklySpending,
    getMonthlySpending,
    getSpending,
    clearCount
  }
)(withRouter(Drinker));
