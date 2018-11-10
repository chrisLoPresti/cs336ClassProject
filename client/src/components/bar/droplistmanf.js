import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Button, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { getManfs, clearManfOne } from "../../actions/beerActions";

class MenuPickerManf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      anchor: null
    };
  }
  componentDidMount() {
    this.props.getManfs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillUnmount = () => {
    this.props.clearManfOne();
  };

  handleClick = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  handleChangeManf = manf => () => () => {
    this.setState({ anchor: null });
    if (manf === "clear") {
      this.props.ChangeManf("");
      this.props.clearManfOne();
      return;
    }
    this.props.ChangeManf(manf);
  };

  render() {
    return (
      <div id="analytics-section-manf" style={{ textAlign: "center" }}>
        <Button
          id="chart-button"
          aria-owns={this.state.anchor ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Select Brand
        </Button>
        <Button
          id="chart-button-clear"
          onClick={this.handleChangeManf("clear")()}
        >
          Clear Brand
        </Button>
        {this.props.beer.manfs.length > 0 && (
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchor}
            open={Boolean(this.state.anchor)}
            onClose={this.handleClose}
          >
            {" "}
            <MenuItem disabled={true}>Select A Manufacturer</MenuItem>
            <Divider />
            {this.props.beer.manfs.map(manf => (
              <MenuItem
                value={manf.name}
                onClick={this.handleChangeManf(manf.name)()}
              >
                {manf.name}
              </MenuItem>
            ))}
          </Menu>
        )}
      </div>
    );
  }
}

MenuPickerManf.propTypes = {
  list: PropTypes.object.isRequired,
  beer: PropTypes.object.isRequired,
  ChangeManf: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
MenuPickerManf.defaultProps = {
  list: {},
  beer: { manfs: [] }
};

const mapStateToProps = state => ({
  beer: state.beer
});

export default connect(
  mapStateToProps,
  { getManfs, clearManfOne }
)(MenuPickerManf);
