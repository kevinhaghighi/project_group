const express = require('express');
const logger = require('morgan');
const request = require('request-promise');
const apiKey = ('/.apikey.js');
const app = express();

app.use(logger('dev'));

function getRequestOptions(url, queryOptions = {}) {
    var options = {
        url: url,
        qs: queryOptions,
        json: true
    };

    return options;
}
function getDailyTimeSeries(symbol) {
    var options = getRequestOptions('https://www.alphavantage.co/query', { function: 'TIME_SERIES_DAILY', symbol:symbol, apikey: apiKey})
    console.log(options);
    
    return request(options)
        .then(function(stockData) {
            return stockData;
           
    });
}
app.get('/:symbol', function(req, res) {
    const symbol = req.params.symbol;
    console.log(symbol);
    getDailyTimeSeries(symbol)
        .then(function(stockData) {
            const obj = stockData['Time Series (Daily)'];
            return obj; 
        })
        .then(function(data){
            stockArray(data)
        });
});

function stockArray(data){
    //Formatting date
    const date =new Date();        
    let dd = date.getDate();
    let cc = date.getDate()-1;
    let sun = date.getDate()-2; 
    let mon = date.getDate()-3;
    let mm = date.getMonth()+1; 
    const yyyy = date.getFullYear(); 
    if(dd<10){ dd='0'+dd}; 
    if(cc<10){ cc='0'+cc};
    if(mm<10){ mm='0'+mm};
    if(sun<10){sun='0'+sun}
    if(mon<10){ mon='0'+mon};
    const today = yyyy+'-'+mm+'-'+dd;
    const yesterday = yyyy+'-'+mm+'-'+cc;
    console.log(data[yesterday])
    console.log(yesterday)
    //pull information from JSON
    let newStock = [];
    const yesterdayData = getOpenClose(data[yesterday]);
    const todayData = getOpenClose(data[today]);

    console.log(yesterdayData, todayData);
}

function getOpenClose(obj){
    // console.log(obj)
    return {
        open: obj["1. open"],
        close: obj["4. close"]
    };
}

app.listen(3000, function() {
    console.log('8:00pm');
});