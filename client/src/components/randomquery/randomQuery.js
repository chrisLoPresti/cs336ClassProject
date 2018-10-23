import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Typography, Grid, Button } from "@material-ui/core";
import {
  getQueryResults,
  setQueryErrors
} from "../../actions/randomQueryActions";
import "./randomQuery.css";

class RandomQuery extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = event => {
    this.setState({
      query: event.target.value
    });
  };

  clearQuery = () => {
    this.setState({ query: "" });
  };

  submitQuery = () => {
    const badWords = ["drop", "delete"];
    var i = 0;
    for (i = 0; i < 4; ++i) {
      if (this.state.query.toLocaleLowerCase().includes(badWords[i])) {
        this.props.setQueryErrors(
          `You can not use ${badWords[i]} in your query`
        );
        return;
      }
    }
    const updateOrInsert = ["update", "insert"];
    var date = new Date();
    for (i = 0; i < 2; ++i) {
      if (this.state.query.toLocaleLowerCase().includes(updateOrInsert[i])) {
        if (
          this.state.query.toLocaleLowerCase().includes("date") &&
          !this.state.query
            .toLocaleLowerCase()
            .includes(`${date.getFullYear()}-${date.getMonth() + 1}`)
        ) {
          this.props.setQueryErrors(
            `You can not use ${
              updateOrInsert[i]
            } in your query to access an older date. Please make sure you stick with the format currentYear-currentMonth-currentDay`
          );
          return;
        }
      }
    }
    const req = {
      query: this.state.query
    };
    this.props.getQueryResults(req);
  };

  render() {
    return (
      <div id="random-query-container">
        <div id="small-page" className="query-image">
          <div id="small-title">
            <Typography className="small-title-text" variant="h3">
              Lets Make Queries!
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
              Type a query
            </Typography>
            <Typography className="step-text">
              In the box below you can type a query and have it evaluated
              against our schema. If the query is valid and returns results we
              will present them below the box so you can see the results of your
              query. If there is an error with your query, we will let you know.
              In which casse you wont get any results, just an error message.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} className="step-grid">
            <Typography variant="h4" className="step-title">
              Restrictions
            </Typography>
            <Typography className="step-text">
              To prevent damage to our database we have set some restrictions on
              what types of querys you can commit. We dont allow updates,
              deletes or insertions with a date prior to today. If we messed
              with transactions that already happened, or inventory that already
              sold, it would throw off our data.
            </Typography>
          </Grid>
        </Grid>
        <Grid container className="query-box">
          <Grid item xs={12} md={6} className="query-box-type">
            <textarea
              rows="4"
              cols="50"
              className="query-input"
              placeholder="Write your SQL queries here"
              value={this.state.query}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12} md={6} className="query-box-submit">
            <Button
              className="query-submit-button query-button"
              onClick={this.submitQuery}
            >
              Run Query
            </Button>
            <Button
              className="query-clear-button query-button"
              onClick={this.clearQuery}
            >
              Clear Query
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
RandomQuery.propTypes = {
  query: PropTypes.object.isRequired,
  getQueryResults: PropTypes.func.isRequired,
  setQueryErrors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
RandomQuery.defaultProps = {
  query: {}
};

const mapStateToProps = state => ({
  query: state.query,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getQueryResults, setQueryErrors }
)(withRouter(RandomQuery));
