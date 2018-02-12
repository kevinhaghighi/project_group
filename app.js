const express = require('express');
const logger = require('morgan');
const request = require('request-promise');
const apiKey = ('/.api_key.js');
const app = express();

// app.use(logger('dev'));
// // app.engine('handlebars', exphbs({defaultLayout: 'index'}));
// // app.set('view engine', 'handlebars');
// // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(express.static('public'));


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
};

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

function formatDate(date) {
    return date.toISOString('YYYY-MM-DD').split('T')[0]
}

function isSaturday(date){
    let day = date.getDay();
    return day === 6;
}

function isSunday(date){
    let day = date.getDay();
    return day === 0;
}

function isMonday(date){
    let day = date.getDay();
    return day === 1;
}

function stockArray(data){
    let today;
    let previous;
    let date = new Date();

    
    if (isSunday(date)) {
        date.setDate(date.getDate() -2);
        previous = formatDate(date);
        date.setDate(date.getDate() -1);
        today = formatDate(date);
        console.log(today, previous);
    } else if (isMonday(date)) {
        today = formatDate(date);
        date.setDate(date.getDate() -3);
        previous = formatDate(date);
        console.log(today, previous);
    } else if (isSaturday(date)) {
        date.setDate(date.getDate() -1);
        previous = formateDate(date);
        date.setDate(date.getDate() -1);
        today = formatDate(date);
        console.log(today, previous);
    } else {
        date.setDate(date.getDate());
        today = formatDate(date);
        date.setDate(date.getDate() -1);
        previous = formatDate(date);
        console.log(today, prevoius)
    }

    const previousData = getOpenClose(data[previous]);
    const todayData = getOpenClose(data[today]);
        console.log(todayData, previousData);
};

function getOpenClose(obj){
    // console.log(obj)
    return {
        open: obj["1. open"],
        close: obj["4. close"]
    };
}

app.listen(3000, function() {
    console.log('LETS GO')
});