import React, { Component } from "react";
import Coin from "./Coin";

class CoinPicker extends Component {

  render() {
    let coins = this.props.coins.map(coin => {
      return <Coin key={coin.Id} symbol={coin.Symbol} />;
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
