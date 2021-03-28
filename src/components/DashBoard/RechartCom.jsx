import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default class RechartCom extends PureComponent {
  render() {
    return (
      <BarChart
        width={500}
        height={300}
        data={this.props.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={this.props.dataKeys[0]} fill="#8884d8" />
        {this.props.dataKeys.length >= 2 && (
          <Bar dataKey={this.props.dataKeys[1]} fill="#9F4440" />
        )}
        {this.props.dataKeys.length >= 3 && (
          <Bar dataKey={this.props.dataKeys[2]} fill="#ffd37b" />
        )}
      </BarChart>
    );
  }
}
