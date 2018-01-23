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
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  // Will display time in 10:30:23 format
  var formattedTime =
    hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  //return formattedTime;
  //let date = new Date(formattedTime);
  //let dt = new Date(date.valueOf() + date.getTimezoneOffset() * 60000);
  return date.toUTCString();
  
}


export default getSmaPoints;
