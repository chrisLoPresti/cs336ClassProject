import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Grid, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  getBars,
  clearBars,
  getTopBrands,
  clearBar,
  getSpenders,
  getSales,
  getSalesTime
} from "../../actions/barActions";
import Table from "./bartable";
import ChartPicker from "../charts/chartPicker";
import BarChart from "../charts/barchart";
import BarChartPeriod from "../charts/barchartperiod";
import BarChartTime from "../charts/chartstime";
import "./bar.css";

let scrollToElement = require("scroll-to-element");

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      windowWidth: 0,
      selectedBar: "",
      selectedDay: "Monday",
      changingDay: false
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.getBars();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowDimensions);
    this.props.clearBars();
  };

  updateWindowDimensions = event => {
    if (
      this.state.windowWidth === 0 ||
      (this.state.windowWidth < 900 && window.innerWidth >= 900) ||
      (this.state.windowWidth >= 900 && window.innerWidth < 900)
    )
      this.setState({ windowWidth: window.innerWidth });
  };

  clearSelected = () => {
    this.setState(
      {
        selectedBar: "",
        selectedDay: "Monday"
      },
      () => this.props.clearBar()
    );
  };

  handleSelectedBar = name => () => {
    this.setState(
      {
        selectedBar: name
      },
      () => this.populateBar()
    );
  };

  populateBar = () => {
    this.getTopManfOnDay();
    this.props.getSpenders(this.state.selectedBar);
    this.props.getSales(this.state.selectedBar);
    this.props.getSalesTime(this.state.selectedBar);
  };

  getTopManfOnDay = () => {
    let params = {};
    params.bar = this.state.selectedBar;
    params.day = this.state.selectedDay;
    this.props.getTopBrands(params);
  };

  changeDay = day => {
    this.setState({ selectedDay: day }, () => this.getTopManfOnDay());
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
      !this.props.bars.loadingBarsOne &&
      document.getElementById("graph-section")
    ) {
      scrollToElement("#graph-section", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    }
    return (
      <div id="bar-container">
        <div id="small-page" className="bar-image">
          <div id="small-title">
            <Typography className="small-title-text" variant="h3">
              Explore Our Bars
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
              First pick a bar. You can sort the list by name or state. You can
              also search for a bar by name. To select a bar, just click on
              their row in the table. You can switch bars at any time, or clear
              the currently selected bar.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 2
            </Typography>
            <Typography className="step-text">
              Once you select a bar, by clicking on their name in the table, we
              will give you some bar graphs containing statistics about the bar.
              Once you select a bar you will automatically scroll to the graphs
              once they load. Hover over the bars in the graph to get detailed
              results.
            </Typography>
          </Grid>
        </Grid>
        {this.props.bars.loadingBars && (
          <img
            src={require("../../images/spinner.gif")}
            alt="loading..."
            style={{ width: "100px", margin: "auto", display: "block" }}
          />
        )}
        {Object.keys(this.props.bars.bars).length > 0 && (
          <div id="selected-bar-container">
            <Typography className="selected-bar">
              {`Selected Bar:  ${this.state.selectedBar}`}
              {this.state.selectedBar && (
                <IconButton
                  className="clear-button-selected-bar"
                  onClick={this.clearSelected}
                >
                  <Close className="close-button-selected-bar" />
                </IconButton>
              )}
            </Typography>
            {!this.props.bars.loadingBars && (
              <Table
                bars={this.props.bars}
                selectedBar={this.state.selectedBar}
                handleSelectedBar={this.handleSelectedBar}
                loading={this.props.bars.loadingBars}
              />
            )}
          </div>
        )}
        {this.state.selectedBar && (
          <div id="graph-section">
            <Grid container>
              {!this.props.bars.loadingBarsOne &&
                Object.keys(this.props.bars.topManf).length && (
                  <Grid item xs={12}>
                    <ChartPicker
                      list={this.props.bars.topManf}
                      size={this.state.windowWidth}
                      title={`${
                        this.state.selectedBar
                      }'s top 10 Popular Brands on ${this.state.selectedDay}'s`}
                      color={colors[Math.floor(Math.random() * colors.length)]}
                      x={"Brand"}
                      y={"Sales"}
                      changeDay={this.changeDay}
                    />
                  </Grid>
                )}
              {this.props.bars.loadingBarsOne && (
                <Grid item xs={12}>
                  <img
                    src={require("../../images/spinner.gif")}
                    alt="loading..."
                    style={{ width: "100px", margin: "auto", display: "block" }}
                  />
                </Grid>
              )}
              {Object.keys(this.props.bars.spenders).length && (
                <Grid item xs={12} sm={6}>
                  <BarChart
                    list={this.props.bars.spenders}
                    size={this.state.windowWidth}
                    title={`${
                      this.state.selectedBar
                    }'s top 10 Largest Spenders`}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    x={"Drinker"}
                    y={"Total money spent"}
                  />
                </Grid>
              )}
              {Object.keys(this.props.bars.sales).length && (
                <Grid item xs={12} sm={6}>
                  <BarChartPeriod
                    list={this.props.bars.sales}
                    size={this.state.windowWidth}
                    title={`${
                      this.state.selectedBar
                    }'s Sales Distribution By Day`}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    x={"Period"}
                    y={"Average Sales"}
                  />
                </Grid>
              )}
              {Object.keys(this.props.bars.time).length && (
                <Grid item xs={12}>
                  <BarChartTime
                    list={this.props.bars.time}
                    size={this.state.windowWidth}
                    title={`${
                      this.state.selectedBar
                    }'s Sales Distribution By Time Of Day`}
                    color={colors[Math.floor(Math.random() * colors.length)]}
                    x={"Time of day"}
                    y={"Average Sales"}
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

Bar.propTypes = {
  bars: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
Bar.defaultProps = {
  bars: {},
  spenders: {}
};

const mapStateToProps = state => ({
  bars: state.bars,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    getBars,
    clearBars,
    getTopBrands,
    clearBar,
    getSpenders,
    getSales,
    getSalesTime
  }
)(withRouter(Bar));
