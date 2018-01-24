import React, { Component } from "react";
import Coin from "./Coin";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/CoinPicker.css";

class CoinPicker extends Component {
  render() {
    let i = 0;
    let coins = this.props.coins.map(coin => {
      i++;
      return <Coin key={i} symbol={coin.Symbol} />;
    });
    return (
      <div className="react-datepicker__input-container">
        <select
          value={this.props.coin}
          onChange={this.props.onChange}
        >
          {coins}
        </select>
      </div>
    );
  }
}

export default CoinPicker;
