var path = require('path');
var express = require('express');
var app = express();

var dir = path.join(__dirname, './src');

app.use(express.static(dir));

app.listen(8080, function () {
    console.log('Listening on http://localhost:8080/');
});
