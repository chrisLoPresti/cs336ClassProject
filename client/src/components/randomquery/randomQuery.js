import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Typography, Grid, Button } from "@material-ui/core";
import JSONPretty from "react-json-pretty";
import {
  getQueryResults,
  setQueryErrors,
  clearResults
} from "../../actions/randomQueryActions";
import { clearErrors } from "../../actions/errorsActions";
import "./randomQuery.css";

let scrollToElement = require("scroll-to-element");

class RandomQuery extends Component {
  constructor(props) {
    super(props);
    this.state = { query: "", errors: {}, sroll: false };
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
    this.setState({ query: "", scroll: false });
    this.props.clearErrors();
  };

  submitQuery = () => {
    const badWords = ["drop", "delete", "update", "delete"];
    var i = 0;
    for (i = 0; i < 4; ++i) {
      if (this.state.query.toLocaleLowerCase().includes(badWords[i])) {
        this.props.setQueryErrors(
          `You can not use ${badWords[i]} in your query`
        );
        return;
      }
      this.setState({ scroll: true });
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
    var replace = this.state.query;
    replace.replace(/[\u201C\u201D]/g, '"');
    alert(replace);
    const req = {
      query: replace
    };
    this.props.getQueryResults(req);
  };

  render() {
    if (this.state.scroll && document.getElementById("results")) {
      scrollToElement("#results", {
        offset: -52,
        ease: "inOutCube",
        duration: 1000
      });
      this.setState({ scroll: false });
    }
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
          <Grid item xs={12} className="step-grid">
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
          <Grid item xs={12} className="step-grid">
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
        </Grid>
        <Grid container className="query-box">
          <Grid item xs={12} className="query-box-type">
            <div>
              {Object.keys(this.props.errors.error).length > 0 && (
                <Typography style={{ color: "red" }}>
                  *{this.props.errors.error}
                </Typography>
              )}
            </div>
            <textarea
              rows="4"
              cols="50"
              className="query-input"
              placeholder="Write your SQL queries here"
              value={this.state.query}
              onChange={this.onChange}
            />
          </Grid>
          <Grid item xs={12} className="query-box-submit">
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
          {this.props.query.query.length > 0 && (
            <Grid item xs={12} id="results">
              <div id="lets-get-started">
                <Typography
                  id="statistics"
                  variant="h4"
                  className="lets-get-started-text"
                >
                  Query Results
                </Typography>
              </div>
            </Grid>
          )}
          {this.props.query.query.length > 0 && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                id="results-button"
                onClick={() => this.props.clearResults()}
              >
                Clear Results
              </Button>
            </Grid>
          )}
          {this.props.query.query.length > 0 && (
            <Grid item xs={12}>
              <JSONPretty
                id="json-pretty"
                json={JSON.stringify(this.props.query.query)}
              />
            </Grid>
          )}
        </Grid>
        {this.props.query.loadingQuery && (
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
  { getQueryResults, setQueryErrors, clearErrors, clearResults }
)(withRouter(RandomQuery));
