function getSmaDataSet(params, onSucess, onError) {
  //let _PERIOD = getElapsedWorkDays(params.start, params.end);
  let _PERIOD = params.end.diff(params.start, "days");
  let _WEIGHT = _PERIOD + 1;
  let _DATE = params.start.subtract((_PERIOD - 1), "days");

  let query = {
    LEN :_WEIGHT + _PERIOD,
    SYMBOL : params.symbol,
    DATE : _DATE.format("X")
  };
  
  console.log(_WEIGHT);
  console.log(_PERIOD);
  console.log(query.LEN);
  console.log(query.DATE);

  fetch(
    `https://min-api.cryptocompare.com/data/histoday?fsym=${
      query.SYMBOL
    }&tsym=EUR&limit=${query.LEN}&aggregate=1&toTs=${query.DATE}`
  )
    .then(response => {
      return response.json();
    })
    .then(results => {
      let dataSet = results.Data.map(point => {
        return { close: point.close, time: point.time };
      });

      console.log(dataSet);
      let smaDataSet = calculateSmaDataSet(dataSet, _PERIOD, _WEIGHT);

      onSucess(smaDataSet);
    })
    .catch(error => {
      onError(error);
    });
}

function calculateSmaDataSet(dataSet, _PERIOD, _WEIGHT) {
  let counter = _WEIGHT;
  let smaDataSet = dataSet.reduce((all, item, index) => {
    if (index < counter && counter != (dataSet.length -1 )) {
      /*
      let sum = dataSet.slice(index, counter).reduce((a, b) => {
        a += b.close;
        return a;
      }, 0);
      */
      let subSet = dataSet.slice(index, counter);
      let sum = subSet.reduce((a, b) => {
        a += b.close;
        return a;
      }, 0);

      console.log(subSet);
      console.log(sum);
      all.push(sum / _PERIOD);
    }

    counter++;
    return all;
  }, []);

  return smaDataSet;
}

/*
function getWeekDays(dataSet) {
  return dataSet.reduce((all, item) => {
    let dt = new Date(item.time);
    if (dt.getDay() === 6 || dt.getDay() === 0) {
      all.push(item);
    }
    return all;
  }, []);
}
*/

export default getSmaDataSet;
