import React, { Component } from "react";
import Form from "./containers/Form";
import List from "./containers/List";
import Graph from "./containers/Graph";
import getSmaDataSet from "./calculator/getSmaDataSet";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      dataSet: [],
      error: {}
    };
    this.doCalculation = this.doCalculation.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onError = this.onError.bind(this);
  }

  doCalculation(params) {
    this.setState({ data: params });
    getSmaDataSet(params, this.onSuccess, this.onError);
  }

  onSuccess(smaDataSet) {
    console.log(smaDataSet);
    this.setState({ dataSet: smaDataSet });
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
    return (
      <div>
        <h3>Hello from App</h3>
        <Form formDataHandler={this.doCalculation} />
        <Graph />
      </div>
    );
  }
}

export default App;
