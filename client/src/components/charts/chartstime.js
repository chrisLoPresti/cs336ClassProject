import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
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

const buildData = (list, data) => {
  const names = ["8:00-12:00", "12:00-16:00", "16:00-20:00", "20:00-24:00"];
  const type = [
    "morning_avg_sold",
    "afternoon_avg_sold",
    "evening_avg_sold",
    "night_avg_sold"
  ];
  for (var x = 0; x < 4; x++) {
    let newObj = {};
    newObj.name = names[x];
    newObj.quantity = list[0][type[x]];
    newObj.amt = list[0][type[x]];
    data.push(newObj);
  }
};

const BarChartTime = props => {
  const { title, color } = props;
  let data = [];
  buildData(props.list, data);
  const size = props.size < 600 ? 0 : 12;
  const content = (
    <div>
      <p>x: {props.x}</p>
      <p>y: {props.y}</p>
    </div>
  );
  return (
    <div id="graph-container">
      <Typography className="graph-title">{title}</Typography>
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
};

BarChartTime.propTypes = {
  list: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired
};
BarChartTime.defaultProps = {
  list: [],
  title: "",
  color: ""
};

export default BarChartTime;
