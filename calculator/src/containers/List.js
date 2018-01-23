import React, { Component } from "react";
import ListItem from "../components/list/ListItem";

class SmaList extends Component {
  constructor() {
    super();
    this.state = {
      dataset: []
    };
  }

  render() {
    let listItems = this.props.dataSet.map(data => {
      //let date = new Date(new Date(data.time).setHours(0, 0, 0, 0));
      return <ListItem date={data.time} value={data.value} />;
    });
    return (
      <div>
        <h3>Hello from SmaList</h3>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

export default SmaList;
