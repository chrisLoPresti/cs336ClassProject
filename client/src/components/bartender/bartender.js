import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Typography,
  Grid,
  IconButton,
  Button,
  Stepper,
  Step,
  StepLabel,
  ListItem,
  ListItemText,
  Select,
  FormControl,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  clearBartenders,
  getAllBartenders,
  getWorkingBars,
  clearSelectedBartender,
  getShifts,
  getSold,
  getAnalytics,
  clearAnalytics
} from "../../actions/bartenderActions";
import { getBars, clearBars } from "../../actions/barActions";
import { clearErrors } from "../../actions/errorsActions";
import BarChart from "../charts/barchart";
import Table from "./bartendertable";
import TableBar from "./bartable";
import "./bartender.css";

let scrollToElement = require("scroll-to-element");

class Bartender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedBartender: "",
      selectedBar: "",
      selectedDay: "",
      selectedStart: "",
      selectedEnd: "",
      selectedBarAnalytics: "",
      scrollToAnalytics: false,
      scrollded1: false,
      scrollded2: false,
      dayOpen: false,
      startOpen: false,
      endOpen: false,
      activeStep: 0
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getAllBartenders();
    this.props.getBars();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    this.props.clearBartenders();
    this.props.clearBars();
  };

  handleSelectedBartender = name => () => {
    this.setState(
      {
        selectedBartender: name,
        scrolled1: true
      },
      () => this.props.getWorkingBars(this.state.selectedBartender)
    );
    this.handleNext();
  };

  handleSelectedBar = name => () => {
    this.setState(
      {
        selectedBar: name,
        scrolled2: true
      },
      () => this.populateBartender()
    );
    this.handleNext();
  };

  clearSelectedBartender = () => {
    this.setState({
      selectedBartender: "",
      selectedBar: ""
    });
    this.props.clearSelectedBartender();
    this.handleReset();
  };

  clearSelectedBar = () => {
    this.setState({
      selectedBar: ""
    });
    this.handleBack();
  };

  populateBartender = () => {
    this.props.getShifts(this.state.selectedBartender, this.state.selectedBar);
    this.props.getSold(this.state.selectedBartender, this.state.selectedBar);
  };

  //stepper info
  getSteps = () => {
    return ["Select A Bartender", "Select A Bar"];
  };

  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return "Select a bartender...";
      case 1:
        return "Now select a bar";
      default:
        return "Uknown stepIndex";
    }
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  runQuery = () => {
    if (this.state.selectedEnd <= this.state.selectedStart) {
      this.setState({
        errors: {
          error:
            "Make sure to have your end time greater than or equal to your start time"
        }
      });
      return;
    }
    if (
      this.state.selectedBarAnalytics !== "" &&
      this.state.selectedDay !== "" &&
      this.state.selectedEnd !== "" &&
      this.state.selectedStart !== ""
    ) {
      this.setState({ scrollToAnalytics: true });
      this.props.getAnalytics(
        this.state.selectedBarAnalytics,
        this.state.selectedDay,
        this.state.selectedStart,
        this.state.selectedEnd
      );
      return;
    }
    this.setState({
      errors: {
        error: "Please make sure you have selected all four inputs"
      }
    });
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
    const noInfo =
      Object.keys(this.props.bartenders.bartenders).length <= 0 &&
      Object.keys(this.props.bartenders.works).length <= 0;
    Object.keys(this.props.bartenders.shifts).length <= 0;

    const steps = this.getSteps();
    const { activeStep } = this.state;

    if (
      this.state.activeStep === 1 &&
      this.state.scrolled1 &&
      document.getElementById("bar-table-works")
    ) {
      scrollToElement("#bar-table-works", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
      this.setState({ scrolled1: false });
    }

    if (
      this.state.activeStep === 2 &&
      this.state.scrolled2 &&
      document.getElementById("graph-section")
    ) {
      scrollToElement("#graph-section", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
      this.setState({ scrolled2: false });
    }

    if (
      this.state.scrollToAnalytics &&
      document.getElementById("bar-analytics")
    ) {
      scrollToElement("#bar-analytics", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
      this.setState({ scrollToAnalytics: false });
    }

    return (
      <div id="bartender-container">
        <div id="small-page" className="bartender-image">
          <div id="small-title" className="push-down">
            <Typography className="small-title-text" variant="h3">
              Explore Our Bartenders
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
            Bartender Statistics
          </Typography>
        </div>
        <Grid container className="step-container">
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 1
            </Typography>
            <Typography className="step-text">
              First pick a bartender. You can sort the list by bartender name,
              phone number, or state. You can also search for a bartender by
              name. To select a bartender, just click on its row in the table.
              You can switch bartenders at any time, or clear the currently
              selected bartender.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Step 2
            </Typography>
            <Typography className="step-text">
              Pick a bar where the bartender works. Once you select a bartender
              and a bar, we will give you some bartender graphs containing
              statistics about the bartender. Once you select a bartender and a
              bar, you will automatically scroll to the graphs once they load.
              Hover over the bartenders in the graph to get detailed results.
            </Typography>
          </Grid>
          {(this.props.bartenders.bartendersLoading ||
            (this.state.selectedBartender &&
              this.state.selectedBar &&
              this.props.bartenders.count !== 2)) && (
            <Grid item xs={12}>
              <img
                src={require("../../images/spinner.gif")}
                alt="loading..."
                style={{ width: "100px", margin: "auto", display: "block" }}
              />
            </Grid>
          )}
        </Grid>
        {Object.keys(this.props.bartenders.bartenders).length > 0 && (
          <div id="selected-bartender-container">
            <Grid container>
              <Grid item xs={12} sm={6}>
                <div>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map(label => {
                      return (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="selected-bartender">
                  {`Selected Bartender:  ${this.state.selectedBartender}`}
                  {this.state.selectedBartender && (
                    <IconButton
                      className="clear-button-selected-bartender"
                      onClick={this.clearSelectedBartender}
                    >
                      <Close className="close-button-selected-bartender" />
                    </IconButton>
                  )}
                </Typography>
                <Typography className="selected-bartender bar">
                  {`Selected Bar:${this.state.selectedBar}`}
                  {this.state.selectedBar && (
                    <IconButton
                      className="clear-button-selected-bartender "
                      onClick={this.clearSelectedBar}
                    >
                      <Close className="close-button-selected-bartender" />
                    </IconButton>
                  )}
                </Typography>
              </Grid>
            </Grid>
            <div id="bar-table-works">
              {!this.props.bartenders.bartendersLoading &&
                this.props.bartenders.bartenders.length > 0 &&
                this.state.activeStep === 0 && (
                  <Table
                    bartenders={this.props.bartenders}
                    selectedBartender={this.state.selectedBartender}
                    handleSelectedBartender={this.handleSelectedBartender}
                    loading={this.props.bartenders.bartendersLoading}
                  />
                )}
              {!this.props.bartenders.bartendersLoading &&
                this.props.bartenders.works.length > 0 &&
                this.state.activeStep >= 1 && (
                  <TableBar
                    bartenders={this.props.bartenders}
                    selectedBar={this.state.selectedBar}
                    handleSelectedBar={this.handleSelectedBar}
                    loading={this.props.bartenders.bartendersLoading}
                  />
                )}
            </div>
          </div>
        )}
        {Object.keys(this.props.bartenders.bartenders).length <= 0 &&
          !this.props.bartenders.bartendersLoading && (
            <Grid container>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography style={{ fontSize: "30px", marginTop: "30px" }}>
                  There are currently no bartenders in our table
                </Typography>
              </Grid>
            </Grid>
          )}
        {noInfo &&
          this.state.selectedBartender &&
          !this.props.bartenders.bartendersLoadingOne && (
            <Grid container>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Typography style={{ fontSize: "30px", marginTop: "30px" }}>
                  No information on {this.state.selectedBartender}
                </Typography>
              </Grid>
            </Grid>
          )}
        {this.state.activeStep === 2 && this.props.bartenders.count === 2 && (
          <div id="graph-section">
            <Grid container>
              {this.state.selectedBar &&
                this.state.selectedBartender &&
                !noInfo &&
                !this.props.bartenders.bartendersLoadingOne && (
                  <Grid item xs={12}>
                    <div id="lets-get-started">
                      <Typography
                        variant="h4"
                        className="lets-get-started-text"
                      >
                        Results for {this.state.selectedBartender}
                      </Typography>
                    </div>
                  </Grid>
                )}
              {this.state.selectedBar &&
                this.state.selectedBartender &&
                !noInfo &&
                !this.props.bartenders.bartendersLoadingOne && (
                  <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button
                      style={{
                        backgroundColor: "#303030",
                        color: "white",
                        marginTop: "30px",
                        marginLeft: "20px",
                        marginRight: "20px"
                      }}
                      onClick={this.clearSelectedBartender}
                    >
                      Clear Bartender
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "slategray",
                        color: "white",
                        marginTop: "30px",
                        marginLeft: "20px",
                        marginRight: "20px"
                      }}
                      onClick={this.clearSelectedBar}
                    >
                      Clear Bar
                    </Button>
                  </Grid>
                )}
              {!this.props.bartenders.bartendersLoadingOne &&
                Object.keys(this.props.bartenders.shifts).length && (
                  <Grid item xs={12}>
                    <Typography
                      variant="h4"
                      style={{ textAlign: "center", margin: "40px" }}
                    >
                      {this.state.selectedBartender}'s Shifts
                    </Typography>
                  </Grid>
                )}
              {!this.props.bartenders.bartendersLoadingOne &&
                this.props.bartenders.shifts.length > 0 &&
                this.props.bartenders.shifts.slice(0, 6).map(day => (
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
              {!this.props.bartenders.bartendersLoadingOne &&
                this.props.bartenders.shifts.length > 0 &&
                this.props.bartenders.shifts.slice(6, 7).map(day => (
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
              {Object.keys(this.props.bartenders.sold).length && (
                <Grid item xs={12}>
                  <BarChart
                    list={this.props.bartenders.sold}
                    title={`${this.state.selectedBartender}'s Sales By Brand`}
                    color={colors[1]}
                    x={"Brand"}
                    y={"Total product sold"}
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
            Bartender Analytics
          </Typography>
        </div>
        <Grid container className="step-container">
          <Grid item xs={12} className="step-grid">
            <Typography variant="h4" className="step-title">
              Top Bartendrs By Sales Given Paramaters
            </Typography>
            <Typography className="step-text">
              From the three drop down menues, select a day, start time and end
              time. We will then give you a ranking of bartenders who have sold
              the most beers during that shift time on the given day! Feel cree
              to clear your results and try with differnt input.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} className="form-control-grid">
            <FormControl className="form-control">
              <InputLabel>Select Bar</InputLabel>
              <Select
                className="selecter"
                value={this.state.selectedBarAnalytics}
                inputProps={{
                  name: "selectedBarAnalytics"
                }}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {this.props.bars.bars.length > 0 &&
                  this.props.bars.bars.map(bar => (
                    <MenuItem value={bar.name}>{bar.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} className="form-control-grid">
            <FormControl className="form-control">
              <InputLabel>Select Day</InputLabel>
              <Select
                className="selecter"
                value={this.state.selectedDay}
                inputProps={{
                  name: "selectedDay"
                }}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} className="form-control-grid">
            <FormControl className="form-control">
              <InputLabel>Select Start</InputLabel>
              <Select
                className="selecter"
                value={this.state.selectedStart}
                inputProps={{
                  name: "selectedStart"
                }}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="00:00">00:00</MenuItem>
                <MenuItem value="01:00">01:00</MenuItem>
                <MenuItem value="02:00">02:00</MenuItem>
                <MenuItem value="03:00">03:00</MenuItem>
                <MenuItem value="04:00">04:00</MenuItem>
                <MenuItem value="05:00">05:00</MenuItem>
                <MenuItem value="06:00">06:00</MenuItem>
                <MenuItem value="07:00">07:00</MenuItem>
                <MenuItem value="08:00">08:00</MenuItem>
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                <MenuItem value="12:00">12:00</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>
                <MenuItem value="14:00">14:00</MenuItem>
                <MenuItem value="15:00">15:00</MenuItem>
                <MenuItem value="16:00">16:00</MenuItem>
                <MenuItem value="17:00">17:00</MenuItem>
                <MenuItem value="18:00">18:00</MenuItem>
                <MenuItem value="19:00">19:00</MenuItem>
                <MenuItem value="20:00">20:00</MenuItem>
                <MenuItem value="21:00">21:00</MenuItem>
                <MenuItem value="22:00">22:00</MenuItem>
                <MenuItem value="23:00">23:00</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} className="form-control-grid">
            <FormControl className="form-control">
              <InputLabel>Select End</InputLabel>
              <Select
                className="selecter"
                value={this.state.selectedEnd}
                inputProps={{
                  name: "selectedEnd"
                }}
                onChange={this.handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="00:00">00:00</MenuItem>
                <MenuItem value="01:00">01:00</MenuItem>
                <MenuItem value="02:00">02:00</MenuItem>
                <MenuItem value="03:00">03:00</MenuItem>
                <MenuItem value="04:00">04:00</MenuItem>
                <MenuItem value="05:00">05:00</MenuItem>
                <MenuItem value="06:00">06:00</MenuItem>
                <MenuItem value="07:00">07:00</MenuItem>
                <MenuItem value="08:00">08:00</MenuItem>
                <MenuItem value="09:00">09:00</MenuItem>
                <MenuItem value="10:00">10:00</MenuItem>
                <MenuItem value="11:00">11:00</MenuItem>
                <MenuItem value="12:00">12:00</MenuItem>
                <MenuItem value="13:00">13:00</MenuItem>
                <MenuItem value="14:00">14:00</MenuItem>
                <MenuItem value="15:00">15:00</MenuItem>
                <MenuItem value="16:00">16:00</MenuItem>
                <MenuItem value="17:00">17:00</MenuItem>
                <MenuItem value="18:00">18:00</MenuItem>
                <MenuItem value="19:00">19:00</MenuItem>
                <MenuItem value="20:00">20:00</MenuItem>
                <MenuItem value="21:00">21:00</MenuItem>
                <MenuItem value="22:00">22:00</MenuItem>
                <MenuItem value="23:00">23:00</MenuItem>
                <MenuItem value="23:59">23:59</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {this.props.bartenders.loadingAnalytics && (
            <Grid item xs={12}>
              <img
                src={require("../../images/spinner.gif")}
                alt="loading..."
                style={{
                  width: "100px",
                  margin: "auto",
                  display: "block"
                }}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <div id="button-picker-container">
              {this.state.errors.error &&
                Object.keys(this.state.errors.error).length !== 0 && (
                  <Typography style={{ color: "red" }}>
                    *{this.state.errors.error}
                  </Typography>
                )}
              <Button id="run-button" onClick={this.runQuery}>
                Run Query
              </Button>
              <Button
                id="clear-button"
                onClick={() =>
                  this.setState(
                    {
                      selectedDay: "",
                      selectedEnd: "",
                      selectedStart: "",
                      selectedBarAnalytics: ""
                    },
                    () => {
                      this.props.clearAnalytics();
                      this.props.clearErrors();
                    }
                  )
                }
              >
                Clear Input
              </Button>
            </div>
          </Grid>
          {this.props.bartenders.analytics.length > 0 && (
            <Grid item xs={12} id="bar-analytics">
              <BarChart
                list={this.props.bartenders.analytics}
                title={`Top 10 Bartenders On ${this.state.selectedDay} From ${
                  this.state.selectedStart
                } - ${this.state.selectedEnd}`}
                color={colors[5]}
                x={"Bartender"}
                y={"Total product sold"}
              />
              )
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

Bartender.propTypes = {
  errors: PropTypes.object.isRequired,
  bartenders: PropTypes.object.isRequired,
  bars: PropTypes.object.isRequired
};
Bartender.defaultProps = {
  bartenders: {},
  bars: {}
};

const mapStateToProps = state => ({
  errors: state.errors,
  bartenders: state.bartenders,
  bars: state.bars
});

export default connect(
  mapStateToProps,
  {
    clearBartenders,
    getAllBartenders,
    getWorkingBars,
    clearSelectedBartender,
    getShifts,
    getSold,
    getBars,
    clearBars,
    getAnalytics,
    clearAnalytics,
    clearErrors
  }
)(withRouter(Bartender));
