import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDrinkers } from "../../actions/drinkersActions";
import Table from "./drinkertable";
import "./drinker.css";

class Drinker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      selectedName: ""
    };
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

  handleSelectDrinker = name => () => {
    this.setState({
      selectedName: name
    });
  };

  clearSelected = () => {
    this.setState({
      selectedName: ""
    });
  };

  render() {
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
            <Table
              drinkers={this.props.drinkers}
              selectedName={this.state.selectedName}
              handleSelectDrinker={this.handleSelectDrinker}
              loading={this.props.drinkers.loadingDrinker}
            />
          </div>
        )}
        {this.props.drinkers.loadingDrinker && (
          <img
            src={require("../../images/spinner.gif")}
            alt="loading..."
            style={{ width: "100px", margin: "auto", display: "block" }}
          />
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
  { getDrinkers }
)(withRouter(Drinker));
