import React, { Component } from "react";
import "../../styles/Loading.css";

class Loading extends Component {
  constructor(props) {
    super(props);
  }
  //{
  render() {
    return (
      <div className="spinner" style={{ display: this.props.display }}>
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    );
  }
}

export default Loading;
