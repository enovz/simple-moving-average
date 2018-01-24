import createApi from "../api/createApi";

function getSmaPoints(params, onSucess, onError) {
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
  let api = createApi(endpoint);

  fetch(api.url, api.options)
    .then(response => {
      return response.json();
    })
    .then(results => {
      let dataSet = results.Data.map(point => {
        return { close: point.close, time: point.time };
      });
      let smaDataPoints = calculateSmaDataPoints(dataSet, _PERIOD, _WEIGHT);
      onSucess(smaDataPoints);
    })
    .catch(error => {
      console.error(error);
      onError(error);
    });
}

function calculateSmaDataPoints(dataSet, _PERIOD, _WEIGHT) {
  let counter = _WEIGHT;
  let smaDataSet = dataSet.reduce((all, item, index) => {
    if (index < counter && index < _WEIGHT) {
      let sum = dataSet.slice(index, counter).reduce((a, b, c) => {
        a += b.close;
        return a;
      }, 0);

      let sma = (sum/_PERIOD);

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

export default getSmaPoints;
