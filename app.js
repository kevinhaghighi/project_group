const express = require('express');
const logger = require('morgan');
const request = require('request-promise');

const apiKey = require('./api_key');
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
            console.log(obj);
        })
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});