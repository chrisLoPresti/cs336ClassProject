import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Typography,
  Grid,
  IconButton,
  Button,
  ListItem,
  ListItemText
} from "@material-ui/core";
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
  getSalesTime,
  decrementCount,
  getFraction,
  getHours,
  getTop10ByDay,
  clearTop10Day
} from "../../actions/barActions";
import { getBarTop10, clearManfs } from "../../actions/beerActions";
import Table from "./bartable";
import ChartPicker from "../charts/chartPicker";
import BarChart from "../charts/barchart";
import BarChartPeriod from "../charts/barchartperiod";
import BarChartTime from "../charts/chartstime";
import MenuPicker from "./droplist";
import MenuPickerManf from "./droplistmanf";
import "./bar.css";

let scrollToElement = require("scroll-to-element");

var newFraction = [];

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedBar: "",
      selectedDay: "Monday",
      changingDay: false,
      top10Manf: "",
      top10Day: "",
      good: false,
      target: ""
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getBars();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    this.props.clearBars();
    this.props.clearManfs();
  };

  clearSelected = () => {
    newFraction = [];
    this.setState(
      {
        selectedBar: "",
        selectedDay: "Monday",
        target: ""
      },
      () => this.props.clearBar()
    );
  };

  handleSelectedBar = name => () => {
    newFraction = [];
    this.setState(
      {
        selectedBar: name,
        target: "graph"
      },
      () => this.populateBar()
    );
  };

  handleTop10Manf = manf => {
    if (manf === "") {
      this.setState({ top10Manf: manf, target: "" });
      return;
    }
    this.setState({ top10Manf: manf, target: "manf" }, () =>
      this.props.getBarTop10(manf)
    );
  };
  handleTop10Day = day => {
    if (day === "clear") {
      this.props.clearTop10Day("clear");
      this.setState({ top10Day: "", target: "" });
      return;
    }
    this.setState({ top10Day: day, target: "day" }, () =>
      this.props.getTop10ByDay(this.state.top10Day)
    );
  };

  populateBar = () => {
    this.props.clearBar();
    this.getTopManfOnDay();
    this.props.getSpenders(this.state.selectedBar);
    this.props.getSales(this.state.selectedBar);
    this.props.getSalesTime(this.state.selectedBar);
    this.props.getFraction(this.state.selectedBar);
    this.props.getHours(this.state.selectedBar);
  };

  getTopManfOnDay = () => {
    let params = {};
    params.bar = this.state.selectedBar;
    params.day = this.state.selectedDay;
    this.props.getTopBrands(params);
  };

  changeDay = day => {
    this.props.decrementCount();
    this.setState({ selectedDay: day, target: "graph" }, () =>
      this.getTopManfOnDay()
    );
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
      this.state.target === "graph" &&
      !this.props.bars.loadingBarsOne &&
      this.props.bars.count === 6 &&
      document.getElementById("graph-section")
    ) {
      scrollToElement("#graph-section", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    }

    if (
      this.state.target === "manf" &&
      this.props.beer.top10bar.length > 0 &&
      document.getElementById("analytics-section-manf")
    ) {
      scrollToElement("#analytics-section-manf", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    }

    if (
      this.state.target === "day" &&
      document.getElementById("analytics-section-day")
    ) {
      scrollToElement("#analytics-section-day", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
    }
    const noInfo =
      Object.keys(this.props.bars.topManf).length <= 0 &&
      Object.keys(this.props.bars.spenders).length <= 0 &&
      Object.keys(this.props.bars.sales).length <= 0 &&
      Object.keys(this.props.bars.time).length <= 0 &&
      Object.keys(this.props.bars.fraction).length <= 0;

    if (
      this.props.bars.count === 6 &&
      Object.keys(this.props.bars.fraction).length > 0 &&
      !this.props.bars.loadingBarsOne &&
      !newFraction.length
    ) {
      for (var x = 0; x < Object.keys(this.props.bars.fraction).length; ++x) {
        newFraction.push(this.props.bars.fraction[x]);
        newFraction[x].total = (parseFloat(newFraction[x].total) * 100).toFixed(
          2
        );
      }
    }
    return (
      <div id="bar-container">
        <div id="small-page" className="bar-image">
          <div id="small-title" className="push-down">
            <Typography className="small-title-text" variant="h3">
              Explore Our Bars
            </Typography>
          </div>
          <div id="small-title-button" className="push-down">
            <Button
              id="small-tittle-button-button"
              onClick={() =>
                scrollToElement("#statistics", {
                  offset: -52,
                  ease: "inOutCube",
                  duration: 1000
                })
              }
            >
              Statistics
            </Button>
            <Button
              id="small-tittle-button-button"
              onClick={() =>
                scrollToElement("#analytics", {
                  offset: -52,
                  ease: "inOutCube",
                  duration: 1000
                })
              }
            >
              Analytics
            </Button>
          </div>
        </div>
        <div className="small-layer" />
        <div id="lets-get-started">
          <Typography
            id="statistics"
            variant="h4"
            className="lets-get-started-text"
          >
            Indivudal Bar Statistics
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
        {(this.props.bars.loadingBars ||
          (this.state.selectedBar && this.props.bars.count !== 6)) && (
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
        {Object.keys(this.props.bars.bars).length <= 0 &&
          !this.props.bars.loadingBars && (
            <Grid container>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography style={{ fontSize: "30px", marginTop: "30px" }}>
                  There are currently no bars in our table
                </Typography>
              </Grid>
            </Grid>
          )}
        {noInfo && this.state.selectedBar && !this.props.bars.loadingBarsOne && (
          <Grid container>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography style={{ fontSize: "30px", marginTop: "30px" }}>
                No information on {this.state.selectedBar}
              </Typography>
            </Grid>
          </Grid>
        )}
        {this.state.selectedBar && (
          <div id="graph-section">
            <Grid container>
              {this.state.selectedBar &&
                !noInfo &&
                !this.props.bars.loadingBarsOne && (
                  <Grid item xs={12}>
                    <div id="lets-get-started">
                      <Typography
                        variant="h4"
                        className="lets-get-started-text"
                      >
                        Results for {this.state.selectedBar}
                      </Typography>
                    </div>
                  </Grid>
                )}
              {this.state.selectedBar &&
                !noInfo &&
                !this.props.bars.loadingBarsOne && (
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button
                      style={{
                        backgroundColor: "#303030",
                        color: "white",
                        marginTop: "30px"
                      }}
                      onClick={this.clearSelected}
                    >
                      Clear Selected Bar
                    </Button>
                  </Grid>
                )}
              {!this.props.bars.loadingBarsOne &&
                Object.keys(this.props.bars.hours).length && (
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      style={{ textAlign: "center", margin: "40px" }}
                    >
                      Hours Of Opperations
                    </Typography>
                  </Grid>
                )}
              {!this.props.bars.loadingBarsOne &&
                this.props.bars.hours.length > 0 &&
                this.props.bars.hours.slice(0, 6).map(day => (
                  <Grid key={day.day} item xs={4}>
                    <ListItem style={{ textAlign: "center" }}>
                      <ListItemText
                        style={{ textAlign: "center" }}
                        primary={day.day}
                        secondary={`${day.start} - ${day.end}`}
                      />
                    </ListItem>
                  </Grid>
                ))}
              {!this.props.bars.loadingBarsOne &&
                this.props.bars.hours.length > 0 &&
                this.props.bars.hours.slice(6, 7).map(day => (
                  <Grid key={day.day} item xs={12}>
                    <ListItem style={{ textAlign: "center" }}>
                      <ListItemText
                        style={{ textAlign: "center" }}
                        primary={day.day}
                        secondary={`${day.start} - ${day.end}`}
                      />
                    </ListItem>
                  </Grid>
                ))}
              {!this.props.bars.loadingBarsOne &&
                Object.keys(this.props.bars.topManf).length && (
                  <Grid item xs={12}>
                    <ChartPicker
                      list={this.props.bars.topManf}
                      title={`${
                        this.state.selectedBar
                      }'s top 10 Popular Brands on ${this.state.selectedDay}s`}
                      color={colors[0]}
                      x={"Brand"}
                      y={"Sales"}
                      changeDay={this.changeDay}
                    />
                  </Grid>
                )}
              {Object.keys(this.props.bars.spenders).length && (
                <Grid item xs={12} sm={6}>
                  <BarChart
                    list={this.props.bars.spenders}
                    title={`${
                      this.state.selectedBar
                    }'s top 10 Largest Spenders`}
                    color={colors[1]}
                    x={"Drinker"}
                    y={"Total money spent"}
                  />
                </Grid>
              )}
              {Object.keys(this.props.bars.sales).length && (
                <Grid item xs={12} sm={6}>
                  <BarChartPeriod
                    list={this.props.bars.sales}
                    title={`${
                      this.state.selectedBar
                    }'s Sales Distribution By Day`}
                    color={colors[2]}
                    x={"Day of the week"}
                    y={"Average Sales"}
                  />
                </Grid>
              )}
              {Object.keys(this.props.bars.time).length && (
                <Grid item xs={12} sm={6}>
                  <BarChartTime
                    list={this.props.bars.time}
                    title={`${
                      this.state.selectedBar
                    }'s Sales Distribution By Time Of Day`}
                    color={colors[3]}
                    x={"Time of day"}
                    y={"Average Sales"}
                  />
                </Grid>
              )}
              {Object.keys(this.props.bars.fraction).length && (
                <Grid item xs={12} sm={6}>
                  <BarChart
                    list={newFraction}
                    title={`${
                      this.state.selectedBar
                    }'s Avgerage % Of Inventory Sold Per Day`}
                    color={colors[4]}
                    x={"Day"}
                    y={"Average % sold"}
                  />
                </Grid>
              )}
            </Grid>
          </div>
        )}
        <div id="lets-get-started">
          <Typography
            id="analytics"
            variant="h4"
            className="lets-get-started-text"
          >
            Bar Analytics
          </Typography>
        </div>
        <Grid container className="step-container">
          <Grid item xs={12} className="step-grid">
            <Typography variant="h4" className="step-title">
              Top 10 By Sales
            </Typography>
            <Typography className="step-text">
              From the drop down menue below select a manufacturer. Once you
              select a manufactuerer, we will display the top 10 bars that sell
              their products. You can change manufactuerers at any time by
              picking a new one from the list, or you can clear the given graph.
            </Typography>
            <MenuPickerManf ChangeManf={this.handleTop10Manf} />
            {this.state.top10Manf &&
              Object.keys(this.props.beer.top10bar).length <= 0 && (
                <img
                  src={require("../../images/spinner.gif")}
                  alt="loading..."
                  style={{ width: "100px", margin: "auto", display: "block" }}
                />
              )}
            {Object.keys(this.props.beer.top10bar).length > 0 && (
              <BarChart
                list={this.props.beer.top10bar}
                title={`Top 10 Bars by Sales Of ${
                  this.state.top10Manf
                } Product`}
                color={colors[5]}
                x={"Bar"}
                y={"Total sales"}
              />
            )}
          </Grid>
          <Grid item xs={12} className="step-grid">
            <Typography variant="h4" className="step-title">
              Top 10 By Day
            </Typography>
            <Typography className="step-text">
              From the drop down menue below select a day of the week. Once you
              select a day of the week, we will display the top 10 beers that
              sell on the given day of the week. You can change days at any time
              by picking a new one from the list, or you can clear the given
              graph.
            </Typography>
            <MenuPicker changeDay={this.handleTop10Day} />
            {this.state.top10Day &&
              Object.keys(this.props.bars.top10day).length <= 0 && (
                <img
                  src={require("../../images/spinner.gif")}
                  alt="loading..."
                  style={{ width: "100px", margin: "auto", display: "block" }}
                />
              )}
            {Object.keys(this.props.bars.top10day).length > 0 && (
              <BarChart
                list={this.props.bars.top10day}
                title={`Top 10 Bars By Total Sales On ${this.state.top10Day}s`}
                color={colors[6]}
                x={"Day"}
                y={"Total sold"}
              />
            )}
          </Grid>
        </Grid>
        <div style={{ height: "50px " }} />
      </div>
    );
  }
}

Bar.propTypes = {
  bars: PropTypes.object.isRequired,
  beer: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
Bar.defaultProps = {
  bars: {},
  beer: { spenders: {} }
};

const mapStateToProps = state => ({
  bars: state.bars,
  beer: state.beer,
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
    getSalesTime,
    decrementCount,
    getFraction,
    getHours,
    getTop10ByDay,
    clearTop10Day,
    getBarTop10,
    clearManfs
  }
)(withRouter(Bar));
