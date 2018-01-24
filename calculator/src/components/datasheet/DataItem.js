import React, { Component } from "react";

class DataItem extends Component {
  render() {
    return (
      <div>
        <span className="left">{this.props.date}</span>
        <span className="right">{this.props.value}</span>
        <hr/>
      </div>
    );
  }
}

export default DataItem;