import React, { Component } from "react";
import DataItem from "../components/datasheet/DataItem";
import "../styles/DataSheet.css";

class DataSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataset: []
    };
  }
  render() {
    let id = 0;
    let dataItems = this.props.dataSet.map(data => {
      id++;
      return <DataItem key={id} date={data.time} value={data.value} />;
    });
    return (
      <div className="DataSheet" style={{ display: this.props.display }}>
        <span className="left">Value</span>
        <span className="right">Date</span>
        <hr />
        {dataItems}
      </div>
    );
  }
}

export default DataSheet;
