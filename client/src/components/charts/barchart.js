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
  for (var x = 0; x < list.length; x++) {
    let newObj = {};
    newObj.name = list[x].name;
    newObj.quantity = list[x].total;
    newObj.amt = list[x].total;

    data.push(newObj);
  }
};

const BarChartComponent = props => {
  const { title, color } = props;
  let data = [];
  buildData(props.list, data);
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
          <XAxis dataKey="name" tick={{ fontSize: "12px" }} />
          <YAxis dataKey="amt" />
          <Tooltip />
          <Legend content={content} />
          <Bar dataKey="quantity" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChartComponent.propTypes = {
  list: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired
};
BarChartComponent.defaultProps = {
  list: [],
  title: "",
  color: ""
};

export default BarChartComponent;
