import React, { Component } from "react";
import Form from "./containers/Form";
import Loading from "./components/common/Loading";
import DataSheet from "./containers/DataSheet";
import Graph from "./containers/Graph";
import getSmaPoints from "./calculator/getSmaPoints";
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
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  doCalculation(params) {
    console.log(params);
    //this.setState({ data: params });
    this.setState(prevState => {
      return {
        data: params,
        display: {
          loading: !prevState.display.loading,
          result: prevState.display.loading
        }
      };
    });
    getSmaPoints(params, this.onSuccess, this.onError);
  }

  onSuccess(smaDataSet) {
    console.log(smaDataSet);
    //this.setState({ dataSet: smaDataSet });
    this.setState(prevState => {
      return {
        dataSet: smaDataSet,
        display: {
          loading: !prevState.display.loading,
          result: prevState.display.loading
        }
      };
    });
  }

  onError(error) {
    console.log(error);
    let codes = {
      404: {
        message: "What?"
      },
      500: {
        message: "My bad"
      }
    };
    alert(codes[error.code]);
  }

  render() {
    let display = {
      loading: { display: "none" },
      result: { display: "none" }
    };
    this.state.display.loading
      ? (display.loading = "block")
      : (display.loading = "none");
    this.state.display.result
      ? (display.result = "block")
      : (display.result = "none");

    return (
      <div className="App">
        <Form formDataHandler={this.doCalculation} />
        <Loading display={display.loading} />
        <DataSheet display={display.result} dataSet={this.state.dataSet} />
        <Graph display={display.result} dataSet={this.state.dataSet} />
      </div>
    );
  }
}

export default App;
