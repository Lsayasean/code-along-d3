import React, { Component } from "react";
import * as d3 from "d3";
import "./App.css";

const mockData = [
  {
    month: "January",
    cost: 200
  },
  {
    month: "February",
    cost: 250
  },
  {
    month: "March",
    cost: 50
  },
  {
    month: "April",
    cost: 400
  }
];

class App extends Component {
  componentDidMount() {
    this.drawChart(mockData);
  }

  drawChart = data => {
    const svgWidth = 600;
    const svgHeight = 400;

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    const svg = d3
      .select(this.refs.chart)
      .attr("width", svgHeight)
      .attr("height", svgHeight);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleTime().rangeRound([0, width]);

    const y = d3.scaleLinear().rangeRound([height, 0]);

    const line = d3
      .line()
      .x(function(d) {
        return x(d.month);
      })
      .y(function(d) {
        return y(d.cost);
      });
    x.domain(
      d3.extent(data, function(d) {
        return d.month;
      })
    );
    y.domain(
      d3.extent(data, function(d) {
        return d.cost;
      })
    );

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

    g.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  };

  render() {
    return (
      <div className="App">
        <svg ref="chart" />
      </div>
    );
  }
}

export default App;
