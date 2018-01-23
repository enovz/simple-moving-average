import React, { Component } from "react";

class ListItem extends Component {
  render() {
    return (
      <li value={this.props.value}>
         {this.props.date} - {this.props.value} 
      </li>
    );
  }
}

export default ListItem;