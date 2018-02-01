import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import CoinPicker from "../components/form/CoinPicker";
import api from "../api/api";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/From.css";

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
      end: this.state.end.clone()
    };
    if (!valid(formPayload)) {
      return alert("Invalid Form");
    } else {
      return this.props.formDataHandler(formPayload);
    }

    function valid(form) {
      return moment(form.start).isBefore(form.end);
    }
  }

  componentDidMount() {
    let url = "www.cryptocompare.com/api/data/coinlist/";
    api
      .get(url)
      .then(results => {
        let coins = Object.values(results.Data).map(coin => {
          return { Id: coin.Id, Symbol: coin.Symbol };
        });
        this.setState({ coins: coins });
      });
  }

  render() {
    return (
      <form className="Form" onSubmit={this.handleFormSubmit}>
        <h2>SMA Calculator</h2>
        <p>Symbol</p>
        <CoinPicker
          coins={this.state.coins}
          coin={this.state.coin}
          onChange={this.handleCoinSelect}
        />
        <p>Start</p>
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.start}
          onChange={this.handleStartSelect}
        />
        <p>End</p>
        <DatePicker
          dateFormat="YYYY/MM/DD"
          selected={this.state.end}
          onChange={this.handleEndSelect}
        />
        <input type="submit" value="Calculate" />
      </form>
    );
  }
}

export default Form;
