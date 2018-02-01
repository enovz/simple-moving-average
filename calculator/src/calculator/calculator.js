function calculator() {
  const calculator = {
    calculateSmaDataPoints: calculateSmaDataPoints
  };

  return calculator;
}

function calculateSmaDataPoints(dataSet, _PERIOD, _WEIGHT) {
  let counter = _WEIGHT;
  let smaDataSet = dataSet.reduce((all, item, index) => {
    if (index < counter && index < _WEIGHT) {
      let sum = dataSet.slice(index, counter).reduce((a, b, c) => {
        a += b.close;
        return a;
      }, 0);

      let sma = sum / _PERIOD;

      all.push({
        value: sma.toFixed(2),
        time: parse(dataSet[index + _PERIOD].time)
      });
    }
    counter++;
    return all;
  }, []);

  return smaDataSet;
}

function parse(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000);
  return date
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");
}

export default calculator();
