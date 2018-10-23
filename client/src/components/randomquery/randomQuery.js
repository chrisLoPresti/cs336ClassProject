import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Typography } from "@material-ui/core";
import { getQueryResults } from "../../actions/randomQueryActions";
import "./randomQuery.css";

class RandomQuery extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    // const req = {
    //   query: 'EXISTS (select * from Drinker where name ="anus")'
    // };
    // this.props.getQueryResults(req);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.errors) {
    //   this.setState({ errors: nextProps.errors });
    // }
  }

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
      </div>
    );
  }
}
RandomQuery.propTypes = {
  query: PropTypes.object.isRequired,
  getQueryResults: PropTypes.func.isRequired
};
RandomQuery.defaultProps = {
  query: {}
};

const mapStateToProps = state => ({
  query: state.query
});

export default connect(
  mapStateToProps,
  { getQueryResults }
)(withRouter(RandomQuery));
