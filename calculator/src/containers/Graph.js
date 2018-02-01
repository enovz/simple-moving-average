import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import "../styles/Graph.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    };
    this.createLine = this.createLine.bind(this);
  }

  createLine(dataPoints) {
    let labels = dataPoints.map(data => {
      return data.time;
    });
    let data = dataPoints.map(data => {
      return data.value;
    });

    let line = {
      labels: labels,
      datasets: [
        {
          label: "SMA",
          data: data,
          borderColor: ["rgb(44, 187, 187)"],
          borderWidth: 1,
          fill: false
        }
      ]
    };
    return line;
  }

  render() {
    return (
      <div className="Graph">
        <Line data={this.createLine(this.props.dataSet)} />
      </div>
    );
  }
}

export default Graph;
