
var express = require('express');
var app = express(),
port = 8080;
app.use(express.static(path.join(__dirname, '/')));
app.get('/', function(req, res) {
    res.render('main.html');
});

app.listen(port, '127.0.0.1')