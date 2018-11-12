import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Typography, Grid, Button, Modal, Paper } from "@material-ui/core";
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
    this.state = {
      query: "",
      errors: {},
      sroll: false,
      openModal: false,
      badQuery: ""
    };
  }
  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.clearResults();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors }, () => this.openModal());
    }
  }

  openModal = () => {
    if (Object.keys(this.props.errors.error).length > 0) {
      this.setState({ openModal: true });
    }
  };

  handleCloseModal = () => {
    this.setState({ openModal: false, badQuery: "" });
  };

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
    const badWords = ["drop", "delete", "update", "insert"];
    var i = 0;
    for (i = 0; i < 4; ++i) {
      if (this.state.query.toLocaleLowerCase().includes(badWords[i])) {
        this.setState({
          badQuery: badWords[i]
        });
      }
      this.setState({ scroll: true });
    }

    if (this.state.badQuery) {
      this.props.setQueryErrors(`You can not use ${badWords[i]} in your query`);
      return;
    }

    const req = {
      query: this.state.query
        .replace(/[“”\u201c\u201d]/g, '"')
        .replace(/[‘’\u2018\u2019]/g, "'")
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
              what types of querys you can commit. We dont allow drops, updates,
              deletes or insertions from the query box. If you would like to
              perform any of these modifications, with the exception of drops,
              head on over to the modification pafe. From there you will be able
              to update, insert, or delete using our database. The query box's
              main purpose is to be used to verify that your modifcations
              actually took place.
            </Typography>
          </Grid>
          <Grid item xs={12} className="step-grid">
            <Typography variant="h4" className="step-title">
              Write A Query
            </Typography>
            <Typography className="step-text">
              In the box below you can type a query and have it evaluated
              against our schema. If the query is valid and returns results we
              will present them below the box so you can see the results of your
              query. If there is an error with your query, we will let you know.
              In which casse you wont get any results, just an error message. If
              we find the words "drop", "insert", "delete" or "update" present
              in your query, we will warn you that this is not allowed and offer
              you the option to remain on the page and change your query, or
              give you a link to the modifcation page.
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
          {this.props.query.query.length > 0 && !this.props.query.loadingQuery && (
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
          {this.props.query.query.length > 0 && !this.props.query.loadingQuery && (
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                id="results-button"
                onClick={() => this.props.clearResults()}
                style={{ width: "200px" }}
              >
                Clear Results
              </Button>
            </Grid>
          )}
          {this.props.query.query.length > 0 && !this.props.query.loadingQuery && (
            <Grid item xs={12}>
              <JSONPretty
                style={{ margin: "20px", marginBottom: "50px" }}
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
        {this.state.badQuery && (
          <Modal
            id="query-modal"
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.openModal}
            onClose={this.handleCloseModal}
          >
            <Paper id="query-modal-content">
              <Typography id="modal-title">
                We have found an issue with your query...
              </Typography>
              <Typography id="simple-modal-header">
                We found the usage of an illegal word!
              </Typography>
              {<p id="simple-modal-error">{this.state.badQuery}</p>}
              <Typography id="simple-modal-description">
                You can not use this word in your query. If you want to update,
                insert, or delete, go to the modification page. Otherwise remain
                here! Also, as the restrictions state, we can not drop tables.
              </Typography>
              <div id="modal-button-container">
                <Button id="modification-page-button">Modifcation</Button>
                <Button
                  id="close-button"
                  onClick={() => this.handleCloseModal()}
                >
                  Close
                </Button>
              </div>
            </Paper>
          </Modal>
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
