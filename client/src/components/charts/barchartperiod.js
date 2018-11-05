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
    newObj.period = list[x].period;
    newObj.quantity = list[x].total_price;
    newObj.amt = list[x].total_price;
    console.log(list[x]);

    data.push(newObj);
  }
  console.log(data);
};

const BarChartComponentPeriod = props => {
  let data = [];
  buildData(props.list, data);
  const size = props.size < 900 ? 0 : 12;
  return (
    <div id="graph-container">
      <Typography className="graph-title">{props.title}</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" tick={{ fontSize: size }} />
          <YAxis dataKey="amt" />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill={props.color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChartComponentPeriod.propTypes = {
  list: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  title: PropTypes.string.isRequried,
  color: PropTypes.string.isRequried
};
BarChartComponentPeriod.defaultProps = {
  list: {}
};

export default BarChartComponentPeriod;
