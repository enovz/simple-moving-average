import React, { Component } from "react";
import Coin from "./Coin";

class CoinPicker extends Component {

  render() {
    let i =0;
    let coins = this.props.coins.map(coin => {
      i++;
      return <Coin key={i} symbol={coin.Symbol} />;
    });
    return (
      <select
        className="CoinPicker"
        value={this.props.coin}
        onChange={this.props.onChange}
      >
        {coins}
      </select>
    );
  }
}

export default CoinPicker;
