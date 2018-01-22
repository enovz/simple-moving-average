import React, { Component } from "react";

class Coin extends Component {
  render() {
    return (
      <option value={this.props.symbol} className="Coin">
        {this.props.symbol}
      </option>
    );
  }
}

export default Coin;
