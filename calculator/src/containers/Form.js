import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import CoinPicker from "../components/form/CoinPicker";
import "react-datepicker/dist/react-datepicker.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: moment(),
      end: moment(),
      coin: "",
      coins: []
    };
    this.handleCoinSelect = this.handleCoinSelect.bind(this);
    this.handleStartSelect = this.handleStartSelect.bind(this);
    this.handleEndSelect = this.handleEndSelect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleCoinSelect(event) {
    this.setState({ coin: event.target.value });
  }

  handleStartSelect(date) {
    this.setState({ start: date });
  }

  handleEndSelect(date) {
    this.setState({ end: date });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      symbol: this.state.coin,
      start: this.state.start.clone(),
      end: this.state.end.clone(),
    };
    return this.props.formDataHandler(formPayload);
  }

  componentDidMount() {
    fetch("https://www.cryptocompare.com/api/data/coinlist/")
      .then(results => {
        return results.json();
      })
      .then(parsed => {
        let coins = Object.values(parsed.Data).map(coin => {
          return { Id: coin.Id, Symbol: coin.Symbol };
        });
        this.setState({ coins: coins });
      });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <CoinPicker
          coins={this.state.coins}
          coin={this.state.coin}
          onChange={this.handleCoinSelect}
        />
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.start}
          onChange={this.handleStartSelect}
        />
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.end}
          onChange={this.handleEndSelect}
        />
        <input type="submit" className="btnClass" value="Submit" />
      </form>
    );
  }
}

export default Form;
