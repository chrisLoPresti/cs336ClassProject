import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Typography,
  Grid,
  IconButton,
  Stepper,
  Step,
  StepLabel
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  clearBartenders,
  getAllBartenders
} from "../../actions/bartenderActions";
import Table from "./bartendertable";

import "./bartender.css";

class Bartender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedBartender: "",
      selectedBar: "",
      activeStep: 0
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getAllBartenders();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    this.props.clearBartenders();
  };

  handleSelectedBartender = name => () => {
    this.setState({
      selectedBartender: name
    });
    this.handleNext();
  };

  handleSelectedBar = name => () => {
    this.setState({
      selectedBar: name
    });
    this.handleNext();
  };

  clearSelectedBartender = () => {
    this.setState({
      selectedBartender: "",
      selectedBar: ""
    });
    this.handleReset();
  };

  clearSelectedBar = () => {
    this.setState({
      selectedBar: ""
    });
    this.handleBack();
  };

  populateSelected = () => {};

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

  render() {
    const noInfo = Object.keys(this.props.bartenders.bartenders).length <= 0;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    return (
      <div id="bartender-container">
        <div id="small-page" className="bartender-image">
          <div id="small-title" className="push-down">
            <Typography className="small-title-text" variant="h3">
              Explore Our Bartenders
            </Typography>
          </div>
        </div>
        <div className="small-layer" />
        <div id="lets-get-started">
          <Typography
            id="bartender-start"
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
          {this.props.bartenders
            .bartendersLoading /*||
            (this.state.selectedBartender && this.props.bartenders.count !== 2)) && ( } */ && (
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
                  {`Selected Bar:  ${this.state.selectedBar}`}
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
      </div>
    );
  }
}

Bartender.propTypes = {
  errors: PropTypes.object.isRequired,
  bartenders: PropTypes.object.isRequired
};
Bartender.defaultProps = {
  bartenders: {}
};

const mapStateToProps = state => ({
  errors: state.errors,
  bartenders: state.bartenders
});

export default connect(
  mapStateToProps,
  { clearBartenders, getAllBartenders }
)(withRouter(Bartender));
