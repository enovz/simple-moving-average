function getSmaPoints(params, onSucess, onError) {

  let _PERIOD = params.end.diff(params.start, "days");
  let _WEIGHT = _PERIOD + 1;
  let _DATE = params.end.add( _PERIOD , "days");

  let query = {
    LEN: (2 *_PERIOD) ,
    SYMBOL: params.symbol,
    DATE: _DATE
  };
  
  fetch(
    `https://min-api.cryptocompare.com/data/histoday?fsym=${
      query.SYMBOL
    }&tsym=EUR&aggregate=1&limit=${query.LEN}&toTs=${query.DATE}`
  )
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
      },  0);
      all.push({
        value: (sum / _PERIOD),
        time: parse(dataSet[index+_PERIOD].time)
      });
    }
    counter++;
    return all;
  }, []);

  return smaDataSet;
}

function parse(unix_timestamp) {
  var date = new Date(unix_timestamp * 1000);
  return date.toString().split(" ").slice(0, 4).join(" ");
  //return date.toUTCString();
}


export default getSmaPoints;
