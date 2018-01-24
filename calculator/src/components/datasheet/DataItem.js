import React, { Component } from "react";

class DataItem extends Component {
  render() {
    return (
      <div>
        <span className="left">{this.props.value}</span>
        <span className="right">{this.props.date}</span>
        <hr/>
      </div>
    );
  }
}

export default DataItem;