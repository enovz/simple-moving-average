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
          /*
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          */
          borderColor: [
            "rgba(255,99,132,1)",
          ],
          borderWidth: 1,
          fill:false
        }
      ]
    };
    return line;
  }

  render() {
    return (
      <div className="Graph" style={{ display: this.props.display }}>
        <Line 
        data={this.createLine(this.props.dataSet)}/>
      </div>
    );
  }
}

export default Graph;
