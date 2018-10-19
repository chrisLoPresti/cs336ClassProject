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
        <div id="drinker-page" />
        <div className="drinker-layer" />
        <div id="drinker-title">
          <Typography className="drinker-title-text" variant="h3">
            Explore Our Drinkers
          </Typography>
        </div>
        <div id="lets-get-started">
          <Typography variant="h4" className="lets-get-started-text">
            How To Get Started
          </Typography>
        </div>
        <Grid container>
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
          <div>
            <Typography className="selected-drinker">
              Selected Drinker: {this.state.selectedName}
              {this.state.selectedName && (
                <IconButton onClick={this.clearSelected}>
                  <Close />
                </IconButton>
              )}
            </Typography>
            <Table
              drinkers={this.props.drinkers}
              selectedName={this.state.selectedName}
              handleSelectDrinker={this.handleSelectDrinker}
            />
          </div>
        )}
        {this.props.drinkers.loading && (
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
  drinkers: PropTypes.object.isRequired
};
Drinker.defaultProps = {
  drinkers: {}
};

const mapStateToProps = state => ({
  drinkers: state.drinkers
});

export default connect(
  mapStateToProps,
  { getDrinkers }
)(withRouter(Drinker));
