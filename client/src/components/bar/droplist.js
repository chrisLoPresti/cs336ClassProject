import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, Button, Divider } from "@material-ui/core";

class MenuPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: null
    };
  }

  handleClick = event => {
    this.setState({ anchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchor: null });
  };

  handleChangeDay = day => () => () => {
    this.setState({ anchor: null });
    this.props.changeDay(day);
  };

  render() {
    return (
      <div id="analytics-section-day" style={{ textAlign: "center" }}>
        <Button
          id="chart-button"
          aria-owns={this.state.anchor ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Select Day
        </Button>
        <Button
          id="chart-button-clear"
          onClick={this.handleChangeDay("clear")()}
        >
          Clear Day
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchor}
          open={Boolean(this.state.anchor)}
          onClose={this.handleClose}
        >
          <MenuItem disabled={true}>Days of the week</MenuItem>
          <Divider />
          <MenuItem value="Monday" onClick={this.handleChangeDay("Monday")()}>
            Monday
          </MenuItem>
          <MenuItem value="Tuesday" onClick={this.handleChangeDay("Tuesday")()}>
            Tuesday
          </MenuItem>
          <MenuItem
            value="Wednesday"
            onClick={this.handleChangeDay("Wednesday")()}
          >
            Wednesday
          </MenuItem>
          <MenuItem
            value="Thursday"
            onClick={this.handleChangeDay("Thursday")()}
          >
            Thursday
          </MenuItem>
          <MenuItem value="Friday" onClick={this.handleChangeDay("Friday")()}>
            Friday
          </MenuItem>
          <MenuItem
            value="Saturday"
            onClick={this.handleChangeDay("Saturday")()}
          >
            Saturday
          </MenuItem>
          <MenuItem value="Sunday" onClick={this.handleChangeDay("Sunday")()}>
            Sunday
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

MenuPicker.propTypes = {
  list: PropTypes.object.isRequired,
  changeDay: PropTypes.func.isRequired
};
MenuPicker.defaultProps = {
  list: {}
};

export default MenuPicker;
