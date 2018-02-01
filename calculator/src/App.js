import React, { Component } from "react";
import Form from "./containers/Form";
import Loading from "./components/common/Loading";
import DataSheet from "./containers/DataSheet";
import Graph from "./containers/Graph";
import api from "./api/api";
import calculator from "./calculator/calculator";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      dataSet: [],
      display: {
        loading: false,
        result: false
      }
    };
    this.doCalculation = this.doCalculation.bind(this);
  }

  doCalculation(params) {
    this.setState(prevState => {
      return {
        data: params,
        display: {
          loading: !prevState.display.loading,
          result: prevState.display.loading
        }
      };
    });

    let _PERIOD = params.end.diff(params.start, "days");
    let _WEIGHT = _PERIOD + 1;
    let _DATE = params.end.add(_PERIOD, "days");

    let query = {
      LEN: 2 * _PERIOD,
      SYMBOL: params.symbol,
      DATE: _DATE
    };

    let endpoint = `https://min-api.cryptocompare.com/data/histoday?fsym=${
      query.SYMBOL
    }&tsym=EUR&aggregate=1&limit=${query.LEN}&toTs=${query.DATE}`;

    api
      .get(endpoint)
      .then(results => {
        let dataSet = results.Data.map(point => {
          return { close: point.close, time: point.time };
        });
        let smaDataPoints = calculator.calculateSmaDataPoints(
          dataSet,
          _PERIOD,
          _WEIGHT
        );
        this.setState(prevState => {
          return {
            dataSet: smaDataPoints,
            display: {
              loading: !prevState.display.loading,
              result: prevState.display.loading
            }
          };
        });
      })
      .catch(error => {
        alert(error);
      });
  }

  render() {
    if (!this.state.display.result && !this.state.display.loading) {
      return onStart.bind(this)();
    }
    return this.state.display.result
      ? onResult.bind(this)()
      : onLoading.bind(this)();

    function onStart() {
      return (
        <div className="App">
          <Form formDataHandler={this.doCalculation} />
        </div>
      );
    }

    function onLoading() {
      console.log("loading");
      return (
        <div className="App">
          <Form formDataHandler={this.doCalculation} />
          <Loading />
        </div>
      );
    }

    function onResult() {
      console.log("results");
      return (
        <div className="App">
          <Form formDataHandler={this.doCalculation} />
          <DataSheet dataSet={this.state.dataSet} />
          <Graph dataSet={this.state.dataSet} />
        </div>
      );
    }
  }
}

export default App;
