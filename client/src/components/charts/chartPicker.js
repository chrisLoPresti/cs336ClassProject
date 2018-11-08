import React from "react";
import PropTypes from "prop-types";
import { Typography, Button, Menu, MenuItem } from "@material-ui/core";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer
} from "recharts";

import "./chart.css";

class BarChartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchor: null
    };
  }

  buildData = (list, data) => {
    for (var x = 0; x < list.length; x++) {
      let newObj = {};
      newObj.name = list[x].name;
      newObj.quantity = list[x].total;
      newObj.amt = list[x].total;

      data.push(newObj);
    }
  };
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
    const { title, color, x, y } = this.props;
    let data = [];
    this.buildData(this.props.list, data);
    const size = this.props.size < 600 ? 0 : 12;
    const content = (
      <div>
        <p>x: {x}</p>
        <p>y: {y}</p>
      </div>
    );
    return (
      <div id="graph-container">
        <Typography className="graph-title">{title}</Typography>
        <Button
          id="chart-button"
          aria-owns={this.state.anchor ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          Select Day
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchor}
          open={Boolean(this.state.anchor)}
          onClose={this.handleClose}
        >
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: size }} />
            <YAxis dataKey="amt" />
            <Tooltip />
            <Legend content={content} />
            <Bar dataKey="quantity" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

BarChartComponent.propTypes = {
  list: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  changeDay: PropTypes.func.isRequired
};
BarChartComponent.defaultProps = {
  list: [],
  title: "",
  color: ""
};

export default BarChartComponent;
