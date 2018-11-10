import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Typography, Grid } from "@material-ui/core";
import { getBeers, clearBeers } from "../../actions/beerActions";
import "./beer.css";

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
  render() {
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
            How to get started
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
        </Grid>
      </div>
    );
  }
}

Beer.propTypes = {
  beer: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
Beer.defaultProps = {
  beer: {}
};

const mapStateToProps = state => ({
  beer: state.beer,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { getBeers, clearBeers }
)(withRouter(Beer));
